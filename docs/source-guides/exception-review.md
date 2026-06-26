---
sidebar_position: 2
---

# Exception Review — Chart Repository User Guide

**Document:** Exception Review User Guide
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
  - [2.2 Opening the Exception Review Page](#22-opening-the-exception-review-page)
  - [2.3 How Exceptions Are Assigned](#23-how-exceptions-are-assigned)
  - [2.4 Understanding the Page Layout](#24-understanding-the-page-layout)
- [3. Reading the Exception](#3-reading-the-exception)
  - [3.1 The Header (Your Session Counters)](#31-the-header-your-session-counters)
  - [3.2 Request Details](#32-request-details)
  - [3.3 The Two Documents](#33-the-two-documents)
  - [3.4 Page Thumbnails and Badges](#34-page-thumbnails-and-badges)
- [4. Classifying the Documents (The Delta Table)](#4-classifying-the-documents-the-delta-table)
  - [4.1 What a Delta Row Means](#41-what-a-delta-row-means)
  - [4.2 Delta Table Columns](#42-delta-table-columns)
  - [4.3 Adding a Row](#43-adding-a-row)
  - [4.4 Setting the Classification](#44-setting-the-classification)
  - [4.5 Setting the Page Ranges](#45-setting-the-page-ranges)
  - [4.6 Selecting a Row to Navigate the Documents](#46-selecting-a-row-to-navigate-the-documents)
  - [4.7 Deleting a Row](#47-deleting-a-row)
  - [4.8 Clearing the Table](#48-clearing-the-table)
- [5. Validation Rules and Messages](#5-validation-rules-and-messages)
  - [5.1 Page Overlap (Conflict)](#51-page-overlap-conflict)
  - [5.2 Uncovered Pages (Coverage)](#52-uncovered-pages-coverage)
  - [5.3 Equal Page-Count Mismatch](#53-equal-page-count-mismatch)
  - [5.4 Duplicate Row](#54-duplicate-row)
- [6. Submitting an Exception](#6-submitting-an-exception)
- [7. Escalating an Exception](#7-escalating-an-exception)
- [8. Session and Lock Behavior](#8-session-and-lock-behavior)
- [9. Page States You May See](#9-page-states-you-may-see)
- [10. Tips and Best Practices](#10-tips-and-best-practices)
- [11. User Acceptance Testing (UAT)](#11-user-acceptance-testing-uat)
  - [11.1 What to Verify](#111-what-to-verify)
  - [11.2 Reporting Issues](#112-reporting-issues)
- [12. Glossary](#12-glossary)
- [Appendix A. Revision History](#appendix-a-revision-history)

---

## 1. Introduction

The Exception Review page is part of the Chart Repository. It is where a reviewer reconciles two versions of the same chart — **Document 1** and **Document 2** — that the system could not automatically merge. You view both documents side by side, tell the system which pages are the **same** across the two documents and which pages are **unique** to each, and then either **submit** your classification (so the documents can be merged) or **escalate** the pair for senior review. This guide explains every control on the page so that you can complete User Acceptance Testing (UAT) with confidence.

### 1.1 Purpose of This Guide

This guide is a step-by-step reference for the Exception Review page. It describes what each control does, how to classify a document pair, what the validation messages mean, and what you should expect to see, so you can verify that the application behaves correctly during UAT.

### 1.2 Intended Audience

This guide is written for client reviewers and testers ("reps") who will validate the Exception Review page during UAT. It assumes that you:

- Have valid sign-in credentials for the application.
- Have permission to access the Chart Repository and to review exceptions.
- Are comfortable reading a clinical document (PDF) and comparing two versions of it.

### 1.3 How to Use This Guide

- **Sections follow the real task flow** — opening the page, reading the exception, classifying the pages, and submitting or escalating.
- **On-screen labels, buttons, and field names** appear in **bold**, exactly as they read in the application.
- **Reference tables** list every column, status, badge, and message so nothing is left to guesswork.
- **A UAT checklist** is provided in Section 11 to help you record your test results.

---

## 2. Getting Started

### 2.1 Before You Begin

Make sure the following are in place before you start testing:

- You are signed in to the application.
- You have permission to review exceptions.
- There are exceptions waiting in the queue. If the queue is empty, the page tells you so (see [Section 9](#9-page-states-you-may-see)).

### 2.2 Opening the Exception Review Page

1. Sign in to the application.
2. Open the **Chart Repository** from the main navigation.
3. Select the **Exceptions** page.

### 2.3 How Exceptions Are Assigned

Unlike the Filter and Search page, there is **no search box and no result list** here. You work on **one exception at a time**:

- When the page opens, the system **automatically assigns you the next exception** from the queue and displays it.
- The exception is **locked to you** for a short period (see [Section 8](#8-session-and-lock-behavior)) so that no one else edits the same pair while you work.
- When you **Submit** or **Escalate**, the system finishes that exception and **automatically loads the next one** in its place. You do not navigate anywhere.
- When there are no more exceptions, you see a message confirming you are caught up.

### 2.4 Understanding the Page Layout

The page is divided into two areas:

| Area | Location | What it is for |
|---|---|---|
| **Document area** | Left | View **Document 1** and **Document 2** side by side, each in its own PDF viewer, with a page-thumbnail rail and classification badges. |
| **Review panel** | Right | A vertical stack of three panels: your session counters (**header**), the patient/request details, and the **Delta Table** where you classify the pages and submit or escalate. |

The two PDF viewers are separated by a vertical divider. **Document 1** sits on the left with its thumbnail rail on the right edge; **Document 2** sits on the right with its thumbnail rail on the left edge, so the two thumbnail rails face each other in the middle.

---

## 3. Reading the Exception

### 3.1 The Header (Your Session Counters)

At the top of the right-hand panel, a header shows today's date (in **MM/DD/YYYY** format) and two running counters for your current session:

| Counter | Label on screen | Badge color | Meaning |
|---|---|---|---|
| Reviewed | **Exceptions Reviewed:** | 🟢 Green | How many exceptions you have submitted (merged) so far. |
| Escalated | **Escalated:** | 🟡 Yellow | How many exceptions you have escalated so far. |

These counts go up as you complete exceptions during your session.

### 3.2 Request Details

Below the header, a read-only panel summarizes the patient and request tied to this exception:

| Field | Label on screen | Notes |
|---|---|---|
| Member name | _(shown as a heading)_ | The member/patient name. |
| Date of birth | **DOB:** | Formatted **MM/DD/YYYY**, or **—** if not available. |
| Date of service (start) | **DOS Start:** | Formatted **MM/DD/YYYY**, or **—** if not available. |
| Date of service (end) | **DOS End:** | Formatted **MM/DD/YYYY**, or **—** if not available. |
| Provider | **Provider Name:** | The healthcare provider's name. |

> **Note:** A dash (**—**) means the value is not available for this exception.

### 3.3 The Two Documents

Each document opens in its own PDF viewer:

- The left viewer's toolbar is titled **Document 1**.
- The right viewer's toolbar is titled **Document 2**.

Use each viewer to scroll, page through, and read the document. Your job is to compare the two and decide, page by page, what is shared and what is unique.

### 3.4 Page Thumbnails and Badges

Each viewer has a **thumbnail rail** that shows a small image of every page. You can:

- **Click a thumbnail** to jump the main viewer to that page.
- **Resize the rail** by dragging the inner edge that faces the PDF. A thin blue line appears while you drag. (The rail width is limited to a sensible minimum and maximum.)

As you classify pages in the Delta Table, each thumbnail gets a colored **badge** so you can see your classification at a glance:

| Badge | Color | Meaning |
|---|---|---|
| **Same \| N** | 🔵 Blue | This page is part of an "equal" classification. The number **N** pairs up the matching chunk across the two documents (group 1, group 2, and so on). |
| **Unique** | 🟢 Green | This page exists in only this document. |

The whole thumbnail is also highlighted in the matching color (blue for "same", green for "unique").

---

## 4. Classifying the Documents (The Delta Table)

The **Delta Table** (right-hand panel, titled **Delta Table**) is where you record your decisions. You build a list of **rows**, where each row describes a chunk of pages and how it relates across the two documents.

### 4.1 What a Delta Row Means

Every row is one of three kinds:

| Row kind | Toggle button | What it says |
|---|---|---|
| **Same on both documents** | **=** (center button) | A range of pages in Document 1 matches the same number of pages in Document 2. |
| **Unique to Document 1** | **Unique** (left button) | A range of pages exists only in Document 1. |
| **Unique to Document 2** | **Unique** (right button) | A range of pages exists only in Document 2. |

Your goal is to add rows until **every page** of both documents is accounted for exactly once.

### 4.2 Delta Table Columns

| Column | Header on screen | What it shows / does |
|---|---|---|
| Row number | **#** | The row's position in the list (1, 2, 3 …). |
| Document 1 pages | **Doc 1** | A **Start** and **End** page picker for Document 1. Disabled for a row that is unique to Document 2. |
| Classification | **Delta** | A three-way toggle: **Unique** (Doc 1) / **=** / **Unique** (Doc 2). |
| Document 2 pages | **Doc 2** | A **Start** and **End** page picker for Document 2. Disabled for a row that is unique to Document 1. |
| Remove | _(no label)_ | A trash icon that deletes the row. |

### 4.3 Adding a Row

Click **Add row** (with the **+** icon) at the bottom of the table. A new row appears, ready for you to set its classification and page ranges.

### 4.4 Setting the Classification

In the **Delta** column, click one of the three toggle buttons:

- **Unique** (left) — the pages belong only to Document 1. The **Doc 2** range becomes empty and disabled.
- **=** (center) — the pages are the same in both documents. Both **Doc 1** and **Doc 2** ranges are active.
- **Unique** (right) — the pages belong only to Document 2. The **Doc 1** range becomes empty and disabled.

### 4.5 Setting the Page Ranges

In the **Doc 1** and **Doc 2** columns, use the **Start** and **End** dropdowns to choose the first and last page of the chunk. Only the pages that exist in that document are offered. For a single page, set **Start** and **End** to the same number.

> **Remember:** For an **=** (equal) row, the number of pages selected on each side must match — for example, pages 1–3 in Document 1 with pages 1–3 in Document 2. See [Section 5.3](#53-equal-page-count-mismatch).

### 4.6 Selecting a Row to Navigate the Documents

Click anywhere on a row (other than its dropdowns or the classification toggle) to **select** it. The selected row is highlighted, and both PDF viewers jump to that row's starting page on each side, so you can quickly check your work. (For a unique row, only the relevant document scrolls.) You can also select a focused row with **Enter** or the **Space** bar.

### 4.7 Deleting a Row

Click the **trash icon** at the end of a row to remove just that row.

### 4.8 Clearing the Table

To start the classification over, open the **More actions** menu (the **⋮** button next to **Submit**) and choose **Clear Table**. This removes all rows at once. You can then add new rows from scratch.

---

## 5. Validation Rules and Messages

The page checks your classification continuously and will not let you submit until it is valid. The **Submit** button stays disabled while any of the following problems exist. Messages appear inline (in red) in the Delta Table.

### 5.1 Page Overlap (Conflict)

Each page may be classified in only one row. If two rows cover the same page, the affected rows are highlighted in red and you see:

> _"Each page can be classified in only one row. Adjust the highlighted rows so their page ranges don't overlap before submitting."_

### 5.2 Uncovered Pages (Coverage)

Every page in both documents must be classified before you can submit. If any pages are left out, you see:

> _"All pages must be classified before submitting."_

When pages are missing, the message also lists exactly which ones — for example:

> _"All pages must be classified before submitting. Doc 1 missing: 5-7, 10. Doc 2 missing: 3."_

### 5.3 Equal Page-Count Mismatch

For an **=** (equal) row, the number of pages on each side must be the same. If they differ, that row shows:

> _"Page count needs to be equal between documents."_

### 5.4 Duplicate Row

Two rows must not be identical. If a row repeats another row's classification and ranges, it shows:

> _"This row is a duplicate of another row. Remove or modify it before submitting."_

---

## 6. Submitting an Exception

When your classification is complete and valid:

1. Review the Delta Table one last time — confirm there are no red messages and every page is accounted for.
2. Click **Submit** (the navy button at the top-right of the Delta Table).
3. The system records your classification and merges the two documents.
4. On success, the page **automatically loads the next exception** from the queue, and your **Exceptions Reviewed** counter goes up by one.

While the submission is processing, the **Submit** button shows a loading state and stays disabled to prevent a double-submit. The button is also disabled whenever the table is empty or any validation message is showing.

---

## 7. Escalating an Exception

If the pair cannot be classified — for example, the two documents are clearly not the same request, or a document is not readable — escalate it instead of submitting:

1. Open the **More actions** menu (the **⋮** button) and choose **Escalate**. The Delta Table switches to escalation mode and the validation messages are set aside.
2. In the **Reason for escalation** field (required), choose one of:
   - **Requests Not Matching**
   - **Not Readable**
3. Click **Submit** to send the escalation. (Submit stays disabled until you choose a reason.)
4. On success, the page **automatically loads the next exception**, and your **Escalated** counter goes up by one.

To back out of escalation mode without escalating, click **Cancel Escalation**. This returns you to the normal classification view with your rows intact.

---

## 8. Session and Lock Behavior

- When you open an exception, it is **locked to you for 15 minutes** so no one else can edit the same pair.
- While you are actively working on the page, the application **keeps the lock alive automatically** in the background — you do not need to do anything.
- If you leave the exception open and step away for a long time, the lock can expire and the exception may return to the queue for someone else.
- Your in-progress rows are kept while you work; a routine background refresh of the same exception will **not** wipe your edits.

---

## 9. Page States You May See

| State | What you see | What it means |
|---|---|---|
| **Loading** | A large spinner in the center of the page. | The system is fetching your next exception. |
| **Queue empty** | A blue panel titled **"No exceptions to review"** with the text _"No exceptions to review at the moment. Check again later for new items."_ | You are caught up — there is nothing to review right now. |
| **Load error** | A red panel titled **"Unable to load exception"** with an explanation (for example, _"We couldn't load this exception. Please refresh or pick another from the queue."_). | The exception could not be loaded. Refresh the page or try again. |
| **Working** | The two documents and the Delta Table. | An exception is assigned and ready for you to classify. |

---

## 10. Tips and Best Practices

- Work through the documents **in page order** and add a row for each chunk as you go — it is the easiest way to be sure every page is covered.
- Use the thumbnail **badges** (**Same | N** in blue, **Unique** in green) as a running map of what you have already classified.
- **Click a row** to jump both viewers to its pages — a quick way to double-check a classification before submitting.
- For **=** rows, make sure both sides cover the **same number of pages**.
- Read the inline red messages: they tell you exactly which pages overlap or are still missing.
- If a pair genuinely cannot be reconciled, **escalate** with the correct reason rather than guessing.

---

## 11. User Acceptance Testing (UAT)

Use this section to plan and record your testing of the Exception Review page.

### 11.1 What to Verify

The checklist below covers the key behaviors to confirm. Tick each item as you test.

- [ ] Open the Exceptions page; an exception loads automatically, showing both documents and the review panel.
- [ ] The header shows today's date and the **Exceptions Reviewed** and **Escalated** counters.
- [ ] The Request Details panel shows the member name, **DOB**, **DOS Start**, **DOS End**, and **Provider Name** (with **—** where a value is missing).
- [ ] Both PDF viewers (**Document 1** and **Document 2**) load and can be scrolled.
- [ ] Thumbnail rails display, can be clicked to jump pages, and can be resized.
- [ ] **Add row** adds a row; the **#**, **Doc 1**, **Delta**, and **Doc 2** columns behave as described.
- [ ] The **Delta** toggle switches a row between **Unique** (Doc 1), **=**, and **Unique** (Doc 2), enabling/disabling the correct page pickers.
- [ ] The **Start** / **End** pickers only offer pages that exist in that document.
- [ ] Selecting a row highlights it and scrolls the viewer(s) to the row's pages.
- [ ] Thumbnail badges show **Same | N** (blue) and **Unique** (green) as rows are classified.
- [ ] The **trash icon** removes a single row; **Clear Table** removes all rows.
- [ ] Validation works: overlap, uncovered pages (with the missing-page list), equal page-count mismatch, and duplicate-row messages all appear, and **Submit** is disabled while any are showing.
- [ ] **Submit** merges a valid classification, increments **Exceptions Reviewed**, and loads the next exception.
- [ ] **Escalate** shows the **Reason for escalation** field; submitting with **Requests Not Matching** or **Not Readable** increments **Escalated** and loads the next exception.
- [ ] **Cancel Escalation** returns to the normal view with rows intact.
- [ ] When the queue is empty, the **"No exceptions to review"** message appears.

### 11.2 Reporting Issues

If something does not work as described, please report it with the following details so it can be reproduced quickly:

- The steps you followed.
- The member/request you were reviewing (member name and dates), if you can share them.
- The rows and classifications you entered.
- What you expected to happen.
- What actually happened.
- A screenshot, if possible.

> **Action:** Record issues in your project's UAT issue tracker: _[ Insert your UAT issue-tracking link or contact here ]_

---

## 12. Glossary

| Term | Meaning |
|---|---|
| **Exception** | A pair of chart documents the system could not merge automatically and that needs manual review. |
| **Document 1 / Document 2** | The two versions of the chart being compared, shown side by side. |
| **Delta** | The difference between the two documents, expressed as a set of rows. |
| **Delta Table** | The panel where you record, row by row, which pages are the same and which are unique. |
| **Delta row** | One entry in the Delta Table describing a chunk of pages and how it relates across the two documents. |
| **Equal (=)** | A classification meaning the selected pages are identical in both documents. |
| **Unique** | A classification meaning the selected pages exist in only one of the two documents. |
| **Same \| N** | A page badge for an equal classification; **N** pairs the matching chunk across the two documents. |
| **Escalate** | Flag a pair for senior review instead of merging it, with a stated reason. |
| **Lock** | A temporary hold that assigns the exception to you so others cannot edit it at the same time. |
| **Member** | The patient the chart belongs to. |
| **Provider** | The healthcare provider associated with the chart. |
| **DOB** | Date of Birth. |
| **DOS** | Date of Service. |

---

## Appendix A. Revision History

| Version | Date | Description | Author |
|---|---|---|---|
| 1.0 | June 2026 | Initial release for client UAT. | Product Team |

---

_Proprietary & Confidential_
