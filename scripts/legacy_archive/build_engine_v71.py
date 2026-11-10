import re

with open("apps/web/universal-brandbook-30-engine.js", "r", encoding="utf-8") as f:
    content = f.read()

# Verify that the markers exist
start_marker = "for (let i = 0; i < 30; i++) {"
# We locate the specific occurrence inside generate30PlatesPdfBlobUltraFast
pos_gen = content.find("window.generate30PlatesPdfBlobUltraFast = async function")
assert pos_gen != -1, "generate30PlatesPdfBlobUltraFast not found"

loop_start = content.find(start_marker, pos_gen)
assert loop_start != -1, "loop_start not found"

loop_end_target = "jpegPages.push({\n        dataUrl: canvas.toDataURL(\"image/jpeg\", 0.88),"
loop_end = content.find(loop_end_target, loop_start)
assert loop_end != -1, "loop_end not found"

print(f"Located target loop: from {loop_start} to {loop_end} (length: {loop_end - loop_start} chars)")
