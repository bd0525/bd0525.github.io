/**
 * Apple-style intro animation with typewriter effect for Boyuan's Homepage
 * Controls the animation sequence and timing for the intro overlay
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get DOM elements
    const introOverlay = document.getElementById("introOverlay");
    const mainContent = document.getElementById("mainContent");
    const helloText = document.getElementById("helloText");
    const welcomeText = document.getElementById("welcomeText");
    
    // Skip animation if it's already been shown in this session
    if (sessionStorage.getItem('animationShown')) {
        introOverlay.classList.add("hidden");
        mainContent.style.opacity = "1";
        return;
    }
    
    // Store the original text
    const helloContent = "Hello, __";
    const welcomeContent = "Welcome to Boyuan's Homepage";
    
    // Start with empty content
    helloText.textContent = "";
    welcomeText.textContent = "";
    
    // Function to simulate typewriter effect
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        const timer = setInterval(function() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (callback) setTimeout(callback, 500);
            }
        }, speed);
    }
    
    // Full animation sequence
    setTimeout(function() {
        // Type Hello text
        typeWriter(helloText, helloContent, 100, function() {
            // After Hello is typed and a short pause, type Welcome text
            typeWriter(welcomeText, welcomeContent, 70, function() {
                // After both texts are typed, wait a bit before showing the main content
                setTimeout(function() {
                    introOverlay.style.opacity = "0";
                    mainContent.style.opacity = "1";
                    
                    // Remove overlay after fade out
                    setTimeout(function() {
                        introOverlay.classList.add("hidden");
                    }, 500);
                    
                    // Remember that animation has been shown in this session
                    sessionStorage.setItem('animationShown', 'true');
                }, 1000);
            });
        });
    }, 500); // Start animation after a short delay
}); 