---
title: "VXLAN vs VLAN: When to Overlay Your Underlay"
date: "2025-11-15"
summary: "Where flat L2 actually starts hurting, what VXLAN/EVPN genuinely fixes, and the new set of problems you sign up for when you migrate — from an engineer who's operated both."
author: "Yaswanth Reddy Jonnalagadda"
tags: ["Networking", "VXLAN", "VLAN", "Data Center", "EVPN"]
---

I've spent enough nights chasing spanning-tree changes that I've stopped romanticizing large Layer 2. VLANs are great until they aren't, and the "aren't" sneaks up on you.

This isn't a vendor pitch. It's the conversation I'd have with an engineer who knows VLANs and routing cold but hasn't yet had to operate a VXLAN/EVPN fabric — where flat L2 actually starts hurting, what the overlay genuinely fixes, and the new set of problems you sign up for when you migrate.

---

## 1. Where Traditional VLAN Designs Start Hurting

Everyone quotes the 4,094 VLAN ceiling first. It's real, and in a large multi-tenant data center you will hit it. But most networks become painful long before the VLAN count is the issue. The pain is operational, and it shows up earlier and in uglier ways than a number on a `show vlan`.

Spanning tree works, but redundancy comes with a cost. The moment you add redundant paths it blocks some of them to prevent loops, so you've bought bandwidth you can't use. Then you spend your time tuning root priorities, BPDU guard, loop guard, portfast — a dozen knobs to keep something stable that occasionally wants to misbehave. And even with all of that, an L2 failure spreads further than it should.

The worst one I was near started with a bad patch between two access ports in a remote closet. STP eventually caught it. Not before the loop saturated the uplinks hard enough to take VoIP and wireless down across a whole floor for a few minutes. Nobody remembered the switch model afterward. They remembered how much one dumb cable cost us.

Stretched Layer 2 between sites is where it gets genuinely uncomfortable. It always sounds reasonable in planning — we need workload mobility, we don't want to renumber the app, we just need this VLAN extended *temporarily*. Then the temporary design is still there five years later, broadcasts are crossing a WAN link, and two failure domains that should've stayed independent are now joined at the hip. A storm on one side is a storm on both sides, hundreds of miles apart, and good luck explaining that on the bridge call.

Large flat domains also accumulate debt quietly. MAC tables grow, ARP traffic grows, broadcast traffic grows, VLAN naming drifts until VLAN 100 means "servers" in one site and "voice" in another, and nobody remembers why VLAN 237 still exists but everyone's afraid to delete it. None of this throws an error. The network just slowly turns into something nobody wants to touch, and every change starts feeling risky.

That's usually the point where someone says the word "overlay" in a meeting.

---

## 2. What VXLAN Actually Changes

VXLAN solves one specific thing: how do you keep Layer 2 semantics while running a routed Layer 3 fabric underneath?

The mechanism is simple enough. A VTEP — VXLAN Tunnel Endpoint, usually your leaf switch — takes an Ethernet frame, wraps it in UDP, and ships it across an IP network. The VTEP on the far side strips the encapsulation and hands off the original frame. The host has no idea any of this happened; it still thinks it's on a normal segment. The segment ID becomes the VNI, which is 24 bits, so roughly 16 million of them instead of 4,094.

The big number matters at scale, but the real shift is that segmentation stops being tied to the physical topology. In a VLAN design, where a segment can exist is a function of where you've trunked it. VXLAN breaks that. A segment can live anywhere two VTEPs have IP reachability to each other.

By itself, though, VXLAN is only half a solution. Early designs leaned on flood-and-learn, often with multicast in the underlay, which dragged a lot of the old flooding behavior right back in. That's why in practice "VXLAN" almost always means "VXLAN with EVPN."

EVPN gives the data plane a real control plane over MP-BGP. Instead of flooding to learn where a MAC lives, leaves advertise it as a BGP route — "this MAC and this IP are behind me." That buys you deterministic learning, ARP suppression so requests get answered locally instead of flooding, and distributed anycast gateways: every leaf is the default gateway for its subnets using the same virtual IP and MAC, so a VM's gateway is always the switch it's plugged into and mobility doesn't trigger a gateway failover.

Multi-tenancy gets cleaner too. Tenant VRFs map to L3 VNIs, and two tenants can both use 10.0.0.0/8 without ever seeing each other.

The thing underneath becomes routed instead of bridged, and that changes the failure model entirely. Routing failures are usually localized and predictable. Layer 2 loops are neither.

