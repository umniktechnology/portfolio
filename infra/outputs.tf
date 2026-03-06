output "resource_group_name" {
  description = "Name of the shared resource group."
  value       = azurerm_resource_group.portfolio.name
}

# ── Storage URLs (raw — HTTP only, no CDN) ────────────────────────────────────
output "storage_web_endpoints" {
  description = "Primary static website endpoints for each storage account."
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

# ── CDN URLs (HTTPS, globally cached) ────────────────────────────────────────
output "cdn_endpoints" {
  description = "CDN hostname for environments with a CDN endpoint (test, prod)."
  value = {
    for env in var.cdn_environments :
    env => "https://${azurerm_cdn_endpoint.env[env].host_name}"
  }
}

output "cdn_endpoint_names" {
  description = "CDN endpoint name per environment (use as GitHub secret)."
  value = {
    for env in var.cdn_environments :
    env => azurerm_cdn_endpoint.env[env].name
  }
}

output "cdn_profile_name" {
  description = "CDN profile name (use as GitHub secret AZURE_CDN_PROFILE_NAME)."
  value       = azurerm_cdn_profile.portfolio.name
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
    AZURE_CDN_PROFILE_NAME        = ${azurerm_cdn_profile.portfolio.name}
    AZURE_CDN_ENDPOINT_TEST       = ${azurerm_cdn_endpoint.env["test"].name}
    AZURE_CDN_ENDPOINT_PROD       = ${azurerm_cdn_endpoint.env["prod"].name}
    ────────────────────────────────────────────────────────────────
  EOT
}
