import subprocess

cmd = ['git', 'show', '1f20183:apps/web/tbb-commercial-experience-and-payments.js']
code = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout
lines = code.splitlines()

# Boundaries
idx_header = 1346
idx_hero = 1446
idx_plate = 1524
idx_deliv = 1557
idx_video = 1639
idx_demo = 1700
idx_pricing = 1902
idx_return_end = 1983

print("Header start line:", lines[idx_header][:40])
print("Hero start line:", lines[idx_hero][:40])
print("Plate Explorer start line:", lines[idx_plate][:40])
print("Deliverables start line:", lines[idx_deliv][:40])
print("Video start line:", lines[idx_video][:40])
print("Demo start line:", lines[idx_demo][:40])
print("Pricing start line:", lines[idx_pricing][:40])
print("Return end line:", lines[idx_return_end][:40])
