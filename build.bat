@echo off
REM build.bat — Netlify production build script
REM Workaround for PowerShell && chain breaking on paths with & character
cd /d "C:\Users\basan\OneDrive\Desktop\NK Cab & Taxi"
set "PATH=%CD%\node_modules\.bin;%PATH%"

echo [1/4] Splitting routes by city...
node "scripts\split-routes-by-city.js"
if errorlevel 1 goto :error

echo [2/4] Generating static sitemaps...
node "scripts\generate-static-sitemaps.js"
if errorlevel 1 goto :error

echo [3/4] Generating static files...
node "scripts\generate-static-files.js"
if errorlevel 1 goto :error

echo [4/4] Running Next.js build...
node "%CD%\node_modules\next\dist\bin\next" build
if errorlevel 1 goto :error

echo [5/5] Running post-build cleanup...
node "scripts\cleanup-out.js"
if errorlevel 1 goto :error

echo.
echo BUILD SUCCESSFUL! Output is in ./out/
echo Run: netlify deploy --prod --dir=out
goto :eof

:error
echo.
echo BUILD FAILED! Check the error above.
exit /b 1
