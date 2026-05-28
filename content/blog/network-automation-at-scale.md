---
title: "Network Automation at Scale: Python, Ansible, and 500 Devices"
date: "2025-01-22"
summary: "What we built to stop logging into switches one at a time — compliance scanning, config drift detection, and remediation across a 500-device multi-vendor estate. What we picked, why, what broke, and what I'd tell the next team before they start."
author: "Yaswanth Reddy Jonnalagadda"
tags: ["Automation", "Python", "Ansible", "Netmiko", "NAPALM", "Network Engineering"]
---

I've spent enough time logging into switches one at a time to know that "we'll just check them manually" is a sentence that ages badly.

This is about the automation stack we built to stop doing that — compliance scanning, config drift detection, and remediation, all under programmatic control across a 500-something device multi-vendor estate. It's not a tutorial for any single tool. It's closer to a field report: what we picked, why, what broke, and what I'd tell the next team before they start.

---

## 1. Why This Stops Being Optional Around a Few Hundred Devices

Manually validating 500-plus devices isn't really a process. It's a liability with a calendar invite attached.

The math gets ugly quickly. Quarterly compliance review, a few minutes per device if nothing goes wrong, multiplied across hundreds of switches, routers, and firewalls, and suddenly you've burned an engineer's week confirming that most things are fine and a handful aren't.

And even then, manual review is inconsistent.

Engineer A checks NTP, SNMP, logging, and AAA carefully. Engineer B, thirty devices later and mentally exhausted, checks NTP and skims the rest. Humans are bad at repetitive validation work for long periods of time. We lose focus, we rush, and eventually we start trusting assumptions instead of checking reality.

The drift problem is worse than the review problem, though.

Config drift almost never announces itself. Someone makes a temporary change during an outage at 2 AM — a quick ACL tweak, a timer adjustment, a debug command — fully intending to remove it later. The outage ends, everyone goes home, and the temporary change survives for the next three years.

Multiply that across multiple teams and enough time and your "standard" configuration slowly becomes fictional. Every device turns into its own slightly customized snowflake, and you usually discover which ones only after something breaks in production.

That was the real motivation behind the automation effort.

Not "automation because automation is modern."

Just: know the actual state of the network continuously, make drift visible, and reduce the amount of engineering time spent manually proving the obvious.

Everything else came after that.

---

## 2. Why Netmiko + NAPALM Still Makes Sense

People naturally reach for the newest automation framework here, and I understand the instinct. But for a messy multi-vendor environment, Netmiko plus NAPALM is still the combination I'd choose.

Mostly because it matches the reality of enterprise infrastructure instead of the reality we'd like to have.

Netmiko handles the ugly work reliably: SSH into a box, run commands, collect output. When you've got an older platform, inconsistent API support, or a vendor implementation that only partially behaves, Netmiko still works because it interacts with the device the same way an engineer would manually.

It's not elegant.

But in brownfield environments, reliability matters more than elegance.

NAPALM solves a different problem. The value isn't just the getters themselves — `get_facts()`, `get_interfaces()`, `get_bgp_neighbors()` — it's the normalization layer they provide across vendors. A Cisco box, an Arista box, and a Juniper box can all return structured information through the same interface.

That consistency is what keeps the higher-level logic maintainable.

Otherwise every script eventually turns into a pile of vendor-specific exceptions.

The division of labor we settled on was straightforward:

- use NAPALM wherever structured getters already exist,
- use Netmiko for the long tail of unsupported commands, inconsistent platforms, or weird operational checks.

Trying to force everything into one tool usually creates more pain than it removes.

One thing worth learning early: structured output is not always structured identically across vendors or software versions. The docs sometimes imply more consistency than actually exists. Older code trains especially tend to return slightly different keys or formats.

Validate the output on real hardware before trusting it in production automation.

That lesson cost us a few evenings.

---

## 3. Structuring Ansible So It Doesn't Collapse Later

A lot of network automation projects become difficult to maintain surprisingly quickly, and usually the problem isn't Ansible itself. It's that people structure network playbooks like small server automation projects and underestimate how much variability exists in real infrastructure.

