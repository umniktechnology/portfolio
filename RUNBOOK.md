# Portfolio Deployment Runbook

**Owner:** Hendi Valentino  
**Project:** Personal Portfolio — Next.js + Azure Storage Static Website  
**Last updated:** 2026-03-06

---

## Overview

This runbook walks you through everything from zero to a live, multi-environment portfolio site.

```
Your machine (dev)
      │
      ▼
  GitHub repo
      │
      ├─ push → dev    ──► GitHub Actions ──► Azure Storage DEV   (HTTPS storage URL)
      ├─ push → test   ──► GitHub Actions ──► Azure Storage TEST  (HTTPS storage URL)
      └─ push → main   ──► ⏸ Approval ──────► Azure Storage PROD  (HTTPS storage URL)

infra/ changes on main ──► Terraform workflow ──► provisions/updates Azure resources
```

> **No CDN required.** Azure Storage static websites serve over HTTPS natively at no extra cost.
> Azure CDN (classic) was retired in 2025 — new profiles can no longer be created. If you
> need global edge caching in the future, use Azure Front Door Standard (~$35/month).

**Estimated time to complete this runbook: 45–60 minutes**  
**Estimated monthly Azure cost: < $2 USD**

---

## Prerequisites checklist

Before you start, make sure you have all of these installed and ready.

| Tool | Install | Verify |
|---|---|---|
| Git | https://git-scm.com | `git --version` |
| Node.js 20+ | https://nodejs.org | `node --version` |
| Azure CLI | https://aka.ms/installazurecli | `az --version` |
| Terraform 1.7+ | https://developer.hashicorp.com/terraform/install | `terraform --version` |
| GitHub account | https://github.com | — |
| Azure subscription | https://portal.azure.com | `az account show` |

---

## Phase 1 — GitHub Repository Setup

### Step 1.1 — Create GitHub repository

1. Go to https://github.com/new
2. Set repository name: `portfolio`
3. Set visibility: **Public** (required for free GitHub Actions minutes) or **Private**
4. Do **not** initialize with README (we already have code)
5. Click **Create repository**

### Step 1.2 — Push code to GitHub

Run these commands from inside `D:\GitHub-Copilot\portfolio`:

```bash
cd D:\GitHub-Copilot\portfolio

git init
git add .
git commit -m "Initial portfolio setup"

# Replace YOUR_GITHUB_USERNAME with your actual username
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 1.3 — Create dev and test branches

```bash
git checkout -b dev
git push -u origin dev

git checkout -b test
git push -u origin test

# Return to main
git checkout main
```

---

## Phase 2 — Azure Account Setup

### Step 2.1 — Log in to Azure CLI

```bash
az login
```

A browser window will open. Sign in with your Azure account.

### Step 2.2 — Confirm your subscription

```bash
az account show --output table
```

If you have multiple subscriptions, set the right one:

```bash
az account set --subscription "YOUR_SUBSCRIPTION_NAME_OR_ID"
```

Save your subscription ID — you will need it later:

```bash
az account show --query id --output tsv
# Copy and save this value: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## Phase 3 — Create Service Principal

The Service Principal (SP) is the identity GitHub Actions uses to authenticate to Azure.

### Step 3.1 — Create the App Registration

```bash
az ad app create --display-name "sp-portfolio-github-actions"
```

Save the `appId` from the output:
```
"appId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"   ← YOUR_CLIENT_ID
```

### Step 3.2 — Create a Service Principal for the app

```bash
az ad sp create --id YOUR_CLIENT_ID
```

Save the `id` from the output (this is the **Object ID**, different from `appId`):
```
"id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"   ← YOUR_SP_OBJECT_ID
```

### Step 3.3 — Assign Contributor role on your subscription

```bash
az role assignment create \
  --assignee YOUR_CLIENT_ID \
  --role "Contributor" \
  --scope /subscriptions/YOUR_SUBSCRIPTION_ID
```

> **Why Contributor?** Terraform needs to create resource groups and storage accounts. You can scope this more tightly once everything is provisioned.

### Step 3.4 — Add OIDC federated credentials (no rotating secrets)

This tells Azure to trust GitHub's identity tokens for your repo — no client secret needed.

```bash
# For the main branch (Terraform apply + prod deploys)
az ad app federated-credential create \
  --id YOUR_CLIENT_ID \
  --parameters '{
    "name": "github-main",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:YOUR_GITHUB_USERNAME/portfolio:ref:refs/heads/main",
    "audiences": ["api://AzureADTokenExchange"]
  }'

# For the dev branch
az ad app federated-credential create \
  --id YOUR_CLIENT_ID \
  --parameters '{
    "name": "github-dev",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:YOUR_GITHUB_USERNAME/portfolio:ref:refs/heads/dev",
    "audiences": ["api://AzureADTokenExchange"]
  }'

# For the test branch
az ad app federated-credential create \
  --id YOUR_CLIENT_ID \
  --parameters '{
    "name": "github-test",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:YOUR_GITHUB_USERNAME/portfolio:ref:refs/heads/test",
    "audiences": ["api://AzureADTokenExchange"]
  }'

# For pull requests (CI checks)
az ad app federated-credential create \
  --id YOUR_CLIENT_ID \
  --parameters '{
    "name": "github-pr",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:YOUR_GITHUB_USERNAME/portfolio:pull_request",
    "audiences": ["api://AzureADTokenExchange"]
  }'
```

