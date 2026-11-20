#!/bin/bash
set -e

# Script to replace company, company, and discord references with company

REPO_ROOT="/home/liam/Bureau/enterprise/company"
cd "$REPO_ROOT"

echo "Starting replacements..."
echo ""

# Function to replace in files
replace_in_files() {
    local pattern=$1
    local replacement=$2
    local file_pattern=$3
    local description=$4
    
    echo "Replacing: $description"
    echo "Pattern: $pattern -> $replacement"
    
    # Find all files matching the pattern, excluding node_modules and .git
    find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
        ! -path "./node_modules/*" \
        ! -path "./.git/*" \
        ! -path "./.pnpm-store/*" \
        ! -path "*/node_modules/*" \
        -exec grep -l "$pattern" {} + | while read -r file; do
        echo "  Processing: $file"
        sed -i "s/$pattern/$replacement/g" "$file"
    done
    
    echo "Completed: $description"
    echo ""
}

# Step 1: Replace company (case-insensitive)
echo "=== Step 1: Replacing company ==="
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "company" {} + | while read -r file; do
    echo "  Processing: $file"
    sed -i 's/company/company/gi' "$file"
done

echo "Step 1 completed"
echo ""

# Step 2: Replace Company (with space)
echo "=== Step 2: Replacing Company ==="
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "Company" {} + | while read -r file; do
    echo "  Processing: $file"
    sed -i 's/Company/Company/g' "$file"
done

echo "Step 2 completed"
echo ""

# Step 3: Replace company (case-insensitive)
echo "=== Step 3: Replacing company ==="
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name="*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "company" {} + | while read -r file; do
    echo "  Processing: $file"
    sed -i 's/company/company/gi' "$file"
done

echo "Step 3 completed"
echo ""

# Step 4: Replace Notploy (with capital N)
echo "=== Step 4: Replacing Notploy ==="
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "Notploy" {} + | while read -r file; do
    echo "  Processing: $file"
    sed -i 's/Notploy/Company/g' "$file"
done

echo "Step 4 completed"
echo ""

echo "All replacements completed!"
echo ""
echo "Files modified can be checked with: git status"
