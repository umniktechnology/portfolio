locals {
  # ── Naming ──────────────────────────────────────────────────────────────────
  resource_group_name = "rg-${var.project}-${var.owner}"

  # ── Tags ────────────────────────────────────────────────────────────────────
  common_tags = merge(
    {
      project = var.project
      owner   = var.owner
      managed = "terraform"
      repo    = "hendi-valentino/portfolio"
    },
    var.tags
  )
}