---

## 3. The Underlay vs Overlay Mental Shift

This is the part that trips people up, and it's worth slowing down on.

The underlay is just IP connectivity between VTEPs. That's its whole job. Typically leaf-spine, eBGP or OSPF, ECMP across every spine link — and critically, no tenant VLANs and no stretched L2 riding on it. Because it's pure routing, every uplink carries traffic and nothing sits blocked. A link dies, ECMP reroutes in well under a second, and most traffic barely notices.

The overlay is where all the tenant complexity lives — VNIs, VRFs, MAC/IP advertisements, mobility. The overlay changes constantly. The underlay shouldn't.

Keep the underlay simple enough that nobody has to think about it much during an outage. Every time I've watched a team get clever — pushing tenant routing or policy down into the underlay because it looked efficient on paper — they paid for it later when nobody could tell which layer was actually broken.

The underlay works best when it's boring and predictable. When the bottom layer is stable, the overlay becomes much easier to trust and operate.

---

## 4. Migration Reality

Nobody moves a production environment to VXLAN over a weekend, and brownfield migrations are long and awkward in ways that don't show up in the design doc.

The normal path is coexistence. Stand up the new fabric, connect it to the old network, map the legacy VLANs to VNIs at a pair of border leaves doing L2 handoff, then move workloads in waves and validate each one before you touch the next. That coexistence window lasts months. Sometimes well over a year.

The hardest part usually isn't the hardware. It's that a team fluent in VLAN troubleshooting now has to understand EVPN route types, VTEP behavior, distributed gateways, and BGP troubleshooting under production pressure. If you migrate the hardware but not the team's skills, you've built something nobody can confidently fix at 3 AM, which is exactly when you'll need to.

A couple of specific traps show up repeatedly. The border devices doing old-to-new handoff become a bandwidth and failure chokepoint that everyone forgets about until it saturates or fails. The gateway transition — moving from a centralized HSRP/VRRP pair to distributed anycast gateways — changes where routing happens; get the cutover wrong and you end up chasing asymmetric routing or black-holed traffic across multiple leaves.

At one site we also discovered the border leaves were silently fragmenting traffic because the WAN handoff MTU didn't match the fabric MTU. Nobody noticed until overnight backup traffic started crossing the fabric and transfer jobs began failing randomly. That turned into a much longer night than it should've been.

Monitoring is its own problem, and teams almost always discover it after cutover instead of before. Existing tooling understands interfaces, VLANs, and MAC tables. It usually has no idea what a VNI or an EVPN route is. Plan for that visibility gap early or you'll spend the first real incident half-blind.

---

## 5. Troubleshooting Gets Layered

This is where engineers get frustrated early, and it's less that troubleshooting is harder and more that it's layered.

Traditional VLAN troubleshooting is fairly linear: check trunks, check STP, check the MAC table, check the cable. In a fabric, the first question is different: am I looking at an underlay problem or an overlay problem? Get that wrong and you'll waste an hour staring at EVPN tables while a spine link flaps underneath you.

The order I usually follow is straightforward.

First, can the source VTEP reach the destination VTEP loopback over IP? If the underlay is unstable, nothing above it matters. Ping VTEP-to-VTEP before anything else.

Then verify the VNI exists and is operational on both leaves. After that, check whether the MAC/IP routes for the affected hosts are actually present in BGP. `show bgp l2vpn evpn` — or the platform equivalent — becomes the command you live in. If a leaf isn't advertising a MAC, or a remote leaf never received it, the answer is usually sitting in the route table.

And then there's MTU.

MTU problems are brutal because the symptoms look misleading. VXLAN adds roughly 50 bytes of encapsulation overhead, so if the underlay MTU wasn't adjusted correctly you get one of the worst networking failure modes: small packets work, large packets disappear. Ping looks clean. Then someone starts a file transfer or database sync and things quietly fall apart.

Most teams hit this once. After that, nobody forgets to check MTU end-to-end again.

One more design fork matters operationally: how the fabric handles BUM traffic — broadcast, unknown-unicast, and multicast. Older designs relied on multicast in the underlay, which means you're now also troubleshooting multicast behavior during outages. Ingress replication avoids that by having the source VTEP replicate traffic directly to remote VTEPs instead. Both approaches work, but the failure modes are different, so it's important to know which model the fabric is using before something breaks.

Packet visibility changes too. Your capture tools now see outer IP headers, UDP, and VXLAN encapsulation unless they understand how to decode the inner frame. Some monitoring platforms handle this well. Plenty still don't, and many teams discover they're partially blind only after production traffic starts flowing through the overlay.

