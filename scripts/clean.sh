#!/usr/bin/env bash

# This script is used for cleaning the entire project.
# remove the node_modules, .next, build, dist and package-lock.json
# It is recommended to run this script before starting the development.

# Remove the node_modules, .next, build, dist and package-lock.json
BASEDIR=$(dirname "$0")
cd $BASEDIR/..
BASEDIR=$(pwd)
echo "Cleaning the project..."
echo "Base directory: $BASEDIR"
rm -rf node_modules
rm -rf .next
rm -rf .turbo
rm -rf build
rm -rf dist
rm -rf package-lock.json

# iterate over all the configs and clean the project
for dir in configs/*/
do
    echo "Cleaning the project of $dir"
  dir=${dir%*/}
  cd $dir
  rm -rf node_modules
  rm -rf .next
  rm -rf .turbo
  rm -rf build
  rm -rf dist
  rm -rf package-lock.json
  cd ../..
done

# iterate over all the packages and clean the project
for dir in packages/*/
do
    echo "Cleaning the project of $dir"
  dir=${dir%*/}
  cd $dir
  rm -rf node_modules
  rm -rf .next
  rm -rf .turbo
  rm -rf build
  rm -rf dist
  rm -rf package-lock.json
  cd ../..
done

# iterate over all the apps and clean the project
for dir in apps/*/
do
    echo "Cleaning the project of $dir"
  dir=${dir%*/}
  cd $dir
  rm -rf node_modules
  rm -rf .next
  rm -rf .turbo
  rm -rf build
  rm -rf dist
  rm -rf package-lock.json
  cd ../..
done

 