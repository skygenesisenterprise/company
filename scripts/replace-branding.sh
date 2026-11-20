#!/bin/bash

# Script to replace company, discord, and company references with company

set -euo pipefail

REPO_ROOT="/home/liam/Bureau/enterprise/company"
cd "$REPO_ROOT"

# Files to exclude
exclude_patterns=(
    "./node_modules/*"
    "./.pnpm/*"
    "./.next/*"
    "./dist/*"
    "./.git/*"
    "*/.next/*"
    "*/dist/*"
    "*/node_modules/*"
)

# Build find command with exclusions
find_cmd="find . -type f \("
for pattern in "${exclude_patterns[@]}"; do
    find_cmd+=" !-path '$pattern'"
done
find_cmd+=" \)"

# Function to replace in files
replace_in_files() {
    local pattern="$1"
    local replacement="$2"
    
    echo "Replacing '$pattern' with '$replacement'..."
    
    # Find files containing the pattern
    files=$(eval "$find_cmd" -exec grep -l "$pattern" {} \; 2>/dev/null | grep -v ".sh$" || true)
    
    if [ -z "$files" ]; then
        echo "No files found with pattern: $pattern"
        return
    fi
    
    echo "Found $(echo "$files" | wc -l) files with pattern: $pattern"
    
    # Replace in each file
    while IFS= read -r file; do
        if [ -f "$file" ]; then
            # Use sed to replace, handling special characters
            sed -i "s|$pattern|$replacement|g" "$file"
            echo "  Replaced in: $file"
        fi
    done <<< "$files"
}

# Replace company with company
replace_in_files "company" "company"
replace_in_files "COMPANY" "COMPANY"
replace_in_files "company" "company"

# Replace company with company
replace_in_files "company" "company"
replace_in_files "Notploy" "Company"
replace_in_files "NOTPLOY" "COMPANY"

# Replace discord references (but be careful with URLs)
# We'll handle URLs separately

# Replace discord webhook URLs with company equivalents
replace_in_files "discord.gg/GUkDugVh34" "company.com/community"
replace_in_files "discord.com/api/webhooks" "company.com/api/webhooks"

# Replace discord notification type with company
replace_in_files 'notificationType: z.literal("discord")' 'notificationType: z.literal("company")'
replace_in_files 'type: z.literal("discord")' 'type: z.literal("company")'

# Replace discord table references
replace_in_files 'discord: true,' 'company: true,'
replace_in_files 'discordId' 'companyId'

# Replace package names
replace_in_files "@company/server" "@company/server"
replace_in_files "@company/status" "@company/status"

# Replace directory names in comments
replace_in_files "apps/astron" "apps/company"

# Replace in Docker image names
replace_in_files "skygenesisenterprise/company" "skygenesisenterprise/company"

echo ""
echo "Replacement complete!"
echo "Please review the changes and test the application."
