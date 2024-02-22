#!/bin/bash

# Check for required arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <package-name> <script-name>"
    exit 1
fi

PACKAGE_NAME=$1
SCRIPT_NAME=$2
PACKAGE_DIR="packages/$PACKAGE_NAME"

# Check if the package directory exists
if [ ! -d "$PACKAGE_DIR" ]; then
    echo "Package directory $PACKAGE_DIR does not exist."
    exit 1
fi

# Execute the script using bun within the specified package directory
echo "Executing '$SCRIPT_NAME' script for package '$PACKAGE_NAME'..."
(cd "$PACKAGE_DIR" && bun run $SCRIPT_NAME)

echo "Script execution completed."
