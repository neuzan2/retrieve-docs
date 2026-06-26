---
sidebar_position: 6
---

# Extraction Jobs – User Guide

## Overview

Extraction Jobs allow users to send charts to downstream destinations, either on a schedule or on demand. Charts can be delivered to Capture, SFTP, or both destinations.

An Extraction Job can be configured to:

- Run once at a specified date and time.
- Run automatically on a recurring schedule.
- Be executed manually at any time using **Run Now**.

---

## Creating an Extraction Job

### Step 1: Open the Extraction Jobs Page

Navigate to **Extraction Jobs** and select **New Job**.

### Step 2: Configure the Job

#### Job Type

Choose one of the following:

| Type | Description |
|---|---|
| **One-Time** | Runs once on the specified date and time. |
| **Recurring** | Runs automatically on the selected weekdays and time. |

> **Note:** All scheduled times are based on EST.

#### Destination

Select where the charts should be delivered:

- Capture
- SFTP
- Capture + SFTP

#### Chart Filter

Select the chart status(es) to include in the extraction:

- Available for Extraction
- Extracted
- Archived

> **Note:** Recurring jobs always process charts that are **Available for Extraction**.

#### Recipient

Depending on the selected destination:

| Destination | Required Recipient |
|---|---|
| Capture | Downstream Capture Project |
| SFTP | Client or Coding Vendor |
| Capture + SFTP | Both recipient types |

### Step 3: Save the Job

Click **Save**. The job will:

- Be created in **Active** status.
- Be added to the extraction schedule.
- Display the next scheduled run time.

---

## Managing Extraction Jobs

### Run a Job Immediately

Use **Run Now** when you need to execute a job without waiting for its scheduled run time.

**Steps**

1. Locate the job in the Extraction Jobs list.
2. Select the job.
3. Click **Run Now**.

**Expected Result**

- The extraction starts immediately.
- Scheduled settings remain unchanged.
- Archived jobs can also be executed using Run Now and will remain archived afterward.

### Archive a Job

Archive a job to temporarily stop scheduled executions.

**Steps**

1. Select the job.
2. Click **Archive**.

**Expected Result**

- The job is removed from the active schedule.
- No future scheduled runs occur.
- Historical run information is preserved.

### Reactivate a Job

Reactivate an archived job to resume its scheduled executions.

**Steps**

1. Select the job.
2. Click **Reactivate**.

**Expected Result**

- The job returns to **Active** status.
- Future scheduled executions resume.

---

## What Happens During an Extraction Run

Whenever an Extraction Job executes (either scheduled or manual), the system performs the following steps:

### 1. Prevent Duplicate Execution

The system acquires a lock to ensure the same job cannot run simultaneously.

### 2. Select Eligible Charts

- Charts matching the configured filter are selected.
- A 48-hour cooling period is applied, meaning recently updated charts are not immediately eligible for extraction.

### 3. Generate a Manifest

A manifest CSV file is created containing chart metadata and indexing information.

### 4. Create the ZIP Package

The system:

- Retrieves all selected chart files.
- Applies the configured file naming convention.
- Bundles the chart files and manifest into a ZIP file.

### 5. Deliver the Package

The ZIP file is delivered to the configured destination(s):

- Capture
- SFTP

### 6. Update Chart Statuses

- **If all deliveries succeed:** Charts are marked as **Extraction Completed**.
- **If any delivery fails:** Charts remain available for future retries.

---

## Where Files Are Stored

Every ZIP is named the same way regardless of where it's delivered:

```
{ProjectName}_{ExtractType}_{JobId}_{YYYYMMDDHHMMSS}.zip
```

Example: `Acme HCC_one_time_019eb6e4-…_20260611093500.zip`

Only the **folder** differs by destination.

### Delivery Paths

When an extraction job completes, the generated ZIP file is delivered to the configured destination using the following folder structure:

| Destination | Delivery Path |
|---|---|
| Client (SFTP) | `client/sftp/{client_name}/extraction/` |
| Coding Vendor (SFTP) | `coding_vendor/sftp/{coding_vendor_name}/extraction/` |
| Capture Project | `{retrieve_client_id}/{retrieve_project_id}/Chart/{zip_file_name}.zip` |
