---
sidebar_position: 4
---

# Auto-Tagging — Chart Repository User Guide

**Document:** Auto-Tagging User Guide
**Prepared for:** Client User Acceptance Testing (UAT)
**Version:** 1.0
**Last updated:** June 2026
**Classification:** Proprietary & Confidential

---

## Table of Contents

- [1. Introduction](#1-introduction)
  - [1.1 Purpose of This Guide](#11-purpose-of-this-guide)
  - [1.2 Intended Audience](#12-intended-audience)
  - [1.3 How to Use This Guide](#13-how-to-use-this-guide)
- [2. Getting Started](#2-getting-started)
  - [2.1 Before You Begin](#21-before-you-begin)
  - [2.2 Opening the Tagging Page](#22-opening-the-tagging-page)
  - [2.3 Understanding the Page Layout](#23-understanding-the-page-layout)
  - [2.4 How Auto-Tagging Works](#24-how-auto-tagging-works)
- [3. Creating a Tagging Rule](#3-creating-a-tagging-rule)
  - [3.1 Client and Project](#31-client-and-project)
  - [3.2 Choosing a Tag Type](#32-choosing-a-tag-type)
  - [3.3 Choosing a Code or Year](#33-choosing-a-code-or-year)
  - [3.4 Creating the Rule](#34-creating-the-rule)
- [4. Working with the Rules Table](#4-working-with-the-rules-table)
  - [4.1 Table Columns](#41-table-columns)
  - [4.2 How Priority Decides the Tag](#42-how-priority-decides-the-tag)
  - [4.3 Reordering Rules (Changing Priority)](#43-reordering-rules-changing-priority)
  - [4.4 Deleting a Rule](#44-deleting-a-rule)
- [5. Page States You May See](#5-page-states-you-may-see)
- [6. Tag Type Reference](#6-tag-type-reference)
- [7. Tips and Best Practices](#7-tips-and-best-practices)
- [8. User Acceptance Testing (UAT)](#8-user-acceptance-testing-uat)
  - [8.1 What to Verify](#81-what-to-verify)
  - [8.2 Reporting Issues](#82-reporting-issues)
- [9. Glossary](#9-glossary)
- [Appendix A. Revision History](#appendix-a-revision-history)

---

## 1. Introduction

The Auto-Tagging page (the **Tagging** tab of the Chart Repository) lets you set up **tagging rules** that automatically apply a tag to charts. Each rule maps a single coding value — an **HCC** code, an **ICD** diagnosis code, or a **Year of Service Start** — to the charts that match it, across the whole Client and Project you have selected. Rules are **priority-ordered**, so when a chart could match more than one rule, the highest-priority rule decides the tag. This guide explains every control on the page so that you can complete User Acceptance Testing (UAT) with confidence.

### 1.1 Purpose of This Guide

This guide is a step-by-step reference for the Auto-Tagging page. It describes what each control does, how to create and manage rules, how priority works, and what you should expect to see, so you can verify that the application behaves correctly during UAT.

### 1.2 Intended Audience

This guide is written for client reviewers and testers who will validate the Auto-Tagging page during UAT. It assumes that you:

- Have valid sign-in credentials for the application.
- Have permission to access the Chart Repository and to manage tagging rules.
- Have a Client and Project selected (your rules and tagging are scoped to that selection).

### 1.3 How to Use This Guide

- **Sections follow real tasks** — creating a rule, ordering rules by priority, and deleting a rule.
- **On-screen labels, buttons, and field names** appear in **bold**, exactly as they read in the application.
- **Reference tables** list every tag type, column, and message so nothing is left to guesswork.
- **A UAT checklist** is provided in Section 8 to help you record your test results.

---

## 2. Getting Started

### 2.1 Before You Begin

Make sure the following are in place before you start testing:

- You are signed in to the application.
- A **Client** and **Project** are selected. The page only opens once both are chosen, and the left panel shows the active Client and Project. Until they resolve, each shows a dash (**—**).

### 2.2 Opening the Tagging Page

1. Sign in to the application.
2. Open the **Chart Repository** from the main navigation.
3. Select the **Tagging** tab (shown alongside **Filter & Search** and **Semantic Search**).

### 2.3 Understanding the Page Layout

The page is divided into two areas:

| Area | Location | What it is for |
|---|---|---|
| **Create-rule panel** | Left | Shows the active Client and Project, lets you pick a tag type (**HCC**, **ICD**, or **YOS**), choose a code or year, and create a rule. |
| **Rules table** | Right | Lists all existing rules in priority order, lets you reorder them by dragging, and lets you delete them. |

### 2.4 How Auto-Tagging Works

The left panel states the three principles that govern tagging:

- _"Tagging applies to all charts within the Client and Project(s) selection."_
- _"A single chart can only have a maximum of one HCC or one ICD or one Year of Service Start tag."_
- _"Tags are applied based on the priority order of tagging rules. e.g. if a chart qualifies for HCC 15 and YOS Start 2026, and HCC 15 is the #1 priority, it will be tagged with HCC 15 and not with YOS Start 2026."_

Charts are re-tagged automatically whenever you create, delete, or reorder rules.

---

## 3. Creating a Tagging Rule

You build a rule in the left panel, under the heading **Create a Tagging Rule**.

### 3.1 Client and Project

At the top of the panel, a read-only card shows the active **Client** and **Project**. These values are set elsewhere in the application and cannot be edited here. Every rule you create is scoped to this Client and Project.

### 3.2 Choosing a Tag Type

Use the tag-type selector (a three-way toggle) to choose what the rule matches on:

| Tab | What it matches | Tooltip |
|---|---|---|
| **HCC** | A specific HCC (Hierarchical Condition Category) code. | _"Hierarchical Condition Categories — map a specific HCC code to a tag."_ |
| **ICD** | A specific ICD-10 diagnosis code. | _"ICD-10 diagnosis codes — map a specific diagnosis code to a tag."_ |
| **YOS** | A specific Year of Service Start. | _"Year of Service Start — map a service year to a tag."_ |

Switching tabs changes the picker below and clears any value you had entered.

### 3.3 Choosing a Code or Year

The picker below the tabs changes with the tag type. In every case the field is required (marked with an asterisk) and can be cleared.

| Tab | Field label | Placeholder | How to enter a value |
|---|---|---|---|
| **HCC** | **HCC Code** | _"Search HCC code (e.g. HCC 92)"_ | Start typing to filter the Project's HCC codes, or open the list to browse them. Each option shows as "HCC <code>". |
| **ICD** | **ICD Code** | _"Search ICD code (e.g. A02.1)"_ | Type at least **2 characters** to search. Each option shows the code with its short description, e.g. "A02.1 (Salmonella…)". |
| **YOS** | **Year of Service** | _"Select year"_ | Pick a year from the dropdown (you can type to filter). |

> **Picker messages:** For **ICD**, before you have typed two characters the list shows _"Type at least 2 characters"_. For **HCC** and **YOS**, when nothing matches, the list shows _"No matches"_.

### 3.4 Creating the Rule

Click **Create New Rule** (the navy button with the **+** icon) to save the rule.

- The button is **disabled** until you have selected a value.
- While the rule is being created, the button shows a loading state.
- On success, the new rule is added to the **bottom** of the rules table (the lowest priority), the picker is cleared, and a confirmation message appears. The tag type stays selected so you can create another rule of the same type.

> **Note:** Rules cannot be edited after they are created. To change a rule's value, delete it and create a new one.

---

## 4. Working with the Rules Table

Existing rules appear on the right, under the heading **Tagging Rules**, listed from highest priority (**1**) downward.

### 4.1 Table Columns

| Column | Header | What it shows |
|---|---|---|
| Reorder | _(no label)_ | A drag handle used to change the rule's priority. |
| Priority | **#** | The rule's priority number (1 = highest). Shows a small spinner while a reorder is saving. |
| Tag type | **Tag Type** | **HCC**, **ICD**, or **Year of Service**. |
| Value | **Code/YOS** | The matched value as a pill — e.g. "HCC 92", "A02.1", or "YOS 2024". |
| Created | **Date Created** | The date the rule was created. |
| Client | **Client** | The Client the rule belongs to. |
| Project | **Project** | The Project the rule belongs to. |
| Actions | _(no label)_ | A delete (trash) button. |

There is no pagination — all rules for the Project are listed, and the list scrolls within its panel if it is long. There is no row selection, bulk action, or detail/preview view; each rule is managed on its own row.

### 4.2 How Priority Decides the Tag

A chart can carry at most **one** HCC, **one** ICD, and **one** Year of Service Start tag. When a chart qualifies for more than one rule, the rule with the **higher priority** (closer to **#1**) wins and applies its tag. Ordering your rules therefore controls which tags charts receive.

### 4.3 Reordering Rules (Changing Priority)

Drag a rule by its **drag handle** (the left-most column) and drop it where you want it. A line shows where the rule will land. When you release, the priorities renumber automatically and the change is saved (the **#** column briefly shows a spinner). A confirmation message appears when it completes.

You can also reorder with the keyboard, following the on-screen instruction:

> _"To pick up a draggable row, press Space or Enter. While dragging, use the arrow keys to move the row. Press Space or Enter again to drop, or Escape to cancel."_

### 4.4 Deleting a Rule

1. Click the **trash icon** in the **Actions** column of the rule you want to remove.
2. A confirmation dialog titled **"Delete Tagging Rule?"** opens.
3. Click **Delete** to remove the rule, or **Cancel** to keep it. (Both buttons are disabled while the deletion is in progress, and a brief overlay covers the table.)

When a rule is deleted, the remaining rules renumber automatically and charts are re-tagged. A confirmation message appears when it completes.

---

## 5. Page States You May See

| State | What you see | What it means |
|---|---|---|
| **Loading** | A spinner in the rules table. | The list of rules is loading. |
| **No rules yet** | A tag icon, the heading **"No tagging rules yet"**, and the line **"Select a tag type and create your first rule."** | No rules exist yet for this Project. Create one from the left panel. |
| **Rules listed** | The rules table with one row per rule. | One or more rules exist. |
| **Deleting** | A brief overlay across the table. | A rule deletion is being processed. |

> Confirmations and errors for creating, reordering, and deleting rules appear as brief on-screen notifications (toasts) with the message returned by the system.

---

## 6. Tag Type Reference

| Tag type | Shown in **Tag Type** as | Value pill example | Source of values |
|---|---|---|---|
| **HCC** | HCC | HCC 92 | The Project's HCC code set (searchable). |
| **ICD** | ICD | A02.1 | ICD-10 diagnosis codes (searchable, 2+ characters). |
| **YOS** | Year of Service | YOS 2024 | The Project's available service years. |

---

## 7. Tips and Best Practices

- Decide your **priority order** deliberately — when a chart qualifies for several rules, the top-most rule wins.
- Remember a chart can hold only **one HCC, one ICD, and one Year of Service Start** tag at a time.
- For **ICD**, type at least two characters to start searching; use the short description in each option to confirm you have the right code.
- New rules always start at the **bottom** (lowest priority); drag them up if they should take precedence.
- To change a rule, **delete and recreate** it — rules cannot be edited in place.
- Reordering and deleting **re-tag charts**, so make these changes intentionally.

---

## 8. User Acceptance Testing (UAT)

Use this section to plan and record your testing of the Auto-Tagging page.

### 8.1 What to Verify

The checklist below covers the key behaviors to confirm. Tick each item as you test.

- [ ] Open the **Tagging** tab; the create-rule panel and rules table both load.
- [ ] The **Client** and **Project** shown in the left panel match your selection.
- [ ] The **HCC**, **ICD**, and **YOS** tabs each switch the picker and clear the previous value.
- [ ] The **HCC Code** picker searches/browses HCC codes and shows "No matches" when appropriate.
- [ ] The **ICD Code** picker requires 2+ characters ("Type at least 2 characters") and returns codes with descriptions.
- [ ] The **Year of Service** picker lists the Project's years.
- [ ] **Create New Rule** is disabled until a value is chosen, and a created rule appears at the bottom of the table.
- [ ] The table shows the correct **#**, **Tag Type**, **Code/YOS** pill, **Date Created**, **Client**, and **Project** for each rule.
- [ ] Dragging a rule reorders it, the **#** values renumber, and the change is saved.
- [ ] Keyboard reordering works per the on-screen instructions.
- [ ] The delete icon opens the **"Delete Tagging Rule?"** dialog; **Delete** removes the rule and **Cancel** keeps it.
- [ ] After deleting, the remaining rules renumber correctly.
- [ ] The **"No tagging rules yet"** empty state appears when no rules exist.
- [ ] Priority behaves as described — a chart that qualifies for multiple rules is tagged by the highest-priority rule.

### 8.2 Reporting Issues

If something does not work as described, please report it with the following details so it can be reproduced quickly:

- The steps you followed.
- The Client and Project, the tag type, and the value you used.
- The priority order of the rules at the time.
- What you expected to happen.
- What actually happened.
- A screenshot, if possible.

> **Action:** Record issues in your project's UAT issue tracker: _[ Insert your UAT issue-tracking link or contact here ]_

---

## 9. Glossary

| Term | Meaning |
|---|---|
| **Auto-tagging** | Automatically applying tags to charts based on rules you define. |
| **Tagging rule** | A mapping from a single value (HCC code, ICD code, or service year) to a tag, scoped to a Client and Project. |
| **Priority** | A rule's rank in the list (1 = highest). Higher-priority rules win when a chart qualifies for more than one. |
| **HCC** | Hierarchical Condition Category. |
| **ICD** | International Classification of Diseases (ICD-10 diagnosis coding). |
| **YOS** | Year of Service (Start). |
| **Tag** | A label applied to a chart so it can be found and acted on in the Repository. |
| **Client / Project** | The scope your rules and tagging apply to; set elsewhere in the application. |

---

## Appendix A. Revision History

| Version | Date | Description | Author |
|---|---|---|---|
| 1.0 | June 2026 | Initial release for client UAT. | Product Team |

---

_Proprietary & Confidential_
