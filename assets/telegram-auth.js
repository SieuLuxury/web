// Simple Telegram Authentication for Checker
// This file provides basic auth functions without conflicting with navigation-loader.js

// Global logout function
function logout() {
    localStorage.removeItem('telegram_auth');
    window.location.href = '/web/login.html';
}

// Check if user is authenticated (used by other scripts)
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

// Make functions globally available
window.logout = logout;
window.isAuthenticated = isAuthenticated;
window.getUserData = getUserData;