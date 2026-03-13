with open("src/components/PopularTreks.jsx", "r") as f:
    content = f.read()

content = content.replace(
    'className="py-32 px-8 w-full bg-pureWhite flex flex-col items-center"',
    'className="py-16 md:py-32 px-4 md:px-8 w-full bg-pureWhite flex flex-col items-center"'
)

content = content.replace(
    '<div className="p-8">',
    '<div className="p-5 md:p-8">'
)

with open("src/components/PopularTreks.jsx", "w") as f:
    f.write(content)
