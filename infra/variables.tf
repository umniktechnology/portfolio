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
  default     = "eastus2"
}

variable "environments" {
  description = "List of environments to provision."
  type        = list(string)
  default     = ["test", "prod"]
}

variable "tags" {
  description = "Additional tags merged into every resource."
  type        = map(string)
  default     = {}
}
