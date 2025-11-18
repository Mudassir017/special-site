document.addEventListener('DOMContentLoaded', () => {
    // --- Elements Selection ---
    const revealButton = document.getElementById('reveal-button');
    const messageSection = document.getElementById('love-message-section');
    const nextStepButton = document.getElementById('next-step-button');
    const proposalSection = document.getElementById('proposal-section');
    const confessionSection = document.getElementById('love-confession-section'); // NEW
    const music = document.getElementById('background-music');
    const heartsContainer = document.querySelector('.hearts-container');
    
    // Proposal Elements
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const noPopup = document.getElementById('no-popup');
    const tryAgainButton = document.getElementById('try-again-button'); 
    
    // --- State Variables ---
    let heartIntervalId = null; 
    let noClickCount = 0; 
    
    // Persistent messages for the 'No' button
    const persistentMessages = [
        "Please, don't break my heart! 💔 I promise to always keep you happy!",
        "I swear, I will always **treat you like royalty**! Say yes, my love! ❤️",
        "Come on! Just think about it one more time... maybe that was a mistake! 😉",
        "I will agree to your every wish, just say 'YES' this once! 🙏",
        "This button is only for 'YES'! Tapping 'No' is strictly forbidden! 🤫"
    ];

    // --- Page 1 to Page 2 (Message Reveal) ---
    revealButton.addEventListener('click', () => {
        document.getElementById('initial-page').style.display = 'none';
        messageSection.classList.add('show');
        music.play().catch(error => { console.log('Music Autoplay failed:', error); });
        startHearts();
        
        setTimeout(() => {
            nextStepButton.classList.remove('hidden-step');
            nextStepButton.style.pointerEvents = 'auto'; 
        }, 8000); 
    });

    // --- Page 2 to Page 3 (Proposal Reveal) ---
    nextStepButton.addEventListener('click', () => {
        messageSection.classList.remove('show');
        messageSection.style.display = 'none';
        
        proposalSection.classList.add('show'); 
        
        stopHearts(); 
    });

    // --- Proposal Logic: YES Button (The New Confession) ---
    yesButton.addEventListener('click', () => {
        // 1. Hide the proposal section
        proposalSection.classList.remove('show');
        proposalSection.style.display = 'none';
        
        // 2. Show the new confession section
        confessionSection.classList.add('show-confession');
        
        // 3. Restart hearts for celebration!
        startHearts();
    });

    // --- Proposal Logic: NO Button (The persistent trickster) ---
    noButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        noClickCount++;
        const messageIndex = (noClickCount - 1) % persistentMessages.length; 
        
        document.getElementById('no-popup-text').innerHTML = persistentMessages[messageIndex];
        
        noPopup.style.display = 'block'; 
        noPopup.classList.add('show-popup');

        noButton.style.transform = `translateY(-5px) rotate(2deg)`;
        
        setTimeout(() => {
            noButton.style.transform = 'translate(0, 0)';
        }, 300);
    });

    // --- Try Again Button Logic (on the popup) ---
    tryAgainButton.addEventListener('click', () => {
        noPopup.classList.remove('show-popup');
        noPopup.style.display = 'none'; 
        
        noButton.style.position = 'static';
        noButton.style.transform = 'none';
    });
    
    // --- Heart Animation Functions (Utility) ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '&#10084;';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 4 + 6 + 's';
        heart.style.fontSize = Math.random() * 1.5 + 1.5 + 'em'; 
        
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    function startHearts() {
        if (!heartIntervalId) {
             heartIntervalId = setInterval(createHeart, 300);
        }
    }
    
    function stopHearts() {
        if (heartIntervalId) {
            clearInterval(heartIntervalId);
            heartIntervalId = null;
            heartsContainer.innerHTML = ''; 
        }
    }
});