### Step 3.5 — Create AZURE_CREDENTIALS JSON for deploy workflows

The site deploy workflows (`deploy-dev.yml`, etc.) still use `azure/login` with a credentials JSON. Generate it:

```bash
az ad sp create-for-rbac \
  --name "sp-portfolio-deploy" \
  --role "Storage Blob Data Contributor" \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID \
  --sdk-auth
```

Copy the **entire JSON output** — you will use it as the `AZURE_CREDENTIALS` secret.

---

## Phase 4 — Bootstrap Terraform Remote State

Terraform needs a place to store its state file before it can run. This creates a dedicated storage account for that.

### Step 4.1 — Make the bootstrap script executable and run it

```bash
# On Windows (Git Bash or WSL):
chmod +x infra/scripts/bootstrap.sh
./infra/scripts/bootstrap.sh

# On Windows PowerShell (alternative):
az group create --name rg-portfolio-tfstate --location eastus2

az storage account create `
  --name tfstatehendivalentino `
  --resource-group rg-portfolio-tfstate `
  --sku Standard_LRS `
  --kind StorageV2 `
  --min-tls-version TLS1_2 `
  --allow-blob-public-access false

az storage container create `
  --name tfstate `
  --account-name tfstatehendivalentino `
  --auth-mode login
```

You should see output confirming the storage account and container were created.

---

## Phase 5 — Configure and Run Terraform

### Step 5.1 — Create your terraform.tfvars file

```bash
cd D:\GitHub-Copilot\portfolio\infra
copy terraform.tfvars.example terraform.tfvars
```

Open `terraform.tfvars` and fill in your values:

```hcl
project      = "portfolio"
owner        = "hendi"
location     = "eastus2"
sp_object_id = "YOUR_SP_OBJECT_ID"   # from Phase 3 Step 3.2

tags = {
  contact = "hendi@umniktech.com"
}
```

### Step 5.2 — Initialise Terraform

```bash
cd D:\GitHub-Copilot\portfolio\infra

terraform init
```

Expected output: `Terraform has been successfully initialized!`

### Step 5.3 — Preview what Terraform will create

```bash
terraform plan -var-file=terraform.tfvars
```

Review the plan. You should see:
- 1 resource group (`rg-portfolio-hendi`)
- 3 storage accounts (dev, test, prod)
- 3 role assignments (Storage Blob Data Contributor per env)

**Total: ~7 resources to add**

### Step 5.4 — Apply (provision the infrastructure)

```bash
terraform apply -var-file=terraform.tfvars
```

Type `yes` when prompted.

### Step 5.5 — Copy the GitHub secrets output

After apply completes, run:

```bash
terraform output github_secrets_summary
```

This prints all secret values and the live URLs for each environment. **Copy this output.**

---

## Phase 6 — Configure GitHub Secrets and Environments

### Step 6.1 — Add GitHub Actions Secrets

Go to: `https://github.com/YOUR_GITHUB_USERNAME/portfolio/settings/secrets/actions`

Click **New repository secret** for each of these:

| Secret Name | Value |
|---|---|
| `AZURE_CREDENTIALS` | Full JSON from Phase 3 Step 3.5 |
| `ARM_CLIENT_ID` | YOUR_CLIENT_ID (from Phase 3 Step 3.1) |
| `ARM_SUBSCRIPTION_ID` | YOUR_SUBSCRIPTION_ID (from Phase 2 Step 2.2) |
| `ARM_TENANT_ID` | Run `az account show --query tenantId --output tsv` |
| `AZURE_RESOURCE_GROUP` | `rg-portfolio-hendi` |
| `AZURE_STORAGE_ACCOUNT_DEV` | From terraform output |
| `AZURE_STORAGE_ACCOUNT_TEST` | From terraform output |
| `AZURE_STORAGE_ACCOUNT_PROD` | From terraform output |

### Step 6.2 — Create GitHub Environments

Go to: `https://github.com/YOUR_GITHUB_USERNAME/portfolio/settings/environments`

Create **three environments**:

**1. `development`**
- Click **New environment** → name: `development`
- No protection rules needed
- Click **Save protection rules**

**2. `test`**
- Click **New environment** → name: `test`
- No protection rules needed (optional: add a reviewer)
- Click **Save protection rules**

**3. `production`** ← most important
- Click **New environment** → name: `production`
- Check **Required reviewers**
- Add yourself as a required reviewer
- Set **Wait timer** to `0` minutes (or more if you want a delay)
- Click **Save protection rules**

> From now on, every prod deployment will pause and send you an email asking for approval before running.

---

## Phase 7 — First Deployment

### Step 7.1 — Trigger DEV deployment

```bash
cd D:\GitHub-Copilot\portfolio
git checkout dev
git push origin dev
```

