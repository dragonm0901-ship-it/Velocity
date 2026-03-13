import re

with open('src/components/Navbar.jsx', 'r') as f:
    content = f.read()

# 1. Add the mobile settings and Book Now button into the mobile menu dropdown
mobile_menu_addition = """<a href="#about" className={`nav-link hover-lift hover:text-forestGreen transition-colors ${isMobileMenuOpen ? 'text-richBlue' : ''}`}>About</a>

          {/* Mobile settings & Book Now */}
          <div className="md:hidden flex flex-col items-center gap-4 mt-2 w-full border-t border-richBlue/10 pt-4">
            <div className="flex justify-center gap-4 w-full">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-offWhite text-richBlue px-3 py-2 rounded-lg outline-none font-bold">
                {['EN', 'FR', 'DE', 'ZH'].map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-offWhite text-richBlue px-3 py-2 rounded-lg outline-none font-bold">
                {['USD', 'EUR', 'NPR'].map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>
            <button className="w-full bg-forestGreen text-pureWhite px-6 py-3 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:bg-forestGreen/90 transition-colors shadow-md">
              Book Now
            </button>
          </div>"""

content = content.replace("""<a href="#about" className={`nav-link hover-lift hover:text-forestGreen transition-colors ${isMobileMenuOpen ? 'text-richBlue' : ''}`}>About</a>""", mobile_menu_addition)

# 2. Hide the desktop settings and Book Now on mobile, and move the hamburger icon
desktop_items = """<div className="flex items-center gap-4">
          <button className="md:hidden nav-link p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          {/* Settings Toggle (Currency & Language) */}
          <div className="relative">"""

desktop_items_replacement = """<div className="flex items-center gap-2 md:gap-4">
          {/* Settings Toggle (Currency & Language) */}
          <div className="relative hidden md:block">"""

content = content.replace(desktop_items, desktop_items_replacement)

# 3. Add `hidden md:block` to desktop Book Now button, and place the hamburger menu at the end
book_now = """</button>
        </div>
      </nav>"""

book_now_replacement = """</button>
          <button className="md:hidden nav-link p-2 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>"""

# Add hidden md:block to the desktop Book Now button
content = content.replace("""<button className="magnetic-btn bg-forestGreen text-pureWhite px-6 py-2 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:bg-forestGreen/90 transition-colors shadow-md">""", """<button className="hidden md:block magnetic-btn bg-forestGreen text-pureWhite px-6 py-2 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:bg-forestGreen/90 transition-colors shadow-md">""")

content = content.replace("""</button>
        </div>
      </nav>""", book_now_replacement)

with open('src/components/Navbar.jsx', 'w') as f:
    f.write(content)

print("Navbar updated.")
