---
sidebar_position: 5
---

# Semantic Search

Semantic search lets authorized users find clinically relevant information across a project's charts by typing a natural-language question or phrase — for example, *"uncontrolled type 2 diabetes with neuropathy"* — instead of matching exact keywords. It returns the most relevant passages (snippets) from patient charts, ranked by how closely they match the query.

The actual matching and ranking are **performed by an AI search service provided by the AI team**. ECLAT.Retrieve sends the search request to that service and returns the results to the user.

---

## How it works (overview)

1. A user submits a search for a specific project, providing their query and a few search options.
2. ECLAT.Retrieve passes the request to the **AI team's search API**, which finds the matching passages across the project's charts.
3. The results are returned to the user — grouped by chart, with the relevant snippets and the patient/member each chart belongs to.

Charts must already be processed and made available to the AI service (handled by the chart ingestion process) before they can be searched.

---

## Who can use it

Semantic search is available to authorized roles only:

- **Client Relationship Manager**
- **Client**

Because results contain patient information, access is restricted and every search is recorded for audit purposes.

---

## What the user provides

A search is always tied to a single **project**. Within that project, the user provides a query and an allowed set of filters.

### Filters allowed

| Filter | Required? | Allowed values | Description |
|---|---|---|---|
| **Query** | Yes | Text, 1–1,000 characters | The natural-language phrase to search for. |
| **Minimum confidence** | Yes | A number from `0` to `1` | Only matches at or above this confidence are counted as results. |
| **Encounters per chart** | No | A whole number, or `"All"` (default) | The most matching encounters to return per chart. `"All"` returns every match. |
| **Year of service (start)** | No | A year from `1900` to `2100` | Only includes encounters on or after this year. |

The project itself is not entered as a filter — it is taken from the project the user is currently working in.

---

## What the search returns (response passed)

The response is a summary plus the matching charts.

| Field | Description |
|---|---|
| **Total charts** | The number of charts available to search in the project. |
| **Total matches** | How many charts had matches at or above the chosen confidence. |
| **Charts** | The list of matching charts (see below). |

Each **chart** in the list contains:

| Field | Description |
|---|---|
| **Chart ID** | Identifier of the matching chart. |
| **Member name** | The patient the chart belongs to (may be empty if not known locally). |
| **Snippets** | The matching passages within that chart (see below). |

Each **snippet** contains:

| Field | Description |
|---|---|
| **Section** | The part of the document the passage came from. |
| **Text** | The matching passage of clinical text. |
| **Page number** | The page the passage appears on. |
| **Confidence** | How strong the match is (rounded to two decimals). |
| **Provider name** | The provider associated with the passage, when available. |
| **Date of service** | The start and end date(s) of service for the passage, when available. |
| **Highlight location** | Position information used to highlight the passage in the document. |

Charts are listed with their strongest matches first.

---

## Saved semantic searches

A semantic search and its filters can be **saved** under a name and re-run later, so users don't have to re-enter the same query and options each time. Saved searches are **private to the user** and **tied to the project** they were created in — one user's saved searches are never visible to another, and they only appear in the project they belong to.

A saved semantic search stores the **filters only** (the query, minimum confidence, encounters per chart, and year of service) — never any results, charts, member names, or snippets. Running a saved search simply replays those stored filters as a new search and returns fresh results.

### What a user can do

| Action | Description |
|---|---|
| **Create** | Save the current query and filters under a name (1–255 characters). |
| **List** | View all of the user's saved searches for the current screen in this project, most recently updated first. |
| **Update** | Rename a saved search and/or replace its stored filters. |
| **Delete** | Remove a saved search the user owns. |

### What is stored / returned for a saved search

| Field | Description |
|---|---|
| **ID** | Identifier of the saved search. |
| **Name** | The name the user gave it. |
| **Filters** | The saved query and filter values, ready to be replayed. |

> Saved searches are available to a slightly broader set of roles than running a search, since they hold only filter criteria and no patient information: Intake Manager, Client Relationship Manager, Vendor Manager, and Client.

---

## Important notes

- **Patient privacy.** Search results contain protected health information (PHI). Access is limited to authorized roles, and the patient information in queries and results is never written to system logs. Each search is recorded in the audit trail.
- **Project boundaries.** A search only ever returns charts that belong to the project the user is searching in.
- **Availability.** If the AI search service is temporarily unavailable, the search returns a clear "service unavailable" message and can be retried.