Go to `https://github.com/YOUR_GITHUB_USERNAME/portfolio/actions` and watch the **Deploy — DEV** workflow run.

Once green, click the workflow run → see the printed storage URL. Open it in your browser — your site is live on DEV!

### Step 7.2 — Promote to TEST

```bash
git checkout test
git merge dev
git push origin test
```

Watch **Deploy — TEST** run. Once complete, the workflow prints the TEST storage URL. Open it in your browser to verify.

### Step 7.3 — Promote to PRODUCTION

```bash
git checkout main
git merge test
git push origin main
```

1. Go to `Actions` tab → you will see **Deploy — PRODUCTION** is **waiting for approval**
2. Click the workflow run → click **Review deployments**
3. Check `production` → click **Approve and deploy**
4. Wait for the workflow to complete

Your site is now live at the production storage URL! 🚀

---

## Phase 8 — Verify Everything

### Step 8.1 — Check all three environments

Run the following to get each environment's live URL:

```bash
# All URLs at once
cd infra && terraform output storage_web_endpoints

# Or individually
az storage account show \
  --name portfoliohendidev \
  --resource-group rg-portfolio-hendi \
  --query "primaryEndpoints.web" --output tsv

az storage account show \
  --name portfoliohenditest \
  --resource-group rg-portfolio-hendi \
  --query "primaryEndpoints.web" --output tsv

az storage account show \
  --name portfoliohendiprod \
  --resource-group rg-portfolio-hendi \
  --query "primaryEndpoints.web" --output tsv
```

Open each URL and confirm the site loads correctly.

### Step 8.2 — Verify HTTPS is working

- Open each storage URL in your browser
- Confirm the padlock (HTTPS) is showing — Azure Storage static websites serve HTTPS natively
- Confirm all sections load: Hero, About, Skills, Projects, Contact

### Step 8.3 — Verify GitHub Actions secrets are working

Go to `Actions` → check that all three deploy workflows show green checkmarks.

---

## Day-to-Day Workflow

Once set up, this is how you work every day:

```
1. Make changes locally
   └─ npm run dev         ← preview at localhost:3000

2. Commit and push to dev
   ├─ git checkout dev
   ├─ git add .
   ├─ git commit -m "your message"
   └─ git push origin dev
       └─ DEV deploys automatically ✅

3. Test on DEV URL — looks good?

4. Promote to TEST
   ├─ git checkout test
   ├─ git merge dev
   └─ git push origin test
       └─ TEST deploys automatically ✅

5. Test on TEST URL — everything good?

6. Promote to PRODUCTION
   ├─ git checkout main
   ├─ git merge test
   └─ git push origin main
       └─ GitHub pauses ⏸ — check your email
       └─ Approve in GitHub Actions UI
       └─ PROD deploys ✅
```

---

## Terraform Changes Workflow

When you need to change Azure infrastructure (add a custom domain, adjust storage settings, etc.):

```
1. Edit files in infra/
2. Create a PR targeting main
   └─ Terraform workflow runs terraform plan
   └─ Plan is posted as a PR comment — review it

3. Merge the PR to main
   └─ Terraform workflow runs terraform apply automatically
   └─ Infrastructure is updated
```

---

## Troubleshooting

### Workflow fails: "az login failed" or "OIDC error"
- Verify the federated credential `subject` exactly matches the branch (e.g. `ref:refs/heads/dev`)
- Check that `ARM_CLIENT_ID`, `ARM_TENANT_ID`, `ARM_SUBSCRIPTION_ID` secrets are set correctly

### Workflow fails: "Storage account not found"
- Verify Terraform apply completed successfully
- Check `AZURE_STORAGE_ACCOUNT_DEV/TEST/PROD` secret values match Terraform output

### CDN shows old content after deploy
- There is no CDN in this setup — content is served directly from Azure Storage
- Azure Storage serves the latest uploaded blobs immediately with no cache layer
- If your browser shows old content, do a hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Terraform init fails: "Backend configuration changed"
- Run `terraform init -reconfigure`

### `terraform.tfvars` accidentally committed
- Immediately rotate secrets: `az ad sp credential reset --id YOUR_CLIENT_ID`
- Remove from git history: `git filter-branch` or use BFG Repo Cleaner

---

## Useful Commands Reference

```bash
# Get all environment URLs at once
cd infra && terraform output storage_web_endpoints

# Get individual storage URL
az storage account show --name portfoliohendidev --resource-group rg-portfolio-hendi --query "primaryEndpoints.web" --output tsv
az storage account show --name portfoliohenditest --resource-group rg-portfolio-hendi --query "primaryEndpoints.web" --output tsv
az storage account show --name portfoliohendiprod --resource-group rg-portfolio-hendi --query "primaryEndpoints.web" --output tsv

# Check Terraform state
cd infra && terraform show

# Preview infra changes without applying
cd infra && terraform plan -var-file=terraform.tfvars

# Destroy ALL infrastructure (⚠️ irreversible)
cd infra && terraform destroy -var-file=terraform.tfvars
```
