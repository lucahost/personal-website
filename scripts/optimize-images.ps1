# Optimizes a few oversized images in src/common/img.
# Photographic images are resized + re-encoded as JPEG; logos stay PNG (alpha preserved).
# Run from the repo root:  pwsh -File scripts/optimize-images.ps1

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'
$imgDir = Join-Path $PSScriptRoot '..\src\common\img'

function Resize-Image {
  param(
    [string]$InPath,
    [string]$OutPath,
    [int]$MaxDim,
    [ValidateSet('jpeg', 'png')] [string]$Format,
    [int]$Quality = 82,
    [string]$BackgroundHex = '#0d1117'
  )

  $src = [System.Drawing.Image]::FromFile((Resolve-Path $InPath))
  $scale = [Math]::Min(1.0, $MaxDim / [Math]::Max($src.Width, $src.Height))
  $w = [int][Math]::Round($src.Width * $scale)
  $h = [int][Math]::Round($src.Height * $scale)

  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  try {
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    if ($Format -eq 'jpeg') {
      $bg = [System.Drawing.ColorTranslator]::FromHtml($BackgroundHex)
      $g.Clear($bg)
    }
    $g.DrawImage($src, 0, 0, $w, $h)
  }
  finally {
    $g.Dispose()
    # Release the lock on the source file BEFORE saving (supports in-place output).
    $src.Dispose()
  }

  if ($Format -eq 'jpeg') {
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
    $bmp.Save($OutPath, $codec, $ep)
  }
  else {
    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  $bmp.Dispose()

  '{0}  ->  {1}  ({2:N0} KB)' -f (Split-Path $InPath -Leaf), (Split-Path $OutPath -Leaf), ((Get-Item $OutPath).Length / 1KB)
}

# PNG -> JPEG conversions are one-shot: skip (and don't delete) when the
# original is already gone so the script stays repeatable.
if (Test-Path "$imgDir\astramind.png") {
  Resize-Image -InPath "$imgDir\astramind.png" -OutPath "$imgDir\astramind.jpg" -MaxDim 640 -Format jpeg -Quality 82
  Remove-Item "$imgDir\astramind.png" -Force
}
if (Test-Path "$imgDir\network.png") {
  Resize-Image -InPath "$imgDir\network.png" -OutPath "$imgDir\network.jpg" -MaxDim 800 -Format jpeg -Quality 82
  Remove-Item "$imgDir\network.png" -Force
}
Resize-Image -InPath "$imgDir\twitterX.png" -OutPath "$imgDir\twitterX.png" -MaxDim 128 -Format png
Resize-Image -InPath "$imgDir\uno.png"      -OutPath "$imgDir\uno.png"      -MaxDim 480 -Format png
'done'
