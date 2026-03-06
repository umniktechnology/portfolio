# ── CDN Profile (one shared profile, Standard Microsoft = cheapest tier) ──────
resource "azurerm_cdn_profile" "portfolio" {
  name                = local.cdn_profile_name
  resource_group_name = azurerm_resource_group.portfolio.name
  location            = "global"
  sku                 = "Standard_Microsoft"

  tags = local.common_tags
}

# ── CDN Endpoints (test + prod only; dev uses raw storage URL) ────────────────
resource "azurerm_cdn_endpoint" "env" {
  for_each = toset(var.cdn_environments)

  name                = local.cdn_endpoint_names[each.key]
  profile_name        = azurerm_cdn_profile.portfolio.name
  resource_group_name = azurerm_resource_group.portfolio.name
  location            = "global"

  # Strip https:// and trailing slash from storage primary_web_endpoint
  origin {
    name      = "storage-origin"
    host_name = trimsuffix(
      trimprefix(azurerm_storage_account.env[each.key].primary_web_endpoint, "https://"),
      "/"
    )
    https_port = 443
    http_port  = 80
  }

  origin_host_header = trimsuffix(
    trimprefix(azurerm_storage_account.env[each.key].primary_web_endpoint, "https://"),
    "/"
  )

  # Optimise for static web delivery
  optimization_type  = "GeneralWebDelivery"
  is_https_allowed   = true
  is_http_allowed    = false   # force HTTPS

  # Cache rules: cache everything for 1 day, honour origin cache headers
  global_delivery_rule {
    cache_expiration_action {
      behavior = "SetIfMissing"
      duration = "1.00:00:00"   # 1 day
    }

    # Redirect HTTP → HTTPS at the CDN edge
    request_scheme_condition {
      operator         = "Equal"
      match_values     = ["HTTP"]
      negate_condition = false
    }

    url_redirect_action {
      redirect_type = "PermanentRedirect"
      protocol      = "Https"
    }
  }

  tags = merge(local.common_tags, { environment = each.key })
}
