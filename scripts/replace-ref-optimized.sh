#!/bin/bash
set -e

# Optimized script to replace company, company references with company

REPO_ROOT="/home/liam/Bureau/enterprise/company"
cd "$REPO_ROOT"

echo "Starting replacements..."
echo ""

# Pattern for file types
FILE_PATTERN="\( -name \"*.ts\" -o -name \"*.tsx\" -o -name \"*.js\" -o -name \"*.jsx\" -o -name \"*.json\" -o -name \"*.md\" -o -name \"*.yaml\" -o -name \"*.yml\" -o -name \"*.txt\" -o -name \"*.html\" -o -name \"*.css\" \)"

# Exclusion patterns
EXCLUDE_PATTERN="! -path \"./node_modules/*\" ! -path \"./.git/*\" ! -path \"./.pnpm-store/*\" ! -path \"*/node_modules/*\""

# Step 1: Replace company (case-insensitive) with company
echo "=== Step 1: Replacing company ==="
find . -type f \( $FILE_PATTERN \) $EXCLUDE_PATTERN -exec grep -l "company" {} + | while read -r file; do
    sed -i 's/company/company/gi' "$file"
done
echo "Step 1 completed"
echo ""

# Step 2: Replace Company (with space) with Company
echo "=== Step 2: Replacing Company ==="
find . -type f \( $FILE_PATTERN \) $EXCLUDE_PATTERN -exec grep -l "Company" {} + | while read -r file; do
    sed -i 's/Company/Company/g' "$file"
done
echo "Step 2 completed"
echo ""

# Step 3: Replace company (case-insensitive) with company
echo "=== Step 3: Replacing company ==="
find . -type f \( $FILE_PATTERN \) $EXCLUDE_PATTERN -exec grep -l "company" {} + | while read -r file; do
    sed -i 's/company/company/gi' "$file"
done
echo "Step 3 completed"
echo ""

# Step 4: Replace Notploy (case-sensitive) with Company
echo "=== Step 4: Replacing Notploy ==="
find . -type f \( $FILE_PATTERN \) $EXCLUDE_PATTERN -exec grep -l "Notploy" {} + | while read -r file; do
    sed -i 's/Notploy/Company/g' "$file"
done
echo "Step 4 completed"
echo ""

echo "All replacements completed!"
echo ""
echo "Checking for remaining references..."
echo ""

# Check for remaining references
REMAINING_ASTRON=$(grep -r "company" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.json" --include="*.md" --include="*.yaml" --include="*.yml" --include="*.txt" --include="*.html" --include="*.css" -l 2>/dev/null | grep -v node_modules | wc -l)
REMAINING_NOTPLOY=$(grep -r "company" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.json" --include="*.md" --include="*.yaml" --include="*.yml" --include="*.txt" --include="*.html" --include="*.css" -l 2>/dev/null | grep -v node_modules | wc -l)

echo "Remaining files with company: $REMAINING_ASTRON"
echo "Remaining files with company: $REMAINING_NOTPLOY"
