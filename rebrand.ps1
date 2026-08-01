param()
$dir = "C:\Users\basan\OneDrive\Desktop\NK Cab & Taxi\src"
$exts = @("*.ts","*.tsx","*.js","*.jsx","*.mjs")
$replacements = @(
    @{From='kolkatacabservice\.com'; To='nkcabtaxi.com'},
    @{From='Kolkata Cab Service'; To='NK Cab & Taxi'},
    @{From='kolkata-cab-service'; To='nk-cab-taxi'},
    @{From='KolkataCabService'; To='NKCabTaxi'},
    @{From='kolkatacabtaxiservices@gmail\.com'; To='nkcabtaxi@gmail.com'},
    @{From='kolkatacabsservice@gmail\.com'; To='nkcabtaxi@gmail.com'}
)
$count = 0
foreach ($ext in $exts) {
    $files = Get-ChildItem -Path $dir -Filter $ext -Recurse
    foreach ($f in $files) {
        $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
        $content = [System.Text.Encoding]::UTF8.GetString($bytes)
        $changed = $false
        foreach ($r in $replacements) {
            $new = $content -replace $r.From, $r.To
            if ($new -ne $content) {
                $content = $new
                $changed = $true
            }
        }
        if ($changed) {
            $outBytes = [System.Text.Encoding]::UTF8.GetBytes($content)
            [System.IO.File]::WriteAllBytes($f.FullName, $outBytes)
            $count++
            Write-Host "Updated: $($f.Name)"
        }
    }
}
Write-Host "Total updated: $count source files."
