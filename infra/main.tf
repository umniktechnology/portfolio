terraform {
  required_version = ">= 1.7.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.110"
    }
  }

  # ── Remote state ─────────────────────────────────────────────────────────
  # Run infra/scripts/bootstrap.sh ONCE before `terraform init`.
  # Then fill in the values below from the bootstrap output.
  backend "azurerm" {
    resource_group_name  = "rg-portfolio-tfstate"
    storage_account_name = "tfstatehendivalentino"   # change if you renamed it
    container_name       = "tfstate"
    key                  = "portfolio.tfstate"
    use_oidc             = true   # uses GitHub OIDC — no static credentials needed
  }
}

provider "azurerm" {
  features {}
  use_oidc = true   # authenticates via GitHub OIDC in CI; az login locally
}

# ── Resource Group ────────────────────────────────────────────────────────────
resource "azurerm_resource_group" "portfolio" {
  name     = local.resource_group_name
  location = var.location

  tags = local.common_tags
}
