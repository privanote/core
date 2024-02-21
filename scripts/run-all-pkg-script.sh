#!/bin/bash

# Check for required arguments
if [ $# -lt 1 ]; then
    echo "Usage: $0 <script-name>"
    exit 1
fi

SCRIPT_NAME=$1
PACKAGES_DIR="packages"

# Check if the packages directory exists
if [ ! -d "$PACKAGES_DIR" ]; then
    echo "Packages directory $PACKAGES_DIR does not exist."
    exit 1
fi

# Iterate over each subdirectory in the packages directory
find "$PACKAGES_DIR" -mindepth 1 -maxdepth 1 -type d | while read dir; do
    PACKAGE_NAME=$(basename "$dir")
    echo "Executing '$SCRIPT_NAME' script for package '$PACKAGE_NAME'..."
    
    # Execute the script using bun within the package directory
    (cd "$dir" && bun run $SCRIPT_NAME)
    
    echo "Finished executing '$SCRIPT_NAME' for package '$PACKAGE_NAME'."
done

echo "Script execution for all packages completed."
