# 💳 Premium CC Checker

> A modern, responsive credit card validation system with beautiful UI and advanced features

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Modern Design
- **Glass Morphism UI** - Beautiful translucent design with backdrop blur
- **Smooth Animations** - 60fps animations and micro-interactions
- **Dark Theme** - Professional dark theme with gradient accents
- **Responsive Layout** - Works perfectly on all devices

### 🧭 Advanced Navigation
- **Collapsible Sidebar** - Space-efficient navigation with state persistence
- **Mobile-First Design** - Optimized for touch devices
- **Keyboard Shortcuts** - Power user features (Alt+H, Alt+T, etc.)
- **Submenu System** - Organized navigation with smooth expand/collapse

### 🔧 Technical Features
- **Service Worker** - Offline support and caching
- **Toast Notifications** - Beautiful notification system
- **Form Validation** - Real-time validation with visual feedback
- **Touch Gestures** - Swipe support for mobile devices
- **Performance Monitoring** - Built-in performance tracking

### ♿ Accessibility
- **WCAG Compliant** - Accessible to all users
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper ARIA labels and announcements
- **High Contrast Mode** - Support for accessibility preferences

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/premium-cc-checker.git
   cd premium-cc-checker
   ```

2. **Start a local server**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
premium-cc-checker/
├── index.html              # Main HTML file
├── styles/                 # CSS stylesheets
│   ├── main.css           # Core styles and variables
│   ├── navigation.css     # Navigation components
│   ├── components.css     # UI components
│   └── responsive.css     # Responsive design
├── js/                    # JavaScript files
│   ├── utils.js          # Utility functions
│   ├── toast.js          # Toast notification system
│   ├── navigation.js     # Navigation functionality
│   └── main.js          # Main application logic
├── README.md             # Project documentation
└── LICENSE              # MIT License
```

## 🎯 Navigation Features

### Desktop Navigation
- **Collapsible Sidebar** - Toggle between expanded and collapsed states
- **Submenu System** - Organized menu items with smooth animations
- **Active State Indicators** - Visual feedback for current page
- **Hover Effects** - Beautiful hover animations with ripple effects

### Mobile Navigation
- **Bottom Navigation Bar** - Easy thumb navigation
- **Profile Menu** - Slide-out profile menu with user info
- **Touch Optimized** - 44px minimum touch targets
- **Swipe Gestures** - Natural mobile interactions

### Keyboard Shortcuts
- `Alt + H` - Navigate to Home
- `Alt + T` - Navigate to Top Up
- `Alt + R` - Navigate to Redeem
- `Alt + S` - Navigate to Settings
- `Alt + C` - Toggle navigation collapse
- `Esc` - Close mobile menus

## 🛠️ Customization

### CSS Variables
The design system uses CSS custom properties for easy customization:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --success-gradient: linear-gradient(135deg, #00d4aa 0%, #4ade80 100%);
    --warning-gradient: linear-gradient(135deg, #ffb74d 0%, #ff9800 100%);
    --danger-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --text-muted: #808080;
    
    --border-radius: 20px;
    --border-radius-lg: 28px;
    --border-radius-sm: 16px;
}
```

### Adding New Pages
1. Add navigation item to HTML
2. Add page data to `getPageData()` method
3. Create page content in `updatePageContent()` method

## 📱 Responsive Breakpoints

- **Mobile**: 0-575px
- **Large Mobile**: 576-767px
- **Tablet**: 768-1023px
- **Desktop**: 1024-1199px
- **Large Desktop**: 1200px+

## 🔧 Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

## 🙏 Acknowledgments

- [Inter Font](https://fonts.google.com/specimen/Inter) - Beautiful typography
- [Font Awesome](https://fontawesome.com/) - Icon library
- [CSS Tricks](https://css-tricks.com/) - CSS inspiration and techniques

---

<div align="center">
  <strong>Made with ❤️ for modern web development</strong>
</div>