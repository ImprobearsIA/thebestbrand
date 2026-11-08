import subprocess
import re

print("Testing access to base commit 1f20183...")
cmd = ["git", "show", "1f20183:apps/web/tbb-commercial-experience-and-payments.js"]
raw = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout
print(f"Base code length: {len(raw)} characters, {len(raw.splitlines())} lines.")

# Test node syntax on base
res = subprocess.run(["node", "-c"], input=raw, text=True, capture_output=True)
if res.returncode == 0:
    print("Base code syntax is 100% VALID.")
else:
    print("Base code syntax error:", res.stderr)
