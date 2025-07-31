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