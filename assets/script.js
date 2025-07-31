let currentPage = 'home';

// Toast System
class ToastManager {
    constructor() {
        this.container = document.getElementById('toastContainer');
        this.toasts = [];
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

const toastManager = new ToastManager();

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

// Modal functions
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

    
    // HIGHLIGHT NAVIGATION WHEN MODAL OPENS
    
    // TRIGGER FOCUS RING for Checkers/Tools
    const desktopNav = document.querySelector(`.nav-link[data-page="${type}"]`);
    const bottomNav = document.querySelector(`.bottom-nav-item[data-page="${type}"]`);
    
    if (desktopNav) {
        desktopNav.focus();
    }
    if (bottomNav) {
        bottomNav.focus();
    }
    
    highlightNavigation(type);


    // Removed toast notification for cleaner UX
}

// Function to highlight navigation items (USE CSS CLASSES FOR GLOW EFFECT)
function highlightNavigation(section) {
    
    // Remove all active states first
    const allNavElements = document.querySelectorAll('.nav-link, .bottom-nav-item');
    
    allNavElements.forEach(el => {
        el.classList.remove('active');
        // Clear any inline styles
        el.style.cssText = '';
    });
    
    // Find and highlight the correct navigation elements (BOTH desktop and mobile)
    const activeElements = document.querySelectorAll(`[data-page="${section}"]`);
    
    if (activeElements.length > 0) {
        activeElements.forEach((element, index) => {
            // USE CSS CLASSES ONLY - Let CSS handle the glow effects
            element.classList.add('active');
        });
    }
    
    // FORCE CHECK: Manually verify highlighting for checkers/tools
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
    
    // Final verification
    const finalActiveElements = document.querySelectorAll('.nav-link.active, .bottom-nav-item.active');
    finalActiveElements.forEach((el, index) => {
        // console.log(`   [${index + 1}] ${el.tagName}[data-page="${el.getAttribute('data-page')}"] - CSS glow active`);
    });
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
    
    // REMOVE HIGHLIGHT WHEN MODAL CLOSES (CLEAR CSS CLASSES FOR GLOW EFFECT)
    const allNavElements = document.querySelectorAll('.nav-link, .bottom-nav-item');
    allNavElements.forEach(el => {
        el.classList.remove('active');
        // Clear any inline styles
        el.style.cssText = '';
    });
    // console.log(`🌟 All navigation glow effects cleared via CSS classes`);
    
    // Re-highlight the current page if we're on a specific page
    if (typeof currentPage !== 'undefined' && currentPage !== 'home') {
        setTimeout(() => {
            if (typeof setActiveNavigation === 'function') {
                setActiveNavigation(currentPage);
            }
        }, 100);
    }
    
    // Removed toast notification for cleaner UX
}

function selectModalItem(itemId) {
    closeModal();
    goToPage(itemId);
    // Removed toast notification for cleaner UX
}

// Sample data functions
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

// Checker functions
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
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
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
        
