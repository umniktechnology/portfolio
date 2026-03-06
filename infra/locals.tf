locals {
  # ── Naming ──────────────────────────────────────────────────────────────────
  resource_group_name = "rg-${var.project}-${var.owner}"

  # Storage account names: max 24 chars, lowercase alphanum only
  storage_names = {
    for env in var.environments :
    env => lower(replace("${var.project}${var.owner}${env}", "-", ""))
  }

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
