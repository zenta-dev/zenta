@echo off
REM This script is used for cleaning the entire project.
REM remove the node_modules, .next, build, dist and package-lock.json
REM It is recommended to run this script before starting the development.

REM Remove the node_modules, .next, build, dist and package-lock.json
set "BASEDIR=%~dp0"
cd /d "%BASEDIR%.."
set "BASEDIR=%CD%"
echo Cleaning the project...
echo Base directory: %BASEDIR%
rmdir /s /q node_modules
rmdir /s /q .next
rmdir /s /q .turbo
rmdir /s /q build
rmdir /s /q dist
del /q package-lock.json
del /q bun.lockb

REM Iterate over all the configs and clean the project
for /d %%i in (configs\*) do (
  echo Cleaning the project of %%i
  cd /d "%BASEDIR%\%%i"
  rmdir /s /q node_modules
  rmdir /s /q .next
  rmdir /s /q .turbo
  rmdir /s /q build
  rmdir /s /q dist
  del /q package-lock.json
  del /q bun.lockb
  cd /d "%BASEDIR%\.."
)

REM Iterate over all the packages and clean the project
for /d %%i in (packages\*) do (
  echo Cleaning the project of %%i
  cd /d "%BASEDIR%\%%i"
  rmdir /s /q node_modules
  rmdir /s /q .next
  rmdir /s /q .turbo
  rmdir /s /q build
  rmdir /s /q dist
  del /q package-lock.json
  del /q bun.lockb
  cd /d "%BASEDIR%\.."
)

REM Iterate over all the apps and clean the project
for /d %%i in (apps\*) do (
  echo Cleaning the project of %%i
  cd /d "%BASEDIR%\%%i"
  rmdir /s /q node_modules
  rmdir /s /q .next
  rmdir /s /q .turbo
  rmdir /s /q build
  rmdir /s /q dist
  del /q package-lock.json
  del /q bun.lockb
  cd /d "%BASEDIR%\.."
)
