$ErrorActionPreference = 'Stop'
$serverDir = 'C:\Users\Admin\Desktop\100 Sites\Ruler'

Write-Host "=== Step 1: Building ==="
Set-Location $serverDir
npx astro build 2>&1 | Out-Null
Write-Host "Build complete"

Write-Host "=== Step 2: Starting wrangler dev server ==="
$wrangler = Start-Process -FilePath 'npx.cmd' -ArgumentList 'wrangler pages dev "dist" --port 4322' -WorkingDirectory $serverDir -NoNewWindow -PassThru
Write-Host "Wrangler PID: $($wrangler.Id)"
Start-Sleep -Seconds 15

Write-Host "=== Step 3: Testing server ==="
try {
    $r = Invoke-WebRequest -Uri 'http://127.0.0.1:4322/en/ruler/' -UseBasicParsing -TimeoutSec 10
    Write-Host "Server OK: $($r.StatusCode)"
} catch {
    Write-Host "Server error: $($_.Exception.Message)"
    $wrangler.Kill()
    exit 1
}

Write-Host "=== Step 4: Running Playwright audit ==="
node quick-audit.mjs 2>&1
$auditExit = $LASTEXITCODE

Write-Host "=== Step 5: Cleanup ==="
$wrangler.Kill()
Write-Host "Done"

exit $auditExit
