/* ========================================
   PREMIUM CC CHECKER - CONSOLIDATED JS
   ======================================== */

// Global variables
let currentPage = 'home';
let generatedCards = [];
let cardData = [];
let binInfo = null;

/* ===== AUTHENTICATION SYSTEM ===== */
// Check if user is authenticated
function isAuthenticated() {
    const savedAuth = localStorage.getItem('telegram_auth');
    if (!savedAuth) return false;
    
    try {
        const authData = JSON.parse(savedAuth);
        const now = Date.now();
        const authTime = authData.timestamp;
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        return (now - authTime) < twentyFourHours;
    } catch (error) {
        localStorage.removeItem('telegram_auth');
        return false;
    }
}

// Get user data from localStorage
function getUserData() {
    const savedAuth = localStorage.getItem('telegram_auth');
    if (savedAuth) {
        try {
            return JSON.parse(savedAuth);
        } catch (error) {
            return null;
        }
    }
    return null;
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

// Logout function
function logout() {
    localStorage.removeItem('telegram_auth');
    window.location.href = '/web/login.html';
}

/* ===== TOAST NOTIFICATION SYSTEM ===== */
class ToastManager {
    constructor() {
        this.container = document.getElementById('toastContainer');
        this.toasts = [];
        this.createContainer();
    }

    createContainer() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toastContainer';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    show(type, title, message, duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="${icons[type]}"></i>
                </div>
                <div class="toast-message">
                    <div class="toast-title">${title}</div>
                    <div class="toast-text">${message}</div>
                </div>
                <button class="toast-close" onclick="toastManager.remove(this.parentElement)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="toast-progress"></div>
        `;

        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Show animation
        setTimeout(() => {
            toast.classList.add('show');
            
            // Start progress bar animation
            const progressBar = toast.querySelector('.toast-progress');
            progressBar.style.width = '100%';
            
            // Animate progress bar
            setTimeout(() => {
                progressBar.style.width = '0%';
                progressBar.style.transition = `width ${duration}ms linear`;
            }, 100);
        }, 100);

        // Auto remove
        const autoRemoveTimer = setTimeout(() => this.remove(toast), duration);

        // Click to remove (and clear timer)
        toast.onclick = () => {
            clearTimeout(autoRemoveTimer);
            this.remove(toast);
        };

        return toast;
    }

    remove(toast) {
        if (!toast || !toast.parentElement) return;
        
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
            const index = this.toasts.indexOf(toast);
            if (index > -1) {
                this.toasts.splice(index, 1);
            }
        }, 400);
    }

    success(title, message) { return this.show('success', title, message); }
    error(title, message) { return this.show('error', title, message); }
    warning(title, message) { return this.show('warning', title, message); }
    info(title, message) { return this.show('info', title, message); }
}

// Initialize toast manager
const toastManager = new ToastManager();

/* ===== LOADING SCREEN MANAGEMENT ===== */
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        requestAnimationFrame(() => {
            loadingScreen.style.display = 'flex';
            loadingScreen.classList.remove('hidden');
        });
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.style.display = 'none';
            }
        }, 500);
    }
}

/* ===== NAVIGATION SYSTEM ===== */
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
            console.error('Error updating user info:', error);
        }
    }
}

// Function to load script dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

// Navigation Loader - Universal navigation loading for all pages
function loadNavigation(activePage, isSubdirectory = false) {
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
            const currentContent = document.body.innerHTML;
            document.body.innerHTML = data + currentContent;
            
            updateUserInfoFromStorage();
            setActiveNavigation(activePage);
            
            setTimeout(() => {
                initializeAfterLoad();
            }, 100);
            
            function initializeAfterLoad() {
                if (typeof handleSelectFocus === 'function') {
                    handleSelectFocus();
                }
                
                if (typeof ToastManager !== 'undefined') {
                    window.toastManager = new ToastManager();
                }
                
                const mainContent = document.getElementById('mainContent');
                if (mainContent) {
                    mainContent.style.opacity = '1';
                    mainContent.style.visibility = 'visible';
                    mainContent.style.transition = 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out';
                }
                
                hideLoadingScreen();
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            hideLoadingScreen();
            
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

// Smart Navigation Highlighting System
function setActiveNavigation(currentPage) {
    // Remove all active states first
    const allNavLinks = document.querySelectorAll('.nav-link, .bottom-nav-item');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Page mapping for navigation highlighting
    const pageMapping = {
        'home': ['home'],
        'index': ['home'],
        'topup': ['topup'],
        'settings': ['settings'],
        'setting': ['settings'],
        
        'checkers': ['checkers'],
        'checker': ['checkers'],
        'stripe_auth': ['checkers'],
        'stripe-auth': ['checkers'],
        'braintree_auth': ['checkers'],
        'braintree-auth': ['checkers'],
        'shopify_auto': ['checkers'],
        'shopify-auto': ['checkers'],
        
        'tools': ['tools'],
        'tool': ['tools'],
        'bin_lookup': ['tools'],
        'bin-lookup': ['tools'],
        '3ds_lookup': ['tools'],
        '3ds-lookup': ['tools'],
        'card_generator': ['tools'],
        'card-generator': ['tools'],
        
        'database': ['database-users'],
        'database-users': ['database-users'],
        'database-logs': ['database-logs'],
        'database-transactions': ['database-transactions'],
        'user_data': ['database-users'],
        'transaction_logs': ['database-logs']
    };
    
    let activeNavItems = [];
    
    if (pageMapping[currentPage]) {
        activeNavItems = pageMapping[currentPage];
    } else {
        for (const [page, navItems] of Object.entries(pageMapping)) {
            if (currentPage.includes(page) || page.includes(currentPage)) {
                activeNavItems = navItems;
                break;
            }
        }
    }
    
    activeNavItems.forEach(navItem => {
        const desktopLink = document.querySelector(`.nav-link[data-page="${navItem}"]`);
        if (desktopLink) {
            desktopLink.classList.add('active');
        }
        
        const mobileLink = document.querySelector(`.bottom-nav-item[data-page="${navItem}"]`);
        if (mobileLink) {
            mobileLink.classList.add('active');
        }
    });
    
    if (activeNavItems.length === 0) {
        allNavLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage && (linkPage.includes(currentPage) || currentPage.includes(linkPage))) {
                link.classList.add('active');
            }
        });
    }
}

/* ===== MODAL SYSTEM ===== */
// Modal configurations
const modalConfigs = {
    checkers: {
        title: 'Credit Card Checkers',
        icon: 'fas fa-credit-card',
        items: [
            {
                id: 'stripe-auth',
                icon: 'fab fa-stripe',
                title: 'Stripe Auth Checker',
                desc: 'Advanced credit card validation using Stripe authentication system with real-time processing and detailed response analysis.'
            },
            {
                id: 'braintree-auth', 
                icon: 'fas fa-brain',
                title: 'Braintree Auth Checker',
                desc: 'Professional card checking through Braintree payment gateway with enhanced security features and fraud detection.'
            },
            {
                id: 'shopify-auto',
                icon: 'fab fa-shopify',
                title: 'Shopify Auto Checker',
                desc: 'Automated bulk checking via Shopify stores with intelligent product selection.'
            }
        ]
    },
    tools: {
        title: 'Utility Tools',
        icon: 'fas fa-tools',
        items: [
            {
                id: 'bin-lookup',
                icon: 'fas fa-search',
                title: 'BIN Lookup Tool',
                desc: 'Comprehensive bank identification number lookup with detailed card information, issuer data, and country details.'
            },
            {
                id: '3ds-lookup',
                icon: 'fas fa-shield-alt',
                title: '3DS Security Lookup',
                desc: 'Check 3D Secure authentication status and security features for any card.'
            },
            {
                id: 'card-generator',
                icon: 'fas fa-random',
                title: 'Card Generator',
                desc: 'Generate valid test credit card numbers for development and testing purposes.'
            }
        ]
    }
};

function showModal(type) {
    const config = modalConfigs[type];
    if (!config) return;

    const overlay = document.getElementById('modalOverlay');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitleText = document.getElementById('modalTitleText');
    const modalGrid = document.getElementById('modalGrid');
    const modalHeader = document.querySelector('.modal-header');

    modalIcon.className = config.icon;
    modalTitleText.textContent = config.title;

    // Add glow effect to modal header
    if (modalHeader && !modalHeader.querySelector('.glow-effect')) {
        const glowEffect = document.createElement('div');
        glowEffect.className = 'glow-effect';
        modalHeader.appendChild(glowEffect);
    }

    // Add particles to modal header
    if (modalHeader && !modalHeader.querySelector('.particles')) {
        const particles = document.createElement('div');
        particles.className = 'particles';
        
        for (let i = 0; i < 4; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particles.appendChild(particle);
        }
        
        modalHeader.appendChild(particles);
    }

    let itemsHTML = '';
    config.items.forEach(item => {
        itemsHTML += `
            <div class="modal-item" onclick="selectModalItem('${item.id}')">
                <i class="modal-item-icon ${item.icon}"></i>
                <div class="modal-item-title">${item.title}</div>
                <div class="modal-item-desc">${item.desc}</div>
            </div>
        `;
    });

    modalGrid.innerHTML = itemsHTML;
    overlay.classList.add('active');
    
    highlightNavigation(type);
}

function highlightNavigation(section) {
    const allNavElements = document.querySelectorAll('.nav-link, .bottom-nav-item');
    
    allNavElements.forEach(el => {
        el.classList.remove('active');
        el.style.cssText = '';
    });
    
    const activeElements = document.querySelectorAll(`[data-page="${section}"]`);
    
    if (activeElements.length > 0) {
        activeElements.forEach((element, index) => {
            element.classList.add('active');
        });
    }
    
    const desktopCheckers = document.querySelector('.nav-link[data-page="checkers"]');
    const desktopTools = document.querySelector('.nav-link[data-page="tools"]');
    const bottomNavCheckers = document.querySelector('.bottom-nav-item[data-page="checkers"]');
    const bottomNavTools = document.querySelector('.bottom-nav-item[data-page="tools"]');
    
    if (section === 'checkers') {
        if (desktopCheckers) {
            desktopCheckers.classList.add('active');
        }
        if (bottomNavCheckers) {
            bottomNavCheckers.classList.add('active');
        }
    }
    
    if (section === 'tools') {
        if (desktopTools) {
            desktopTools.classList.add('active');
        }
        if (bottomNavTools) {
            bottomNavTools.classList.add('active');
        }
    }
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
    
    const allNavElements = document.querySelectorAll('.nav-link, .bottom-nav-item');
    allNavElements.forEach(el => {
        el.classList.remove('active');
        el.style.cssText = '';
    });
    
    if (typeof currentPage !== 'undefined' && currentPage !== 'home') {
        setTimeout(() => {
            if (typeof setActiveNavigation === 'function') {
                setActiveNavigation(currentPage);
            }
        }, 100);
    }
}

function selectModalItem(itemId) {
    closeModal();
    goToPage(itemId);
}

/* ===== CARD FUNCTIONALITY ===== */
// Card detection and generation functions
function detectCardType(bin) {
    if (!bin) return 'visa';
    const b = bin.toString();
    if (b.startsWith('34') || b.startsWith('37')) return 'amex';
    if (b.startsWith('35')) return 'jcb';
    if (b.startsWith('4')) return 'visa';
    if (b.startsWith('5') || (parseInt(b.slice(0, 4)) >= 2221 && parseInt(b.slice(0, 4)) <= 2720)) return 'mastercard';
    if (b.startsWith('6011') || b.startsWith('622') || b.startsWith('64') || b.startsWith('65')) return 'discover';
    if (b.startsWith('30') || b.startsWith('36') || b.startsWith('38') || b.startsWith('39')) return 'diners';
    return 'visa';
}

function getCardInfo(cardType) {
    const cardInfo = {
        visa: { length: 16, cvvLength: 3 },
        mastercard: { length: 16, cvvLength: 3 },
        amex: { length: 15, cvvLength: 4 },
        discover: { length: 16, cvvLength: 3 },
        jcb: { length: 15, cvvLength: 3 },
        diners: { length: 16, cvvLength: 3 }
    };
    return cardInfo[cardType] || { length: 16, cvvLength: 3 };
}

function generateCheckDigit(number) {
    let sum = 0;
    let isEven = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i]);
        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }
    return (10 - (sum % 10)) % 10;
}

function generatePAN(bin, cardType) {
    const cardInfo = getCardInfo(cardType);
    const remainingLength = cardInfo.length - bin.length;
    let pan = bin;
    
    for (let i = 0; i < remainingLength - 1; i++) {
        pan += Math.floor(Math.random() * 10);
    }
    
    pan += generateCheckDigit(pan);
    return pan;
}

function generateRandomMonth() {
    return String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0');
}

function generateRandomYear() {
    const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'];
    return years[Math.floor(Math.random() * years.length)];
}

function generateRandomCVV(cardType) {
    const { cvvLength } = getCardInfo(cardType);
    return String(Math.floor(Math.random() * Math.pow(10, cvvLength))).padStart(cvvLength, '0');
}

/* ===== CHECKER FUNCTIONS ===== */
function startStripeCheck() {
    const cards = document.getElementById('stripeCards').value.trim();
    if (!cards) {
        toastManager.error('Input Required', 'Vui lòng nhập danh sách thẻ để kiểm tra');
        return;
    }

    toastManager.info('Starting Check', 'Stripe checker is starting...');

    const resultsDiv = document.getElementById('stripeResults');
    resultsDiv.innerHTML = `
        <h4 style="margin-bottom: 20px; display: flex; align-items: center; gap: 12px; font-size: 1.4rem; font-weight: 700;">
            <i class="fas fa-spinner fa-spin" style="background: var(--primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
            Đang kiểm tra...
        </h4>
        <table class="results-table">
            <thead>
                <tr>
                    <th>Card Number</th>
                    <th>Status</th>
                    <th>Response</th>
                    <th>Gateway</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody id="stripeResultsBody">
            </tbody>
        </table>
    `;

    // Simulate checking
    const cardList = cards.split('\n').filter(card => card.trim());
    let index = 0;

    function checkNextCard() {
        if (index >= cardList.length) {
            resultsDiv.querySelector('h4').innerHTML = `
                <i class="fas fa-check-circle" style="color: var(--success);"></i>
                Hoàn thành - Đã kiểm tra ${cardList.length} thẻ
            `;
            toastManager.success('Check Complete', `Successfully checked ${cardList.length} cards`);
            return;
        }

        const card = cardList[index].trim();
        const tbody = document.getElementById('stripeResultsBody');
        
        const statuses = ['Live', 'Dead', 'Unknown'];
        const responses = ['Approved', 'Declined', 'Insufficient Funds', 'Invalid Card', 'CVV Mismatch'];
        const gateways = ['Stripe v1', 'Stripe v3', 'Stripe Connect'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const response = responses[Math.floor(Math.random() * responses.length)];
        const gateway = gateways[Math.floor(Math.random() * gateways.length)];
        
        const cardParts = card.split('|');
        const maskedCard = cardParts[0] ? `${cardParts[0].substring(0, 6)}****${cardParts[0].substring(cardParts[0].length - 4)}` : card;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-family: 'Courier New', monospace; font-weight: 600;">${maskedCard}</td>
            <td><span class="status-badge ${status === 'Live' ? 'status-success' : status === 'Dead' ? 'status-error' : 'status-warning'}">${status}</span></td>
            <td>${response}</td>
            <td style="color: var(--info);">${gateway}</td>
            <td style="color: var(--text-gray);">${new Date().toLocaleTimeString()}</td>
        `;
        tbody.appendChild(row);

        index++;
        setTimeout(checkNextCard, 1000 + Math.random() * 2000);
    }

    checkNextCard();
}

