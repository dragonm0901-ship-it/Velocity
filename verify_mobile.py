from playwright.sync_api import sync_playwright

def verify_mobile():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # iPhone 13 Pro Max dimensions
        context = browser.new_context(viewport={'width': 428, 'height': 926}, is_mobile=True)
        page = context.new_page()

        print("Navigating to http://localhost:5173")
        page.goto('http://localhost:5173')

        # Wait for GSAP preloader (often takes a few seconds)
        print("Waiting for page load and animations...")
        page.wait_for_timeout(6000)

        print("Capturing Hero section on mobile...")
        page.screenshot(path='/home/jules/verification/mobile_hero.png', full_page=False)

        print("Testing Mobile Menu...")
        menu_button = page.locator('button.md\\:hidden')
        if menu_button.is_visible():
            menu_button.click()
            page.wait_for_timeout(1000) # Wait for animation
            page.screenshot(path='/home/jules/verification/mobile_menu.png')
            menu_button.click() # Close menu
            page.wait_for_timeout(1000)
        else:
            print("Mobile menu button not found!")

        print("Capturing Trekking Planner section...")
        page.locator('#planner').scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
        page.screenshot(path='/home/jules/verification/mobile_planner.png')

        print("Capturing Popular Treks section...")
        page.locator('#treks').scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
        page.screenshot(path='/home/jules/verification/mobile_treks.png')

        browser.close()
        print("Verification completed. Screenshots saved in /home/jules/verification/")

if __name__ == '__main__':
    verify_mobile()
