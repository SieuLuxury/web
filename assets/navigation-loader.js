// Loading Screen Management - Optimized for smooth performance
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
            loadingScreen.style.display = 'flex';
            loadingScreen.classList.remove('hidden');
        });
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        
        // Smooth hide with CSS transition
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition completes
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.style.display = 'none';
            }
        }, 500); // Wait for CSS transition to complete
    }
}

// Check Authentication First
function checkAuthentication() {
    const savedAuth = localStorage.getItem('telegram_auth');
    if (!savedAuth) {
        window.location.href = '/web/login.html';
        return false;
    }
    
    try {
        const authData = JSON.parse(savedAuth);
        const now = Date.now();
        const authTime = authData.timestamp;
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if ((now - authTime) >= twentyFourHours) {
            localStorage.removeItem('telegram_auth');
            window.location.href = '/web/login.html';
            return false;
        }
        
        return true;
    } catch (error) {
        localStorage.removeItem('telegram_auth');
        window.location.href = '/web/login.html';
        return false;
    }
}

// Update user info from localStorage
function updateUserInfoFromStorage() {
    const savedAuth = localStorage.getItem('telegram_auth');
    if (savedAuth) {
        try {
            const authData = JSON.parse(savedAuth);
            
            // Update mobile user info
            const mobileUserName = document.querySelector('.mobile-user h4');
            if (mobileUserName) {
                mobileUserName.textContent = authData.first_name || 'SieuLuxury';
            }
            
            // Update desktop user info
            const desktopUserName = document.querySelector('.nav-user-details h4');
            if (desktopUserName) {
                desktopUserName.textContent = authData.first_name || 'SieuLuxury';
            }
            
            // Update avatars
            const avatars = document.querySelectorAll('.user-avatar, .nav-user-avatar');
            avatars.forEach(avatar => {
                if (authData.first_name) {
                    avatar.textContent = authData.first_name.substring(0, 2).toUpperCase();
                }
            });
            
        } catch (error) {
            // console.error('❌ Error updating user info:', error);
        }
    }
}

// Navigation Loader - Universal navigation loading for all pages
function loadNavigation(activePage, isSubdirectory = false) {
    
    // Check authentication first
    if (!checkAuthentication()) {
        return Promise.reject(new Error('Authentication required'));
    }
    
    const navPath = isSubdirectory ? '../navigation.html' : 'navigation.html';
    const timestamp = new Date().getTime();
    const cacheBustedPath = `${navPath}?v=${timestamp}`;
    
    return fetch(cacheBustedPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Store current body content
            const currentContent = document.body.innerHTML;
            
            // Insert navigation into page
            document.body.innerHTML = data + currentContent;
            
            // Update user info from localStorage
            updateUserInfoFromStorage();
            
            // Set active page with smart highlighting
            setActiveNavigation(activePage);
            
            // Initialize handlers after navigation is loaded
            setTimeout(() => {
                // Load main script after navigation
                if (isSubdirectory) {
                    loadScript('../assets/script.js').then(() => {
                        initializeAfterLoad();
                    });
                } else {
                    loadScript('assets/script.js').then(() => {
                        initializeAfterLoad();
                    });
                }
            }, 100);
            
            function initializeAfterLoad() {
                // Initialize select focus handlers
                if (typeof handleSelectFocus === 'function') {
                    handleSelectFocus();
                }
                
                // Initialize toast manager
                if (typeof ToastManager !== 'undefined') {
                    window.toastManager = new ToastManager();
                }
                
                // Reveal main content with smooth transition
                const mainContent = document.getElementById('mainContent');
                if (mainContent) {
                    mainContent.style.opacity = '1';
                    mainContent.style.visibility = 'visible';
                    mainContent.style.transition = 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out';
                }
                
                // Hide loading screen after everything is ready
                hideLoadingScreen();
                
            }
        })
        .catch(error => {
            // console.error('Error loading navigation:', error);
            // Hide loading screen on error
            hideLoadingScreen();
            
            // Fallback: show error message
            document.body.innerHTML = `
                <div style="padding: 50px; text-align: center; color: #f87171; background: rgba(15, 15, 35, 0.95); border-radius: 20px; margin: 20px;">
                    <h3>⚠️ Navigation Loading Error</h3>
                    <p>Failed to load navigation from: ${navPath}</p>
                    <p>Error: ${error.message}</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        🔄 Refresh Page
                    </button>
                </div>
            ` + document.body.innerHTML;
        });
}

// Function to load script dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Check if script already exists
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            reject(new Error(`Failed to load script: ${src}`));
        };
        document.head.appendChild(script);
    });
}

// Smart Navigation Highlighting System
function setActiveNavigation(currentPage) {
    
    // Remove all active states first
    const allNavLinks = document.querySelectorAll('.nav-link, .bottom-nav-item');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Page mapping for navigation highlighting
    const pageMapping = {
    // Main pages
    'home': ['home'],
    'index': ['home'],
    'topup': ['topup'],
    'settings': ['settings'],
    'setting': ['settings'],
    
    // Checkers - handle both underscore and dash
    'checkers': ['checkers'],
    'checker': ['checkers'],
    'stripe_auth': ['checkers'],
    'stripe-auth': ['checkers'],
    'braintree_auth': ['checkers'],
    'braintree-auth': ['checkers'],
    'shopify_auto': ['checkers'],
    'shopify-auto': ['checkers'],
    
    // Tools - handle both underscore and dash
    'tools': ['tools'],
    'tool': ['tools'],
    'bin_lookup': ['tools'],
    'bin-lookup': ['tools'],
    '3ds_lookup': ['tools'],
    '3ds-lookup': ['tools'],
    'card_generator': ['tools'],
    'card-generator': ['tools'],
    
    // Database
    'database': ['database-users'],
    'database-users': ['database-users'],
    'database-logs': ['database-logs'],
    'database-transactions': ['database-transactions'],
    'user_data': ['database-users'],
    'transaction_logs': ['database-logs']
};
    
    // Find which navigation items should be active
    let activeNavItems = [];
    
    // Direct match
    if (pageMapping[currentPage]) {
        activeNavItems = pageMapping[currentPage];
    } else {
        // Fallback: try to find partial matches
        for (const [page, navItems] of Object.entries(pageMapping)) {
            if (currentPage.includes(page) || page.includes(currentPage)) {
                activeNavItems = navItems;
                break;
            }
        }
    }
    
    // Apply active state to matching navigation items
    activeNavItems.forEach(navItem => {
        // Desktop navigation
        const desktopLink = document.querySelector(`.nav-link[data-page="${navItem}"]`);
        if (desktopLink) {
            desktopLink.classList.add('active');
        }
        
        // Mobile navigation
        const mobileLink = document.querySelector(`.bottom-nav-item[data-page="${navItem}"]`);
        if (mobileLink) {
            mobileLink.classList.add('active');
        }
    });
    
    // If no matches found, try generic approach
    if (activeNavItems.length === 0) {
        
        // Try to find any link that contains the current page name
        allNavLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage && (linkPage.includes(currentPage) || currentPage.includes(linkPage))) {
                link.classList.add('active');
            }
        });
    }
    
}

// Logout function
function logout() {
    localStorage.removeItem('telegram_auth');
    window.location.href = '/web/login.html';
}