function startBraintreeCheck() {
    toastManager.info('Coming Soon', 'Braintree checker sẽ được triển khai ở đây');
}

function startShopifyCheck() {
    toastManager.info('Coming Soon', 'Shopify auto checker sẽ được triển khai ở đây');
}

function lookupBIN() {
    const bin = document.getElementById('binNumber').value.trim();
    if (!bin) {
        toastManager.error('Input Required', 'Vui lòng nhập số BIN');
        return;
    }

    toastManager.success('BIN Lookup', `Looking up BIN: ${bin}`);

    document.getElementById('binResults').innerHTML = `
        <h4 style="margin-bottom: 20px; display: flex; align-items: center; gap: 12px; font-size: 1.4rem; font-weight: 700;">
            <i class="fas fa-search" style="background: var(--primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
            Thông tin BIN: ${bin}
        </h4>
        <div class="glass-ultra" style="padding: 30px; border-radius: 20px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
                <div>
                    <h5 style="background: var(--primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 12px; font-size: 1.1rem; font-weight: 700;">Thông tin Ngân hàng</h5>
                    <p style="margin-bottom: 8px;"><strong>Ngân hàng:</strong> Chase Bank</p>
                    <p style="margin-bottom: 8px;"><strong>Quốc gia:</strong> United States</p>
                    <p><strong>Tiền tệ:</strong> USD</p>
                </div>
                <div>
                    <h5 style="color: var(--info); margin-bottom: 12px; font-size: 1.1rem; font-weight: 700;">Chi tiết Thẻ</h5>
                    <p style="margin-bottom: 8px;"><strong>Thương hiệu:</strong> Visa</p>
                    <p style="margin-bottom: 8px;"><strong>Loại:</strong> Credit</p>
                    <p><strong>Cấp độ:</strong> Classic</p>
                </div>
                <div>
                    <h5 style="color: var(--success); margin-bottom: 12px; font-size: 1.1rem; font-weight: 700;">Tính năng</h5>
                    <p style="margin-bottom: 8px;"><strong>Prepaid:</strong> Không</p>
                    <p style="margin-bottom: 8px;"><strong>Commercial:</strong> Không</p>
                    <p><strong>Payroll:</strong> Không</p>
                </div>
            </div>
        </div>
    `;
}