        // Simulate random results
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

// Removed duplicate generateCards function to prevent conflicts

function clearResults() {
    document.querySelectorAll('[id$="Results"]').forEach(el => {
        el.innerHTML = '';
    });
    toastManager.success('Results Cleared', 'All results have been cleared');
}

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

function logout() {
    toastManager.info('Logging out', 'Đang đăng xuất...');
    setTimeout(() => {
        window.location.href = '/web/index';
    }, 1000);
}

// Database functions
function refreshLogs() {
    toastManager.info('Refreshing', 'Đang tải lại dữ liệu system logs...');
    setTimeout(() => {
        toastManager.success('Refreshed', 'System logs đã được cập nhật thành công!');
    }, 2000);
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

// Handle select focus states
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

// Demo function to test all toast types
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

// Navigation function
function goToPage(page) {
    // Define page mappings with root-relative paths
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

    // Get the URL for the page
    const url = pageUrls[page];
    if (url) {
        // Show navigation toast
        toastManager.success('Navigation', `Navigating to ${page.replace('-', ' ').toUpperCase()}`);
        
        // Redirect to the actual page using absolute path
        window.location.href = url;
    } else {
        toastManager.error('Error', `Page ${page} not found`);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        handleSelectFocus();
        
        // Only show welcome toast on home page
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

// Additional functions for new pages
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



function clearGenerated() {
    document.getElementById('generatedResults').innerHTML = '';
    toastManager.info('Cleared', 'Generated cards cleared');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        toastManager.success('Copied!', 'Cards copied to clipboard');
    });
}

function refreshLogs() {
    toastManager.info('Refreshing', 'Refreshing system logs...');
}

function clearLogs() {
    toastManager.warning('Clear Logs', 'This feature will be implemented soon');
}

function generateSampleLogs() {
    toastManager.info('Generating', 'Sample logs will be generated');
}

function refreshTransactions() {
    toastManager.info('Refreshing', 'Refreshing transaction data...');
}

function exportTransactions() {
    toastManager.info('Exporting', 'Transaction export will be implemented');
}

function generateSampleTransactions() {
    toastManager.info('Generating', 'Sample transaction data will be generated');
}

// ===== CARD GENERATOR FUNCTIONS =====

// Global variables for card generator
let generatedCards = [];
let cardData = [];

// Auto-detect card type from BIN
function detectCardType(bin) {
    if (!bin) return 'visa';
    
    const binStr = bin.toString();
    
    if (binStr.startsWith('34') || binStr.startsWith('37')) {
        return 'amex';
    }
    
    if (binStr.startsWith('35')) {
        return 'jcb';
    }
    
    if (binStr.startsWith('4')) {
        return 'visa';
    }
    
    if (binStr.startsWith('5') || (parseInt(binStr.substring(0, 4)) >= 2221 && parseInt(binStr.substring(0, 4)) <= 2720)) {
        return 'mastercard';
    }
    
    if (binStr.startsWith('6011') || binStr.startsWith('622') || binStr.startsWith('64') || binStr.startsWith('65')) {
        return 'discover';
    }
    
    if (binStr.startsWith('30') || binStr.startsWith('36') || binStr.startsWith('38') || binStr.startsWith('39')) {
        return 'diners';
    }
    
    return 'visa';
}

// Get card info based on type
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

// Generate random CVV based on card type
function generateRandomCVV(cardType) {
    const cardInfo = getCardInfo(cardType);
    const maxCVV = Math.pow(10, cardInfo.cvvLength) - 1;
    return Math.floor(Math.random() * (maxCVV + 1)).toString().padStart(cardInfo.cvvLength, '0');
}

// Update card info based on BIN input
function updateCardInfo() {
    const binInput = document.getElementById('binNumber');
    if (!binInput) return;
    
    const bin = binInput.value.trim();
    if (bin) {
        const detectedCardType = detectCardType(bin);
        const cardInfo = getCardInfo(detectedCardType);
        
        // Update placeholder with detected info
        binInput.placeholder = `${bin} (${detectedCardType.toUpperCase()} - ${cardInfo.length} digits, ${cardInfo.cvvLength} CVV)`;
    } else {
        binInput.placeholder = '453212 (VISA - 16 digits, 3 CVV)';
    }
}

// Generate random PAN (Personal Account Number)
function generatePAN(bin, cardType) {
    try {
        const cardInfo = getCardInfo(cardType);
        let pan = bin;
        
        // Calculate remaining length needed
        const remainingLength = cardInfo.length - bin.length;
        
        // Generate random digits for remaining positions (excluding check digit)
        for (let i = 0; i < remainingLength - 1; i++) {
            pan += Math.floor(Math.random() * 10);
        }
        
        // Add check digit using Luhn algorithm
        pan += generateCheckDigit(pan);
        
        return pan;
    } catch (error) {
        console.error('Error in generatePAN:', error);
        // Fallback
        let fallback = bin;
        while (fallback.length < 16) {
            fallback += Math.floor(Math.random() * 10);
        }
        return fallback.substring(0, 16);
    }
}

// Generate check digit using Luhn algorithm
function generateCheckDigit(number) {
    let sum = 0;
    let isEven = false;
    
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return (10 - (sum % 10)) % 10;
}

// Generate random month
function generateRandomMonth() {
    return (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
}

// Generate random year
function generateRandomYear() {
    const years = ['25', '26', '27', '28', '29', '30', '31', '32', '33'];
    return years[Math.floor(Math.random() * years.length)];
}

// Main card generation function
function generateCards() {
    try {
        const bin = document.getElementById('binNumber').value.trim();
        const monthType = document.getElementById('monthType').value;
        const yearType = document.getElementById('yearType').value;
        const cvvInput = document.getElementById('cvvInput').value.trim();
        const format = document.getElementById('outputFormat').value;
        const quantity = parseInt(document.getElementById('quantity').value) || 10;
        
        if (!bin) {
            toastManager.error('BIN Required', 'Please enter a BIN number');
            return;
        }
        
        if (quantity < 1 || quantity > 1000) {
            toastManager.error('Invalid Quantity', 'Quantity must be between 1 and 1000');
            return;
        }
        
        // Auto-detect card type
        const detectedCardType = detectCardType(bin);
        
        // Clear previous results
        generatedCards = [];
        cardData = [];
        
        // Generate cards
        for (let i = 0; i < quantity; i++) {
            const pan = generatePAN(bin, detectedCardType);
            
            // Generate expiry date
            const month = monthType === 'random' ? generateRandomMonth() : monthType;
            const year = yearType === 'random' ? generateRandomYear() : yearType;
            
            // Generate CVV
            const cvv = cvvInput || generateRandomCVV(detectedCardType);
            
            // Create card data object
            const card = {
                card_number: pan,
                expiration_month: month,
                expiration_year: year,
                cvv: cvv
            };
            
            cardData.push(card);
            
            // Format output based on selected format
            let formattedCard;
            switch (format) {
                case 'pipe':
                    formattedCard = `${pan}|${month}|${year}|${cvv}`;
                    break;
                case 'csv':
                    formattedCard = `${pan},${month},${year},${cvv}`;
                    break;
                case 'json':
                    formattedCard = JSON.stringify(card);
                    break;
                default:
                    formattedCard = `${pan}|${month}|${year}|${cvv}`;
            }
            
            generatedCards.push(formattedCard);
        }
        
        // Display results
        displayResults();
        toastManager.success('Cards Generated', `Successfully generated ${quantity} ${detectedCardType.toUpperCase()} cards`);
        
    } catch (error) {
        console.error('Generate cards error:', error);
        toastManager.error('Generation Error', 'Error generating cards: ' + error.message);
    }
}

// Display generated results
function displayResults() {
    const resultsSection = document.getElementById('resultsSection');
    const generatedCardsDiv = document.getElementById('generatedCards');
    
    if (!resultsSection || !generatedCardsDiv) {
        toastManager.error('Display Error', 'Results elements not found');
        return;
    }
    
    resultsSection.style.display = 'block';
    
    // Display raw output only
    const displayText = generatedCards.join('\n');
    generatedCardsDiv.textContent = displayText;
}

// Copy results to clipboard
function copyResults() {
    if (generatedCards.length === 0) {
        toastManager.error('Copy Error', 'No cards to copy');
        return;
    }

    const textToCopy = generatedCards.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
        toastManager.success('Copied', 'Cards copied to clipboard');
    }).catch(() => {
        toastManager.error('Copy Error', 'Failed to copy to clipboard');
    });
}

// Download results as file
function downloadResults() {
    if (generatedCards.length === 0) {
        toastManager.error('Download Error', 'No cards to download');
        return;
    }

    const format = document.getElementById('outputFormat').value;
    const textToDownload = generatedCards.join('\n');
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    let filename = 'generated_cards';
    switch(format) {
        case 'csv':
            filename += '.csv';
            break;
        case 'json':
            filename += '.json';
            break;
        default:
            filename += '.txt';
    }
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toastManager.success('Downloaded', 'Cards downloaded successfully');
}

// Copy single card
function copySingleCard(cardText) {
    navigator.clipboard.writeText(cardText).then(() => {
        toastManager.success('Copied', 'Card copied to clipboard');
    }).catch(() => {
        toastManager.error('Copy Error', 'Failed to copy card');
    });
}
// Card Generator JavaScript

// Global variables
let generatedCards = [];
let cardData = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCardInfo();
});

