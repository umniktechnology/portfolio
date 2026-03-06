variable "project" {
  description = "Short project identifier used in all resource names."
  type        = string
  default     = "portfolio"
}

variable "owner" {
  description = "Short owner/team slug used in resource names (keep lowercase, no spaces)."
  type        = string
  default     = "hendi"
}

variable "location" {
  description = "Azure region for all resources."
  type        = string
  default     = "southeastasia"
}

variable "environments" {
  description = "List of environments to provision."
  type        = list(string)
  default     = ["dev", "test", "prod"]
}

variable "cdn_environments" {
  description = "Environments that get a CDN endpoint (dev uses raw storage URL)."
  type        = list(string)
  default     = ["test", "prod"]
}

variable "sp_object_id" {
  description = <<-EOT
    Object ID of the Service Principal (or Managed Identity) used by GitHub
    Actions to upload files to Azure Blob Storage.
    Find it with: az ad sp show --id <appId> --query id --output tsv
  EOT
  type        = string
}

variable "tags" {
  description = "Additional tags merged into every resource."
  type        = map(string)
  default     = {}
}