function lookup3DS() {
    toastManager.info('Coming Soon', '3DS lookup sẽ được triển khai ở đây');
}

function start3DSCheck() {
    const card = document.getElementById('threeDSCard').value.trim();
    if (!card) {
        toastManager.error('Input Required', 'Vui lòng nhập số thẻ để kiểm tra 3DS');
        return;
    }
    
    toastManager.info('Checking 3DS', '3DS Security lookup is starting...');
    
    const resultsDiv = document.getElementById('threeDSResults');
    resultsDiv.innerHTML = `
        <h4 style="margin-bottom: 20px; display: flex; align-items: center; gap: 12px; font-size: 1.4rem; font-weight: 700;">
            <i class="fas fa-spinner fa-spin" style="background: var(--primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
            Checking 3DS Status...
        </h4>
        <div class="form-container">
            <p style="color: var(--success); font-weight: 600;">✓ 3D Secure: Enabled</p>
            <p style="color: var(--info);">Bank: Sample Bank</p>
            <p style="color: var(--text-gray);">Country: US</p>
        </div>
    `;
    
    setTimeout(() => {
        toastManager.success('3DS Check Complete', '3DS security status retrieved successfully');
    }, 2000);
}

/* ===== SAMPLE DATA FUNCTIONS ===== */
function loadSampleCards(type) {
    const sampleCards = [
        '4532123456789012|12|2025|123',
        '5555555555554444|01|2026|456',
        '4111111111111111|03|2027|789',
        '4000000000000002|05|2025|321',
        '5105105105105100|08|2026|654'
    ];
    
    const textarea = document.getElementById(type + 'Cards');
    if (textarea) {
        textarea.value = sampleCards.join('\n');
        toastManager.success('Sample Loaded', `Sample cards loaded for ${type}`);
    }
}

