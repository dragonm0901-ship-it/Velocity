with open("src/index.css", "r") as f:
    content = f.read()

content = content.replace("    @apply bg-offWhite text-richBlue overflow-x-hidden cursor-none;\n", "    @apply bg-offWhite text-richBlue overflow-x-hidden;\n")
content = content.replace("  a, button, input, textarea {\n    @apply cursor-none;\n  }\n", "")

with open("src/index.css", "w") as f:
    f.write(content)
