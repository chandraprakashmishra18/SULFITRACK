# 🟢 SulfiTrack — Passive H₂S Exposure Intelligence

> **Passive H₂S Dosimeter with AI-Powered Exposure Intelligence**

SulfiTrack is a prototype system for estimating cumulative hydrogen sulfide (H₂S) exposure using a passive colorimetric dosimeter, smartphone-based image analysis, and digital exposure records.

The system is designed around a simple workflow:

**Wear → Expose → Scan → Analyse → Estimate → Record**

---

## 🚨 Problem

Hydrogen sulfide (H₂S) is a highly toxic gas encountered in environments such as:

- Oil and gas operations
- Petroleum refineries
- Sewage and wastewater environments
- Drains, manholes, and confined spaces

Conventional electronic gas detectors are primarily designed for real-time gas detection and alarm.

SulfiTrack addresses a different requirement:

> **Estimating a worker's cumulative H₂S exposure using a passive, low-power sensing approach.**

---

## 💡 Proposed Solution

SulfiTrack combines:

- Passive colorimetric H₂S dosimeter
- Printed reference colour scale
- Badge validity indicator
- Unique QR/badge identification
- Smartphone image capture
- Computer-vision colour analysis
- Exposure estimation
- Worker-wise exposure history
- Digital reporting and dashboard visualization

The physical dosimeter is designed to remain **battery-free and passive**.

The smartphone performs the digital reading and analysis.

---

## ⚙️ System Workflow

```text
        H₂S EXPOSURE
             │
             ▼
   Passive Chemical Strip
             │
             ▼
      Permanent Colour
          Response
             │
             ▼
      Smartphone Scan
             │
             ▼
   Image Quality Checking
             │
             ▼
  Strip + Reference Detection
             │
             ▼
   Colour Feature Extraction
             │
             ▼
   Exposure Estimation Model
             │
             ▼
 Estimated Cumulative Exposure
             │
             ▼
 Worker / Shift Record
             │
             ▼
 Dashboard & Reporting