The approach that worked for us was leaning heavily on inventory structure and `group_vars`.

Devices grouped by:

- role,
- site,
- vendor,
- platform,
- operational function.

The intended state lived in variables, not buried inside playbook logic.

That separation matters more than people initially realize.

The playbook should describe *what should be true*. Inventory and variables should describe *where* and *for whom* it should be true. When a new site appears, you update inventory and variables instead of cloning another playbook and creating another thing to maintain forever.

Idempotency matters just as much.

A playbook you can safely run repeatedly without unintended changes is what makes continuous automation operationally safe. If a playbook reports "changed" on every run, engineers stop trusting it very quickly.

And once people stop trusting automation, they stop using it.

We also learned to keep the playbooks boring.

Simple roles. Readable tasks. Minimal Jinja complexity.

I've inherited playbooks where half the operational logic lived inside nested template expressions and debugging them was honestly worse than doing the work manually. Clever automation ages badly.

Readable automation survives.

---

## 4. The Compliance Pipeline: Detect, Report, Remediate

This became the core architecture, and separating the stages mattered a lot more than I originally expected.

### Detect

Pull the running state from every device:

- NAPALM getters where possible,
- Netmiko where structured data didn't exist.

Then compare the live state against intended state stored in version control:

- NTP servers,
- SNMP configuration,
- AAA settings,
- logging destinations,
- banners,
- TACACS settings,
- whatever the baseline actually requires.

Conceptually the process is simple. The hard part is defining the baseline precisely enough that the comparison produces useful drift instead of noise.

### Report

This is where many automation projects quietly fail.

A diff nobody reads is operationally worthless.

We eventually stopped dumping raw device diffs into logs because nobody consumed them consistently. What worked better was summarizing the results in a way humans could actually process:

- counts of drift categories,
- affected device groups,
- recurring patterns,
- severity levels.

If forty devices drift the same way, that usually isn't forty separate problems. It's one broken process upstream.

Good reporting exposes patterns, not just individual failures.

### Remediate

This is the dangerous part.

Auto-remediation sounds great until the pipeline confidently "fixes" something that was intentionally changed during a production issue.

We started cautiously:

- detect automatically,
- report automatically,
- generate remediation changes,
- require human approval before deployment.

Only a small set of very low-risk checks ever became fully automatic.

And honestly, staying conservative here saved us more than once.

One especially painful lesson involved an ACL exception added during a vendor maintenance window. The pipeline classified it as drift and tried to revert it during daytime production hours. Fortunately it was still approval-gated at the time.

That incident slowed down our push toward full remediation significantly, and in hindsight I'm glad it did.

Over roughly one quarter, the pipeline surfaced more than 300 discrepancies we would never have systematically caught manually and reduced compliance-review effort by around 60%.

The 60% number sounds impressive in presentations.

The 300 hidden discrepancies mattered more operationally.

---

## 5. Multi-Vendor Normalization Is the Real Engineering Work

Everything sounds clean until you start parsing operational output from multiple vendors and discover that the same logical state is represented five different ways.

NAPALM smooths some of this out, which is exactly why its getters are valuable. But the moment you step outside what it models — and you absolutely will — you're back in the world of vendor-specific parsing.

And that world gets ugly fast.

The same BGP session looks different across:

- Cisco IOS,
- NX-OS,
- EOS,
- Junos,
- and sometimes even between minor releases on the same platform.

What eventually worked for us was normalizing everything into our own internal data model as early as possible.

The parsing layer became intentionally vendor-aware and intentionally isolated. Its entire job was:

- ingest ugly platform-specific output,
- convert it into a consistent internal structure,
- shield the rest of the pipeline from vendor formatting differences.

That isolation mattered a lot once upgrades started happening.

An NX-OS upgrade quietly changed an output format during one maintenance cycle and one parser began returning garbage without throwing errors. The pipeline happily reported devices as compliant when they weren't.

That was not a fun discovery.

After that, we started storing real captured output from production devices as parser test fixtures and validating parsers during CI runs before upgrades rolled out broadly.

Use TextFSM and ntc-templates wherever possible instead of writing everything yourself. Parsing at scale is already painful enough without inventing additional regex problems.

