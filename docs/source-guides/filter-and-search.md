---
sidebar_position: 3
---

# Filter & Search — Chart Repository User Guide

**Document:** Filter and Search User Guide
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
  - [2.2 Opening the Filter and Search Page](#22-opening-the-filter-and-search-page)
  - [2.3 Understanding the Page Layout](#23-understanding-the-page-layout)
- [3. Searching for Charts](#3-searching-for-charts)
  - [3.1 Client and Project](#31-client-and-project)
  - [3.2 Filter Reference](#32-filter-reference)
  - [3.3 Selecting Chart Statuses](#33-selecting-chart-statuses)
  - [3.4 Combining Filters](#34-combining-filters)
  - [3.5 Clearing Filters](#35-clearing-filters)
- [4. Working with Results](#4-working-with-results)
  - [4.1 Results Columns](#41-results-columns)
  - [4.2 Sorting](#42-sorting)
  - [4.3 Pagination](#43-pagination)
  - [4.4 Chart Status Reference](#44-chart-status-reference)
  - [4.5 Tags](#45-tags)
- [5. Previewing a Chart](#5-previewing-a-chart)
  - [5.1 Chart Details](#51-chart-details)
  - [5.2 Viewing the Document](#52-viewing-the-document)
- [6. Selecting and Exporting Charts](#6-selecting-and-exporting-charts)
  - [6.1 Selecting Charts](#61-selecting-charts)
  - [6.2 Exporting Charts](#62-exporting-charts)
- [7. Saving and Reusing Searches](#7-saving-and-reusing-searches)
  - [7.1 Saving a Search](#71-saving-a-search)
  - [7.2 Applying a Saved Search](#72-applying-a-saved-search)
  - [7.3 Viewing a Saved Search's Filters](#73-viewing-a-saved-searchs-filters)
  - [7.4 Renaming a Saved Search](#74-renaming-a-saved-search)
  - [7.5 Updating a Saved Search](#75-updating-a-saved-search)
  - [7.6 Deleting a Saved Search](#76-deleting-a-saved-search)
- [8. Tips and Best Practices](#8-tips-and-best-practices)
- [9. User Acceptance Testing (UAT)](#9-user-acceptance-testing-uat)
  - [9.1 What to Verify](#91-what-to-verify)
  - [9.2 Reporting Issues](#92-reporting-issues)
- [10. Glossary](#10-glossary)
- [Appendix A. Revision History](#appendix-a-revision-history)

---

## 1. Introduction

The Filter and Search page is part of the Chart Repository. It lets you locate medical charts using a rich set of search filters, review each chart's details, preview the source document, save the searches you use most often, and export selected charts for download. This guide explains every feature on the page so that you can complete User Acceptance Testing (UAT) with confidence.

### 1.1 Purpose of This Guide

This guide is a step-by-step reference for the Filter and Search page. It describes what each control does, how to perform common tasks, and what you should expect to see, so you can verify that the application behaves correctly during UAT.

### 1.2 Intended Audience

This guide is written for client reviewers and testers who will validate the Filter and Search page during UAT. It assumes that you:

- Have valid sign-in credentials for the application.
- Have permission to access the Chart Repository.
- Have a Client and Project selected (your results are scoped to that selection).

### 1.3 How to Use This Guide

- **Sections follow real tasks** — searching, reviewing results, previewing, exporting, and saving searches.
- **On-screen labels, buttons, and field names** appear in **bold**, exactly as they read in the application.
- **Reference tables** list every filter, column, and status so nothing is left to guesswork.
- **A UAT checklist** is provided in Section 9 to help you record your test results.

---

## 2. Getting Started

### 2.1 Before You Begin

Make sure the following are in place before you start testing:

- You are signed in to the application.
- A **Client** and **Project** are selected. The filter panel shows the active Client and Project at the top, and all results are limited to that Project.

### 2.2 Opening the Filter and Search Page

1. Sign in to the application.
2. Open the **Chart Repository** from the main navigation.
3. Select the **Filter and Search** page.

### 2.3 Understanding the Page Layout

The page is divided into two areas:

| Area | Location | What it is for |
|---|---|---|
| **Filter panel** | Left | Enter your search criteria, apply chart-status and date filters, clear filters, and manage saved searches. |
| **Results area** | Right | View the charts that match your filters, sort and page through them, select charts, open a chart preview, and export selected charts. |

---

## 3. Searching for Charts

There is no single search box on this page. Instead, you build a search by filling in one or more filter fields in the left panel. As you change the filters, the results list refreshes automatically a moment after you stop typing — you do not need to press a search button.

Two short instructions appear at the top of the filter panel:

- _"Use the fields below to search."_
- _"Use a comma to add multiple inputs."_

### 3.1 Client and Project

At the top of the filter panel, a read-only card shows the active **Client** and **Project**. These values are set elsewhere in the application and cannot be edited here. All search results belong to the selected Project.

### 3.2 Filter Reference

The table below lists every filter available in the panel.

| Filter | How to enter a value | What it searches |
|---|---|---|
| **HCC Search** | Type one or more HCC codes; press Enter or a comma to add each as a chip (placeholder: "Enter Code(s)"). | Charts associated with the HCC code(s) you enter. |
| **ICD Search** | Type one or more ICD codes, separated by commas (placeholder: "Enter Code(s)"). | Charts associated with the ICD diagnosis code(s). |
| **Provider NPI** | Type one or more NPIs, separated by commas (placeholder: "Enter NPI"). | Charts for the provider National Provider Identifier(s). |
| **Provider TIN** | Type one or more TINs, separated by commas (placeholder: "Enter TIN"). | Charts for the provider Tax Identification Number(s). |
| **Provider Name** | Start typing in the dropdown ("Select Provider"); matching providers appear as you type. Selected providers are shown as removable chips. If none match, you see "No providers found". | Charts for the selected provider(s). |
| **Member Name** | Type one or more member names, separated by commas (placeholder: "Enter Member Name"). | Charts for the member/patient name(s). |
| **Client Request ID** | Type one or more IDs, separated by commas (placeholder: "Enter Client Request ID"). | Charts matching the request ID(s) supplied by the client. |
| **Request ID (evaire-generated)** | Type one or more IDs, separated by commas (placeholder: "Enter evaire Request ID"). | Charts matching the system-generated request ID(s). |
| **Chart Status** | Click a status chip to include it; click again to remove it. You may select several. | Charts in the selected workflow status(es). See the [Chart Status Reference](#44-chart-status-reference). |
| **Year of Service Start** | Choose a year from the dropdown ("Choose a Year"). Selected years appear as "YOS &lt;year&gt;" chips. If none match, you see "No years found". | Charts whose service year matches your selection. |
| **Date of Service** | Pick a date range (format MM/DD/YYYY - MM/DD/YYYY); quick-range shortcuts are available. Click "+ Add another date range" to add more ranges; remove a range with the ✕ icon. | Charts with a date of service that falls within the chosen range(s). |

> **Tip:** The code and identifier fields — **HCC Search, ICD Search, Provider NPI, Provider TIN, Member Name, Client Request ID,** and **Request ID** — accept multiple values. Separate them with commas, and each value becomes its own chip that you can remove individually.

### 3.3 Selecting Chart Statuses

The **Chart Status** filter shows six status chips. Click a chip to include that status in your search; click it again to remove it. A selected chip appears in its status color, while unselected chips are gray. The six selectable statuses are:

- **Request Associated**
- **Awaiting Exception Resolution**
- **Escalated Exception**
- **Available for Extraction**
- **Extracted**
- **Archived**

Each status and its meaning are described in the [Chart Status Reference](#44-chart-status-reference).

### 3.4 Combining Filters

You can use several filters together to narrow a large set of charts — for example, a provider together with a chart status and a date range. The more filters you add, the more specific your results become. You can also enter multiple values in a single field and add more than one date range. Results refresh automatically as you make changes.

### 3.5 Clearing Filters

To start over, click **Clear Filters** at the bottom-left of the panel. This resets every filter and clears any saved search you have applied. The button is available only when at least one filter is active.

---

## 4. Working with Results

Charts that match your filters appear in the table on the right, under the heading **Results (N)**, where _N_ is the total number of matching charts.

### 4.1 Results Columns

| Column | Description |
|---|---|
| **Chart ID** | The unique identifier of the chart. |
| **Request ID** | The system-generated request ID, or "-" if none. |
| **Client Request ID** | The client-supplied request ID, or "-" if none. |
| **Member Name** | The member/patient name. |
| **Provider Name** | The healthcare provider's name. |
| **DOS (Start - End Date)** | The date-of-service range, shown as a start and end date, or "-" if none. |
| **Chart Status** | The current workflow status, shown as a colored badge. |
| **Tags** | Labels applied to the chart (rule tags first, then semantic tags); "-" if the chart has no tags. |
| **Audit Type** | The audit type in uppercase (for example, MRA, HEDIS, RADV, or ACA), or "-" if none. |
| **Action** | Contains the **View** button, which opens a preview of the chart. |

### 4.2 Sorting

Click a column header to sort by that column; click it again to reverse the order. Please note:

- You can sort by one column at a time.
- Sorting applies to the charts on the current page.
- The **Tags** column cannot be sorted.

### 4.3 Pagination

Use the pagination controls below the table to move between pages and to change how many charts appear per page (the default is 10). The total number of matching charts is always shown in the **Results (N)** heading.

### 4.4 Chart Status Reference

A chart's status reflects where it is in the retrieval and extraction workflow. Each status below can be used in the **Chart Status** filter and appears as a colored badge in the results.

| Status (as shown on screen) | Badge color | Meaning |
|---|---|---|
| **Request Associated** | 🟠 Orange | A retrieval request has been associated with the chart. |
| **Awaiting Exception Resolution** | 🟣 Purple | The chart has an exception that must be resolved before it can proceed. |
| **Escalated Exception** | 🟡 Yellow | An exception on the chart has been escalated for review. |
| **Available for Extraction** | 🔵 Blue | The chart is ready for data extraction. |
| **Extracted** | 🟢 Green | Data extraction for the chart is complete. |
| **Archived** | 🔴 Red | The chart has been archived. |

### 4.5 Tags

Charts can carry two kinds of tags, shown as small colored pills:

- **Rule tags** — shown in neutral gray, and listed first.
- **Semantic tags** — shown in purple, and listed after the rule tags.

When a chart has many tags, they wrap onto multiple lines. A chart with no tags shows "-".

---

## 5. Previewing a Chart

1. In the results table, find the chart you want to review and click **View** (the eye icon) in the **Action** column.
2. A preview window opens, showing the chart document and a details panel.

### 5.1 Chart Details

The **Chart Details** panel beside the document summarizes the chart in two columns:

| Left column | Right column |
|---|---|
| **Chart ID** | **Request ID** |
| **Client Request ID** | **Member Name** |
| **Provider Name** | **DOS Start - End** |
| **Chart Status** | **Existing Tags** |
| **Audit Type** | |

- Any value that is not available is shown as "-".
- Under **Existing Tags**, up to two tags are shown; any additional tags are collapsed into a "+N" pill. Hover over that pill to see the remaining tags.

### 5.2 Viewing the Document

- **PDF charts** open in a built-in PDF viewer.
- **C-CDA (XML) charts** open in a C-CDA viewer.

Close the preview to return to the results list.

---

## 6. Selecting and Exporting Charts

### 6.1 Selecting Charts

- Use the checkbox at the start of each row to select one or more charts.
- When at least one chart is selected, a **"N chart(s) selected"** indicator appears above the table.
- Your selection is kept as you move between pages.
- Changing your filters clears the current selection.

### 6.2 Exporting Charts

1. Select the charts you want to export.
2. Click **Export Selected Charts** at the top-right of the results area. (This button is enabled only when at least one chart is selected.)
3. In the **Export Selected Charts** dialog, review the **Chart Selections** table, which lists the **Chart ID**, **Member**, **Provider**, and **Chart Status** of each selected chart.
4. Click **Export Charts as ZIP** to start the export, or **Cancel** to go back.

> **Note:** _"Charts will be packaged into a ZIP file and available to download from your notifications once ready."_ After the export starts, the dialog closes and your selection is cleared.

---

## 7. Saving and Reusing Searches

You can save filter combinations you use often and reapply them in a single click. The **Saved Searches** section is at the bottom of the filter panel; click its heading to expand or collapse it.

### 7.1 Saving a Search

1. Set up the filters you want to save.
2. Click **Save Search** at the bottom-right of the panel (enabled when at least one filter is active).
3. Enter a name in the **Save your search** field (a name is required), then click **Save**. You can also press **Enter** to save or **Esc** to cancel.

### 7.2 Applying a Saved Search

Expand the **Saved Searches** section and click a saved search's name to apply its filters. The selected search is highlighted.

### 7.3 Viewing a Saved Search's Filters

Click **Expand** on a saved search to see its filters listed as chips. Click **Collapse** to hide them again.

### 7.4 Renaming a Saved Search

1. Expand the saved search, then click the **edit (pencil)** icon.
2. Type the new name and confirm with the **check** icon or by pressing **Enter**. To cancel, press **Esc** or click the **✕** icon.

### 7.5 Updating a Saved Search

With a saved search applied, adjust the filters and then click **Update Saved Search** to overwrite it with the current filters. Alternatively, click **Save New Search** to save the current filters as a new search instead.

### 7.6 Deleting a Saved Search

1. Click the **delete (trash)** icon on the saved search you want to remove.
2. In the **Delete Saved Search** dialog ("Are you sure you want to delete ...? This action cannot be undone."), click **Delete** to confirm, or **Cancel** to keep it.

---

## 8. Tips and Best Practices

- Use commas to add several values to one field quickly.
- Combine filters to narrow down large result sets.
- Save searches you run regularly so you can reapply them in one click.
- The page address (URL) reflects your current filters and page. You can bookmark or share it to return to exactly the same view later.
- Sorting affects only the current page — use filters to bring the charts you want onto the page.

---

## 9. User Acceptance Testing (UAT)

Use this section to plan and record your testing of the Filter and Search page.

### 9.1 What to Verify

The checklist below covers the key behaviors to confirm. Tick each item as you test.

- [ ] Open the Filter and Search page; the filter panel and results area both load.
- [ ] The Client and Project shown at the top match your selection.
- [ ] Each filter (HCC, ICD, NPI, TIN, Provider Name, Member Name, request IDs) returns the expected charts.
- [ ] Comma-separated values create separate chips in the text fields.
- [ ] Chart Status chips can be selected and cleared, and they filter the results.
- [ ] A date range filters the results; adding a second range works as expected.
- [ ] **Clear Filters** resets all filters and results.
- [ ] Result columns, the **Results (N)** count, sorting, and pagination behave correctly.
- [ ] **View** opens the chart preview; the Chart Details panel and document viewer display correctly for both PDF and C-CDA charts.
- [ ] Tags display correctly in the results and in the preview.
- [ ] Selecting charts works, and the selection persists across pages.
- [ ] **Export Selected Charts** produces a ZIP that becomes available in notifications.
- [ ] Saving, applying, renaming, updating, and deleting a saved search all work.
- [ ] Bookmarking the page URL reopens the same filters and page.

### 9.2 Reporting Issues

If something does not work as described, please report it with the following details so it can be reproduced quickly:

- The steps you followed.
- The filters you used (or the page URL, which captures them).
- What you expected to happen.
- What actually happened.
- A screenshot, if possible.

> **Action:** Record issues in your project's UAT issue tracker: _[ Insert your UAT issue-tracking link or contact here ]_

---

## 10. Glossary

| Term | Meaning |
|---|---|
| **Chart** | A medical record document stored in the repository. |
| **HCC** | Hierarchical Condition Category. |
| **ICD** | International Classification of Diseases (diagnosis coding). |
| **NPI** | National Provider Identifier. |
| **TIN** | Tax Identification Number. |
| **DOS** | Date of Service. |
| **YOS** | Year of Service. |
| **C-CDA** | Consolidated Clinical Document Architecture — a standard clinical document (XML) format. |
| **Rule tag / Semantic tag** | Labels applied to a chart. Rule tags come from coding rules (HCC/ICD); semantic tags are model-derived. |
| **MRA / HEDIS / RADV / ACA** | Audit types that can be associated with a chart. |
| **ZIP** | A compressed file that bundles the exported charts for download. |

---

## Appendix A. Revision History

| Version | Date | Description | Author |
|---|---|---|---|
| 1.0 | June 2026 | Initial release for client UAT. | Product Team |

---

_Proprietary & Confidential_