// Auto-detect card type from BIN
function detectCardType(bin) {
    if (!bin) return 'visa';
    
    const binStr = bin.toString();
    
    if (binStr.startsWith('34') || binStr.startsWith('37')) {
        return 'amex';
    }
    
    if (binStr.startsWith('35')) {
        return 'jcb';
    }
    
    if (binStr.startsWith('4')) {
        return 'visa';
    }
    
    if (binStr.startsWith('5') || (parseInt(binStr.substring(0, 4)) >= 2221 && parseInt(binStr.substring(0, 4)) <= 2720)) {
        return 'mastercard';
    }
    
    if (binStr.startsWith('6011') || binStr.startsWith('622') || binStr.startsWith('64') || binStr.startsWith('65')) {
        return 'discover';
    }
    
    if (binStr.startsWith('30') || binStr.startsWith('36') || binStr.startsWith('38') || binStr.startsWith('39')) {
        return 'diners';
    }
    
    return 'visa';
}

// Get card info based on type
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

// Generate random CVV based on card type
function generateRandomCVV(cardType) {
    const cardInfo = getCardInfo(cardType);
    const maxCVV = Math.pow(10, cardInfo.cvvLength) - 1;
    return Math.floor(Math.random() * (maxCVV + 1)).toString().padStart(cardInfo.cvvLength, '0');
}

