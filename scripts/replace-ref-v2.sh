#!/bin/bash
set -e

REPO_ROOT="/home/liam/Bureau/enterprise/company"
cd "$REPO_ROOT"

echo "Starting replacements..."
echo ""

# Step 1: Replace company (case-insensitive) with company
echo "=== Step 1: Replacing company ==="
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "company" {} + | while read -r file; do
    echo "  Replacing in: $file"
    sed -i 's/company/company/gi' "$file"
done
echo "Step 1 completed"
echo ""

# Step 2: Replace Company (with space) with Company
echo "=== Step 2: Replacing Company ==="
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "Company" {} + | while read -r file; do
    echo "  Replacing in: $file"
    sed -i 's/Company/Company/g' "$file"
done
echo "Step 2 completed"
echo ""

# Step 3: Replace company (case-insensitive) with company
echo "=== Step 3: Replacing company ==="
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "company" {} + | while read -r file; do
    echo "  Replacing in: $file"
    sed -i 's/company/company/gi' "$file"
done
echo "Step 3 completed"
echo ""

echo "All replacements completed!"
echo ""

# Count remaining references
REMAINING_ASTRON=$(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "company" {} + | wc -l)

REMAINING_NOTPLOY=$(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.yaml" -o -name "*.yml" -o -name "*.txt" -o -name "*.html" -o -name "*.css" \) \
    ! -path "./node_modules/*" \
    ! -path "./.git/*" \
    ! -path "./.pnpm-store/*" \
    -exec grep -l "company" {} + | wc -l)

echo "Remaining files with company: $REMAINING_ASTRON"
echo "Remaining files with company: $REMAINING_NOTPLOY"
