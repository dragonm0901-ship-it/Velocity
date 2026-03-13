with open("src/components/Hero.jsx", "r") as f:
    content = f.read()

content = content.replace(
    'className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center mt-20"',
    'className="relative z-10 w-full max-w-4xl px-4 md:px-8 flex flex-col items-center text-center mt-24 md:mt-20"'
)

content = content.replace(
    'className="w-full py-5 px-4 text-richBlue font-sans outline-none bg-transparent"',
    'className="w-full py-3 px-4 md:py-5 text-richBlue font-sans outline-none bg-transparent"'
)

content = content.replace(
    'className="bg-forestGreen text-pureWhite px-8 py-5 font-sans font-semibold uppercase tracking-wider hover:bg-forestGreen/90 transition-colors"',
    'className="bg-forestGreen text-pureWhite px-6 py-3 md:px-8 md:py-5 font-sans font-semibold uppercase tracking-wider hover:bg-forestGreen/90 transition-colors"'
)

with open("src/components/Hero.jsx", "w") as f:
    f.write(content)
