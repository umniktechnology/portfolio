#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# bootstrap.sh — Run ONCE before `terraform init`
#
# Creates the Azure Storage Account that stores Terraform remote state.
# This script is idempotent (safe to re-run).
#
# Prerequisites:
#   - Azure CLI installed and logged in (`az login`)
#   - Contributor or Owner role on the target subscription
#
# Usage:
#   chmod +x infra/scripts/bootstrap.sh
#   ./infra/scripts/bootstrap.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
RESOURCE_GROUP="rg-portfolio-tfstate"
LOCATION="southeastasia"
STORAGE_ACCOUNT="tfstatehendivalentino"   # must be globally unique, 3-24 lowercase alphanum
CONTAINER_NAME="tfstate"

echo "📦 Bootstrapping Terraform remote state..."
echo "   Resource Group : $RESOURCE_GROUP"
echo "   Storage Account: $STORAGE_ACCOUNT"
echo "   Container      : $CONTAINER_NAME"
echo ""

# ── Resource Group ────────────────────────────────────────────────────────────
az group create \
  --name "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --output none
echo "✅ Resource group ready: $RESOURCE_GROUP"

# ── Storage Account ───────────────────────────────────────────────────────────
az storage account create \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --min-tls-version TLS1_2 \
  --allow-blob-public-access false \
  --output none
echo "✅ Storage account ready: $STORAGE_ACCOUNT"

# ── Blob Container ────────────────────────────────────────────────────────────
az storage container create \
  --name "$CONTAINER_NAME" \
  --account-name "$STORAGE_ACCOUNT" \
  --auth-mode login \
  --output none
echo "✅ Container ready: $CONTAINER_NAME"

# ── Enable versioning so Terraform state is never accidentally lost ────────────
az storage account blob-service-properties update \
  --account-name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --enable-versioning true \
  --output none
echo "✅ Blob versioning enabled (state history preserved)"

# ── Print values needed for backend.tf ───────────────────────────────────────
SUBSCRIPTION_ID=$(az account show --query id --output tsv)
echo ""
echo "──────────────────────────────────────────────────────"
echo "  Add these to infra/backend.tf:"
echo ""
echo "  resource_group_name  = \"$RESOURCE_GROUP\""
echo "  storage_account_name = \"$STORAGE_ACCOUNT\""
echo "  container_name       = \"$CONTAINER_NAME\""
echo "  key                  = \"portfolio.tfstate\""
echo "  subscription_id      = \"$SUBSCRIPTION_ID\""
echo "──────────────────────────────────────────────────────"
echo ""
echo "🚀 Bootstrap complete. Now run: cd infra && terraform init"
