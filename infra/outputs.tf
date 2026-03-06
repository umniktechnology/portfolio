output "resource_group_name" {
  description = "Name of the shared resource group."
  value       = azurerm_resource_group.portfolio.name
}

# ── Storage URLs ──────────────────────────────────────────────────────────────
output "storage_web_endpoints" {
  description = "Primary static website endpoints for each environment."
  value = {
    for env in var.environments :
    env => azurerm_storage_account.env[env].primary_web_endpoint
  }
}

output "storage_account_names" {
  description = "Storage account name per environment (use as GitHub secret)."
  value = {
    for env in var.environments :
    env => azurerm_storage_account.env[env].name
  }
}

# ── GitHub Actions secrets cheat-sheet ───────────────────────────────────────
output "github_secrets_summary" {
  description = "Copy-paste values for GitHub Actions secrets."
  value = <<-EOT
    ── GitHub Actions Secrets ──────────────────────────────────────
    AZURE_RESOURCE_GROUP          = ${azurerm_resource_group.portfolio.name}
    AZURE_STORAGE_ACCOUNT_DEV     = ${azurerm_storage_account.env["dev"].name}
    AZURE_STORAGE_ACCOUNT_TEST    = ${azurerm_storage_account.env["test"].name}
    AZURE_STORAGE_ACCOUNT_PROD    = ${azurerm_storage_account.env["prod"].name}

    ── Live URLs ────────────────────────────────────────────────────
    DEV   = ${azurerm_storage_account.env["dev"].primary_web_endpoint}
    TEST  = ${azurerm_storage_account.env["test"].primary_web_endpoint}
    PROD  = ${azurerm_storage_account.env["prod"].primary_web_endpoint}
    ────────────────────────────────────────────────────────────────
  EOT
}
