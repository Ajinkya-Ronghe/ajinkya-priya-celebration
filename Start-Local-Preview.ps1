$ErrorActionPreference = 'Stop'
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) { throw 'Python 3 is required. Install Python 3 or use another local static HTTP server.' }
& $python.Source (Join-Path $PSScriptRoot 'serve.py')

