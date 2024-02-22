#!/bin/bash

# Script to create a new folder under the 'packages' directory

# Check if a folder name was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <folder-name>"
    exit 1
fi

# The name of the folder to create
FOLDER_NAME=$1

# The directory where the folder will be created
TARGET_DIR="./packages"

# Check if the 'packages' directory exists, create it if not
if [ ! -d "$TARGET_DIR" ]; then
    echo "'packages' directory does not exist. Creating it..."
    mkdir -p "$TARGET_DIR"
fi

# Create the new folder
NEW_FOLDER_PATH="$TARGET_DIR/$FOLDER_NAME"

if [ ! -d "$NEW_FOLDER_PATH" ]; then
    echo "Creating folder '$FOLDER_NAME' under 'packages' directory..."
    mkdir "$NEW_FOLDER_PATH"
    echo "Folder created at: $NEW_FOLDER_PATH"
    (cd "$NEW_FOLDER_PATH" && bun init)
else
    echo "Folder '$FOLDER_NAME' already exists under 'packages' directory."
fi
