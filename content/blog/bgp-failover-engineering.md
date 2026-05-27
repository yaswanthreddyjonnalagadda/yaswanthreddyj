---
title: "BGP Failover Engineering: Building Sub-Second Convergence"
date: "2025-03-18"
summary: "How to design BGP topologies that achieve sub-second failover — timer tuning, BFD integration, multi-homed ISP architecture, and lessons from eliminating 8+ hours of quarterly downtime."
author: "Yashu Reddy"
tags: ["BGP", "Failover", "Routing", "High Availability"]
---

*This article is coming soon. Content is being drafted.*

## Overview

Default BGP timers will fail you. This article covers the engineering decisions behind building BGP topologies that converge in under a second — and the operational lessons learned from eliminating recurring outages.

## Topics Covered

- Why default BGP hold timers are dangerous in production
- BFD integration for sub-second failure detection
- Multi-homed ISP design: active/active vs. active/standby
- Route policy design for clean failover
- Traffic engineering with MED and LOCAL_PREF
- Testing failover without impacting production
