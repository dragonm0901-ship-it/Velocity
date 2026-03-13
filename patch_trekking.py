with open("src/components/TrekkingPlanner.jsx", "r") as f:
    content = f.read()

content = content.replace(
    'className="py-32 px-8 w-full bg-offWhite flex justify-center"',
    'className="py-16 md:py-32 px-4 md:px-8 w-full bg-offWhite flex justify-center"'
)

content = content.replace(
    'className="w-full md:w-1/3 bg-richBlue p-10 flex flex-col justify-between text-pureWhite"',
    'className="w-full md:w-1/3 bg-richBlue p-6 md:p-10 flex flex-col justify-between text-pureWhite"'
)

content = content.replace(
    '<div className="space-y-6">',
    '<div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 md:flex-col md:space-y-6 md:gap-0 scrollbar-hide">'
)

content = content.replace(
    'className="w-full md:w-2/3 p-10 md:p-16 flex flex-col justify-between"',
    'className="w-full md:w-2/3 p-6 md:p-16 flex flex-col justify-between"'
)

with open("src/components/TrekkingPlanner.jsx", "w") as f:
    f.write(content)