function loadSampleBIN() {
    document.getElementById('binNumber').value = '453212';
    toastManager.info('Sample BIN', 'Sample BIN number loaded');
}

function loadSample3DS() {
    document.getElementById('threeDSCard').value = '4532123456789012';
    toastManager.info('Sample Card', 'Sample card number loaded for 3DS lookup');
}

/* ===== UTILITY FUNCTIONS ===== */
function clearResults() {
    document.querySelectorAll('[id$="Results"]').forEach(el => {
        el.innerHTML = '';
    });
    toastManager.success('Results Cleared', 'All results have been cleared');
}

function clearGenerated() {
    document.getElementById('generatedResults').innerHTML = '';
    toastManager.info('Cleared', 'Generated cards cleared');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text.replace(/\\n/g, '\n')).then(() => {
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Đã copy!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
        toastManager.success('Copied', 'Content copied to clipboard!');
    });
}

function downloadCards(cards, type) {
    const blob = new Blob([cards.replace(/\\n/g, '\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-cards-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toastManager.success('Download Started', `${type} cards file downloaded`);
}

/* ===== FORM HANDLING ===== */
function handleSelectFocus() {
    document.querySelectorAll('select').forEach(select => {
        const wrapper = select.closest('.select-wrapper');
        if (!wrapper) return;

        select.addEventListener('focus', () => {
            wrapper.classList.add('focused');
        });

        select.addEventListener('blur', () => {
            wrapper.classList.remove('focused');
        });
    });
}

function toggleApiKey() {
    const input = document.getElementById('apikey');
    const btn = event.target.closest('button');
    const icon = btn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
        toastManager.info('API Key', 'API Key is now visible');
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
        toastManager.info('API Key', 'API Key is now hidden');
    }
}

/* ===== PAYMENT & SETTINGS ===== */
function selectPackage(credits, price) {
    toastManager.success('Package Selected', `Đã chọn: ${credits} credits với giá $${price}`);
}

function processPayment() {
    const method = document.getElementById('paymentMethod').value;
    toastManager.info('Processing Payment', `Đang xử lý thanh toán qua ${method}`);
}

function saveSettings() {
    toastManager.success('Settings Saved', 'Cài đặt đã được lưu thành công!');
}

function resetSettings() {
    if (confirm('Bạn có chắc chắn muốn reset về cài đặt mặc định?')) {
        toastManager.warning('Settings Reset', 'Đã reset cài đặt thành công!');
    }
}

/* ===== DATABASE FUNCTIONS ===== */
function refreshLogs() {
    toastManager.info('Refreshing', 'Đang tải lại dữ liệu system logs...');
    setTimeout(() => {
        toastManager.success('Refreshed', 'System logs đã được cập nhật thành công!');
    }, 2000);
}

function clearLogs() {
    toastManager.warning('Clear Logs', 'This feature will be implemented soon');
}

function generateSampleLogs() {
    toastManager.info('Generating', 'Sample logs will be generated');
}

function importLogs() {
    toastManager.info('Import Logs', 'Chức năng import logs sẽ được triển khai ở đây');
}

function refreshTransactions() {
    toastManager.info('Refreshing', 'Đang tải lại transaction history...');
    setTimeout(() => {
        toastManager.success('Refreshed', 'Transaction history đã được cập nhật!');
    }, 2000);
}

function exportTransactions() {
    toastManager.info('Exporting', 'Transaction export will be implemented');
}

function generateSampleTransactions() {
    toastManager.info('Generating', 'Sample transaction data will be generated');
}

// User action functions
function editUser(id, name) {
    toastManager.info('Edit User', `Đang mở form chỉnh sửa cho user ${name} (ID: ${id})`);
}

function viewUser(id, name) {
    toastManager.success('View User', `Đang xem thông tin chi tiết của user ${name} (ID: ${id})`);
}

function deleteUser(id, name) {
    if (confirm(`Bạn có chắc chắn muốn xóa user ${name} (ID: ${id})?`)) {
        toastManager.warning('Delete User', `User ${name} đã được xóa khỏi hệ thống!`);
    }
}

/* ===== NAVIGATION FUNCTION ===== */
function goToPage(page) {
    const pageUrls = {
        'home': '/web/index',
        'topup': '/web/topup', 
        'settings': '/web/settings',
        'stripe-auth': '/web/checkers/stripe_auth',
        'braintree-auth': '/web/checkers/braintree_auth',
        'shopify-auto': '/web/checkers/shopify_auto',
        'bin-lookup': '/web/tools/bin_lookup',
        '3ds-lookup': '/web/tools/3ds_lookup',
        'card-generator': '/web/tools/card_generator',
        'database-users': '/web/database/users',
        'database-logs': '/web/database/logs',
        'database-transactions': '/web/database/transactions'
    };

    const url = pageUrls[page];
    if (url) {
        toastManager.success('Navigation', `Navigating to ${page.replace('-', ' ').toUpperCase()}`);
        window.location.href = url;
    } else {
        toastManager.error('Error', `Page ${page} not found`);
    }
}

/* ===== TEST FUNCTIONS ===== */
function testToasts() {
    toastManager.success('Success Test', 'This is a success message with longer text to test wrapping!');
    setTimeout(() => {
        toastManager.error('Error Test', 'This is an error message to test the error styling and progress bar!');
    }, 1000);
    setTimeout(() => {
        toastManager.warning('Warning Test', 'This is a warning message to test all toast types!');
    }, 2000);
    setTimeout(() => {
        toastManager.info('Info Test', 'This is an info message to complete the toast testing!');
    }, 3000);
}

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        handleSelectFocus();
        
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            toastManager.success('Welcome!', 'Chào mừng đến với Premium CC Checker!');
        }
    }, 500);
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Make functions globally available
window.logout = logout;
window.isAuthenticated = isAuthenticated;
window.getUserData = getUserData;
window.toastManager = toastManager;
