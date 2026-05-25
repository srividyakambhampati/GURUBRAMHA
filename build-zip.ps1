$ErrorActionPreference = "Stop"

$workspace = "C:\Users\janu\Desktop\GuruBramha"
$serverDir = "$workspace\server"
$clientDist = "$workspace\client\dist"
$tempDir = "$workspace\ebs_deploy_temp"
$zipPath = "$workspace\GuruBramha_EBS.zip"

Write-Host "Creating temporary deployment folder..."
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

Write-Host "Copying server files (excluding node_modules)..."
# Copy server files except node_modules and package-lock.json
Get-ChildItem -Path $serverDir -Force -Exclude "node_modules", "package-lock.json" | Copy-Item -Destination $tempDir -Recurse -Force

Write-Host "Creating public folder for frontend..."
$publicDir = "$tempDir\public"
New-Item -ItemType Directory -Force -Path $publicDir | Out-Null

Write-Host "Copying built frontend files..."
if (Test-Path $clientDist) {
    Copy-Item -Path "$clientDist\*" -Destination $publicDir -Recurse -Force
} else {
    Write-Host "WARNING: client\dist not found! Did the build fail?" -ForegroundColor Red
}

Write-Host "Creating ZIP archive at $zipPath..."
if (Test-Path $zipPath) { Remove-Item -Force $zipPath }
# Compress files INSIDE tempDir to root of ZIP
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath

Write-Host "Cleaning up temporary folder..."
Remove-Item -Recurse -Force $tempDir

Write-Host "✅ Success! Your deployment ZIP is ready at: $zipPath" -ForegroundColor Green