---

## 6. When VLANs Are Still the Better Option

This part matters, and the industry is bad at admitting it.

Not every network needs an overlay, and reaching for one you don't need is just importing complexity. A small campus with a few dozen switches, a stable topology you can hold in your head, no multi-tenancy, no cross-site mobility — VLANs are usually the simpler and more reliable answer.

Operational simplicity matters more than people give it credit for.

A two-person team that deeply understands traditional Layer 2 is often in a better operational position than the same team running a fabric they only partially understand.

I've watched teams deploy VXLAN into environments with fewer than twenty switches and no actual multi-tenancy requirement. Six months later they were debugging EVPN behavior nobody on the team fully understood, the automation was half-finished, and the network was harder to support than the VLAN design they'd replaced. The overlay solved no problem they actually had.

VXLAN earns its complexity when you genuinely need:

- large-scale segmentation
- multi-tenancy
- workload mobility
- L2 extension over a routed core
- heavy east-west scaling

Without one of those pressures driving it, a clean VLAN design is still perfectly respectable. The most overengineered networks I've seen weren't built by people who didn't know the technology — they were built by people who knew it and reached for it before they actually needed it.

---

## 7. Lessons Learned

A few things only become obvious after you've lived with one of these fabrics for a while.

Underlay stability matters more than anything else. Almost every serious overlay issue I've been near eventually traced back to the routed fabric underneath it — a flapping link, a routing adjacency that wouldn't stay up, inconsistent MTU settings, or unstable underlay reachability.

Keep the underlay simple. Keep it consistent. Monitor it aggressively.

Automation also stops being optional. Small VLAN environments tolerate manual configuration drift surprisingly well. Large fabrics don't. Once you're managing dozens of leaves, hundreds of VNIs, multiple VRFs, and tenant policies, manual consistency becomes unrealistic. Drift inside a fabric creates strange edge cases that are painful to debug because nothing fails cleanly.

Most teams eventually adopt templating and automation not because it's fashionable, but because the alternative becomes exhausting.

Documentation matters more too. Overlays are abstract by design — you can't trace a VNI by following a cable through the rack. If the relationships between VNIs, VRFs, tenants, gateways, and routing domains aren't documented properly, troubleshooting becomes guesswork surprisingly quickly.

---

## 8. Conclusion

VXLAN with EVPN solves real problems. Routed fabrics with fast convergence, clean multi-tenancy, distributed gateways, segmentation that isn't chained directly to physical topology — all legitimate improvements over large stretched-VLAN environments.

But none of it is free.

You trade simplicity for scale, and that trade comes with operational complexity, a real learning curve, layered troubleshooting, tooling changes, and a heavy dependency on automation and discipline.

Whether that trade is worth making depends entirely on the environment.

For large data centers, cloud environments, and multi-tenant fabrics, VXLAN/EVPN is often the right answer. For smaller or stable environments, VLANs are still perfectly valid.

The mistake is assuming newer automatically means better.

The best network design is usually the simplest one that reliably meets the requirements without becoming fragile later. Sometimes that's a VXLAN fabric. Sometimes it's just a well-maintained VLAN environment that nobody had a good reason to replace.

---

## References & Further Reading

The authoritative sources are worth reading directly rather than through somebody else's blog summary:

- **RFC 7348** — *VXLAN: A Framework for Overlaying Virtualized Layer 2 Networks over Layer 3 Networks.* The original VXLAN encapsulation specification.
- **RFC 7432** — *BGP MPLS-Based Ethernet VPN (EVPN).* The foundational EVPN control-plane specification.
- **RFC 8365** — *A Network Virtualization Overlay Solution Using EVPN.* The practical EVPN-VXLAN reference tying EVPN to VXLAN/NVO data planes.
- **RFC 7938** — *Use of BGP for Routing in Large-Scale Data Centers.* Background on eBGP underlay design for leaf-spine architectures.
- **RFC 8014** — *An Architecture for Data-Center Network Virtualization over Layer 3 (NVO3).* Architectural guidance for overlay-over-L3 network design.

Vendor design guides from Cisco, Arista, Juniper, and NVIDIA/Cumulus are also useful for platform-specific implementation details and validated architectures. Just treat platform CLI and scaling numbers as vendor-specific rather than universal.

Verify RFC status on the IETF Datatracker before formally citing them, since some specifications may have been updated or obsoleted.