---

## 6. CI/CD Changed the Team More Than the Tooling

The technical pipeline mattered.

The workflow change mattered more.

We wired intended-state validation into GitHub Actions so baseline changes followed the same review model as application code:

- pull request,
- linting,
- validation,
- peer review,
- merge approval.

Once the network baseline lived in Git, a lot of operational confusion disappeared naturally.

Instead of "Why is this device configured differently?" you could actually trace the answer: who changed it, when, why, and who approved it.

That level of visibility changes team behavior over time.

One important caution, though: validation pipelines and deployment pipelines are very different risk categories.

A pipeline that reads the network is useful.

A pipeline that can modify the entire network after a merge button gets pressed deserves a much higher level of paranoia.

We kept production write access heavily gated:

- approvals,
- maintenance windows,
- scoped deployment targets,
- rollback validation,
- staged rollout behavior.

The more infrastructure your automation can touch, the more dangerous small mistakes become.

---

## 7. Lessons Learned

A few things only became obvious after operating this system for a while.

Start read-only and stay there longer than feels necessary.

Detect-and-report alone delivers most of the value with very little operational risk. The temptation to jump directly into automated remediation is strong, but trust takes time to build. We stayed read-only longer than I originally wanted to, and looking back it was absolutely the right decision.

The data-quality problem is usually bigger than the automation problem.

Most of the real engineering work wasn't writing Python or Ansible. It was defining what "compliant" actually meant, cleaning inventory data, reconciling naming inconsistencies, and dealing with the fact that vendor output is rarely as consistent as the documentation suggests.

Automation only amplifies the quality of your source of truth.

If your inventory is inaccurate, your automation simply becomes wrong faster and more confidently.

Inventory accuracy became one of the quiet dependencies underneath everything. A stale inventory means you're validating 470 devices while silently ignoring 30 forgotten ones nobody added to the system properly.

And error handling against real infrastructure became most of the engineering work at scale.

At 500 devices:

- something is always unreachable,
- some credentials are always outdated,
- some command will always timeout,
- some platform will always return malformed output,
- some parser will eventually break after an upgrade.

A pipeline that fails because one switch is unavailable isn't resilient enough for production.

Designing for partial failure stopped being an edge case very quickly. It became the normal operating condition.

---

## 8. Conclusion

The real argument for network automation at scale isn't that it's exciting.

It's that manually validating hundreds of devices eventually stops working, even if teams pretend otherwise for a while.

The stack itself ended up intentionally unglamorous:

- Netmiko and NAPALM because they handle messy multi-vendor reality well,
- Ansible structured around inventory and variables instead of hardcoded logic,
- a detect-report-remediate pipeline that earned trust before it earned write access,
- CI/CD processes that treated intended network state like actual production code.

The measurable outcomes mattered:

- hundreds of previously invisible discrepancies surfaced,
- significant reduction in manual review effort,
- faster compliance validation,
- better visibility into drift.

But the operational outcome mattered more.

At some point the real value becomes simply knowing the actual state of the network instead of hoping it still matches the diagram.

Start read-only. Get the source of truth honest. Quarantine ugly parsing. Gate anything capable of changing production.

Do that consistently and the automation eventually becomes something the team trusts, which is the only kind of automation that survives long term.

---

## References & Further Reading

The tools and references worth going to directly:

- **Netmiko** — Kirk Byers' multi-vendor SSH automation library.
- **NAPALM** — *Network Automation and Programmability Abstraction Layer with Multivendor support.*
- **ntc-templates** — community TextFSM parsing templates for multi-vendor `show` command output.
- **Ansible Network Automation Documentation** — official guidance for inventory structure, variables, and network modules.
- **RFC 3535** — *Overview of the 2002 IAB Network Management Workshop.* Still useful background reading for understanding operator-driven network management requirements.

Vendor automation documentation from Cisco DevNet, Arista, and Juniper is also worth reading for platform-specific behavior and API limitations. Just validate behavior on your actual OS versions rather than assuming documentation matches production reality perfectly.

Tool capabilities, getters, and supported platforms evolve between releases, so always verify current support status before building automation around a specific feature.