// Update card info based on BIN input
function updateCardInfo() {
    const binInput = document.getElementById('binNumber');
    if (!binInput) return;
    
    const bin = binInput.value.trim();
    if (bin) {
        const detectedCardType = detectCardType(bin);
        const cardInfo = getCardInfo(detectedCardType);
        
        // Update placeholder with detected info
        binInput.placeholder = `${bin} (${detectedCardType.toUpperCase()} - ${cardInfo.length} digits, ${cardInfo.cvvLength} CVV)`;
    } else {
        binInput.placeholder = '453212 (VISA - 16 digits, 3 CVV)';
    }
}

// Generate random PAN (Personal Account Number)
function generatePAN(bin, cardType) {
    try {
        const cardInfo = getCardInfo(cardType);
        let pan = bin;
        
        // Calculate remaining length needed
        const remainingLength = cardInfo.length - bin.length;
        
        // Generate random digits for remaining positions (excluding check digit)
        for (let i = 0; i < remainingLength - 1; i++) {
            pan += Math.floor(Math.random() * 10);
        }
        
        // Add check digit using Luhn algorithm
        pan += generateCheckDigit(pan);
        
        return pan;
    } catch (error) {
        console.error('Error in generatePAN:', error);
        // Fallback
        let fallback = bin;
        while (fallback.length < 16) {
            fallback += Math.floor(Math.random() * 10);
        }
        return fallback.substring(0, 16);
    }
}

// Generate check digit using Luhn algorithm
function generateCheckDigit(number) {
    let sum = 0;
    let isEven = false;
    
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return (10 - (sum % 10)) % 10;
}

