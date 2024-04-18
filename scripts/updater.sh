#!/usr/bin/env bash

# This script is used for updating all the dependencies packages.json of the entire project.
# It is recommended to run this script before starting the development.

# Update the dependencies
BASEDIR=$(dirname "$0")
cd $BASEDIR/..
BASEDIR=$(pwd)
echo "Updating the dependencies of the project..."
echo "Base directory: $BASEDIR" 
bunx npm-check-updates -u

# iterate over all the configs and update the dependencies
for dir in configs/*/
do
    echo "Updating the dependencies of $dir"
  dir=${dir%*/}
  cd $dir
  bunx npm-check-updates -u
  cd ../..
done

# iterate over all the packages and update the dependencies
for dir in packages/*/
do
    echo "Updating the dependencies of $dir"
  dir=${dir%*/}
  cd $dir
  bunx npm-check-updates -u
  cd ../..
done

# iterate over all the apps and update the dependencies
for dir in apps/*/
do
    echo "Updating the dependencies of $dir"
  dir=${dir%*/}
  cd $dir
  bunx npm-check-updates -u
  cd ../..
done 

bun install