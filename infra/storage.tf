# ── Storage Accounts (one per environment) ────────────────────────────────────
resource "azurerm_storage_account" "env" {
  for_each = toset(var.environments)

  name                = local.storage_names[each.key]
  resource_group_name = azurerm_resource_group.portfolio.name
  location            = azurerm_resource_group.portfolio.location

  account_tier             = "Standard"
  account_replication_type = "LRS" # cheapest; upgrade to ZRS/GRS for prod if needed
  account_kind             = "StorageV2"

  # Security hardening
  min_tls_version                 = "TLS1_2"
  allow_nested_items_to_be_public = false # blobs not publicly listable by default
  https_traffic_only_enabled      = true

  # Static website hosting
  static_website {
    index_document     = "index.html"
    error_404_document = "404.html"
  }

  # Soft delete for blob recovery (30 days)
  blob_properties {
    versioning_enabled = true
    delete_retention_policy {
      days = 30
    }
  }

  tags = merge(local.common_tags, { environment = each.key })
}

# ── RBAC: GitHub Actions SP → Storage Blob Data Contributor ──────────────────
# Grants the deploy service principal permission to upload files.
# Uses RBAC (no storage account keys needed — more secure).
resource "azurerm_role_assignment" "deploy_sp" {
  for_each = toset(var.environments)

  scope                = azurerm_storage_account.env[each.key].id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = var.sp_object_id
}
