output "resource_group_name" {
  description = "Name of the shared resource group."
  value       = azurerm_resource_group.portfolio.name
}

# ── Static Web App URLs ───────────────────────────────────────────────────────
output "static_web_app_urls" {
  description = "Live URLs for each environment."
  value = {
    for env in var.environments :
    env => "https://${azurerm_static_web_app.env[env].default_host_name}"
  }
}

# ── GitHub Actions secrets cheat-sheet ───────────────────────────────────────
output "github_secrets_summary" {
  description = "Copy-paste values for GitHub Actions secrets."
  sensitive   = true
  value       = <<-EOT
    ── GitHub Actions Secrets ──────────────────────────────────────
    AZURE_STATIC_WEB_APPS_API_TOKEN_TEST = ${azurerm_static_web_app.env["test"].api_key}
    AZURE_STATIC_WEB_APPS_API_TOKEN_PROD = ${azurerm_static_web_app.env["prod"].api_key}

    ── Live URLs ────────────────────────────────────────────────────
    TEST = https://${azurerm_static_web_app.env["test"].default_host_name}
    PROD = https://${azurerm_static_web_app.env["prod"].default_host_name}
    ────────────────────────────────────────────────────────────────
  EOT
}
