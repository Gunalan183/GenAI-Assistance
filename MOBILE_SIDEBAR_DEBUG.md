# Mobile Sidebar Debug Guide

## Issue
Sidebar not opening on mobile view despite hamburger button being clicked.

## Potential Causes & Solutions

### 1. Check Browser Console
Open your mobile browser dev tools (or desktop Chrome dev tools in mobile view):
- Press F12 → Toggle device toolbar
- Click hamburger menu
- Check for JavaScript errors
- Check if `isMobileMenuOpen` state changes

### 2. Verify Tailwind Classes
The sidebar uses these key classes:
```
translate-x-0 (visible)
-translate-x-full (hidden)
```

### 3. Z-Index Stack
Current z-index order:
- Navbar: `z-30`
- Overlay: `z-40` 
- Sidebar: `z-50`

### 4. Test Commands

**Test if state changes:**
Add this temporarily to Sidebar.jsx after imports:
```javascript
console.log('Sidebar isOpen:', isOpen)
```

**Test if click handler works:**
Add this to Navbar.jsx toggleMobileMenu:
```javascript
console.log('Menu toggled, new state:', !isMobileMenuOpen)
```

### 5. Verify Responsive Breakpoint
The sidebar should:
- Hide at < 1024px (mobile/tablet)
- Always show at >= 1024px (desktop)

Current breakpoint: `lg:` = 1024px

### 6. Quick Test in Dev Tools

Paste this in browser console while on the site:
```javascript
// Check if sidebar exists
document.querySelector('aside')

// Check overlay
document.querySelector('.bg-black.bg-opacity-50')

// Force open sidebar
document.querySelector('aside').classList.remove('-translate-x-full')
document.querySelector('aside').classList.add('translate-x-0')
```

### 7. Alternative: Force Debug Mode

Add this to ResponsiveLayout.jsx temporarily:
```javascript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true) // Force open
```

### 8. Check if Deployed Version
Make sure you deployed the latest code:
```powershell
cd frontend
vercel --prod
```

Wait for build to complete and hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### 9. Browser Cache
Clear cache and try:
- Chrome: Ctrl+Shift+Delete → Clear cache
- Or use Incognito/Private mode

### 10. Verify Mobile View Settings
In Chrome DevTools:
- F12 → Toggle device toolbar (Ctrl+Shift+M)
- Select "iPhone 12 Pro" or "Galaxy S20"
- Ensure viewport width < 1024px
- Check if hamburger button appears

## Expected Behavior

1. **On Mobile (< 1024px):**
   - Hamburger button visible in navbar
   - Sidebar hidden by default
   - Click hamburger → sidebar slides in from left
   - Dark overlay appears
   - Click overlay or X → sidebar slides out

2. **On Desktop (>= 1024px):**
   - Hamburger button hidden
   - Sidebar always visible
   - No overlay

## Files to Check
- `frontend/src/components/common/Sidebar.jsx`
- `frontend/src/components/common/Navbar.jsx`
- `frontend/src/components/common/ResponsiveLayout.jsx`

## If Still Not Working

Try this nuclear option - replace Sidebar with minimal version:

```javascript
const Sidebar = ({ isOpen, onClose }) => (
  <>
    {isOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
    )}
    <div 
      className={`fixed top-0 left-0 w-64 h-full bg-white z-50 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button onClick={onClose}>Close</button>
      <p>Sidebar Content</p>
    </div>
  </>
)
```

If this minimal version works, the issue is in the styling/structure.
