with open("src/App.jsx", "r") as f:
    lines = f.readlines()

out_lines = []
skip = False
for i, line in enumerate(lines):
    if line.startswith("const CustomCursor = () => {"):
        skip = True
    if skip and line.startswith("};"):
        skip = False
        continue
    if skip:
        continue
    if "<CustomCursor />" in line:
        continue
    out_lines.append(line)

with open("src/App.jsx", "w") as f:
    f.writelines(out_lines)
