# ── Azure Static Web Apps (one per environment) ───────────────────────────────
# Free tier: 0.5 GB storage, 100 GB bandwidth/month
# Includes native HTTPS + custom domain support — no CDN or proxy needed.
resource "azurerm_static_web_app" "env" {
  for_each = toset(var.environments)

  name                = "stapp-${var.project}-${var.owner}-${each.key}"
  resource_group_name = azurerm_resource_group.portfolio.name
  location            = var.location

  sku_tier = "Free"
  sku_size = "Free"

  tags = merge(local.common_tags, { environment = each.key })
}