// Generate random month
function generateRandomMonth() {
    return (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
}

// Generate random year
function generateRandomYear() {
    const years = ['25', '26', '27', '28', '29', '30', '31', '32', '33'];
    return years[Math.floor(Math.random() * years.length)];
}

// Main card generation function
function generateCards() {
    try {
        const bin = document.getElementById('binNumber').value.trim();
        const monthType = document.getElementById('monthType').value;
        const yearType = document.getElementById('yearType').value;
        const cvvInput = document.getElementById('cvvInput').value.trim();
        const format = document.getElementById('outputFormat').value;
        const quantity = parseInt(document.getElementById('quantity').value) || 10;
        
        if (!bin) {
            toastManager.error('BIN Required', 'Please enter a BIN number');
            return;
        }
        
        if (quantity < 1 || quantity > 1000) {
            toastManager.error('Invalid Quantity', 'Quantity must be between 1 and 1000');
            return;
        }
        
        // Auto-detect card type
        const detectedCardType = detectCardType(bin);
        
        // Clear previous results
        generatedCards = [];
        cardData = [];
        
        // Generate cards
        for (let i = 0; i < quantity; i++) {
            const pan = generatePAN(bin, detectedCardType);
            
            // Generate expiry date
            const month = monthType === 'random' ? generateRandomMonth() : monthType;
            const year = yearType === 'random' ? generateRandomYear() : yearType;
            
            // Generate CVV
            const cvv = cvvInput || generateRandomCVV(detectedCardType);
            
            // Create card data object
            const card = {
                card_number: pan,
                expiration_month: month,
                expiration_year: year,
                cvv: cvv
            };
            
            cardData.push(card);
            
            // Format output based on selected format
            let formattedCard;
            switch (format) {
                case 'pipe':
                    formattedCard = `${pan}|${month}|${year}|${cvv}`;
                    break;
                case 'csv':
                    formattedCard = `${pan},${month},${year},${cvv}`;
                    break;
                case 'json':
                    formattedCard = JSON.stringify(card);
                    break;
                default:
                    formattedCard = `${pan}|${month}|${year}|${cvv}`;
            }
            
            generatedCards.push(formattedCard);
        }
        
        // Display results
        displayResults();
        toastManager.success('Cards Generated', `Successfully generated ${quantity} ${detectedCardType.toUpperCase()} cards`);
        
    } catch (error) {
        console.error('Generate cards error:', error);
        toastManager.error('Generation Error', 'Error generating cards: ' + error.message);
    }
}

// Display generated results
function displayResults() {
    const resultsSection = document.getElementById('resultsSection');
    const generatedCardsDiv = document.getElementById('generatedCards');
    
    if (!resultsSection || !generatedCardsDiv) {
        toastManager.error('Display Error', 'Results elements not found');
        return;
    }
    
    resultsSection.style.display = 'block';
    
    // Display raw output only
    const displayText = generatedCards.join('\n');
    generatedCardsDiv.textContent = displayText;
}

// Copy results to clipboard
function copyResults() {
    if (generatedCards.length === 0) {
        toastManager.error('Copy Error', 'No cards to copy');
        return;
    }

    const textToCopy = generatedCards.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
        toastManager.success('Copied', 'Cards copied to clipboard');
    }).catch(() => {
        toastManager.error('Copy Error', 'Failed to copy to clipboard');
    });
}

// Download results as file
function downloadResults() {
    if (generatedCards.length === 0) {
        toastManager.error('Download Error', 'No cards to download');
        return;
    }

    const format = document.getElementById('outputFormat').value;
    const textToDownload = generatedCards.join('\n');
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    let filename = 'generated_cards';
    switch(format) {
        case 'csv':
            filename += '.csv';
            break;
        case 'json':
            filename += '.json';
            break;
        default:
            filename += '.txt';
    }
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toastManager.success('Downloaded', 'Cards downloaded successfully');
}

// Copy single card
function copySingleCard(cardText) {
    navigator.clipboard.writeText(cardText).then(() => {
        toastManager.success('Copied', 'Card copied to clipboard');
    }).catch(() => {
        toastManager.error('Copy Error', 'Failed to copy card');
    });
}