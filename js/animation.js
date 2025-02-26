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
        mainContent.classList.add("animated-content");
        mainContent.style.opacity = "1";
        return;
    }
    
    // Set initial content (will be typed out by animation)
    const helloContent = helloText.textContent;
    const welcomeContent = welcomeText.textContent;
    
    // Clear text content so typing animation starts from empty
    helloText.textContent = "";
    welcomeText.textContent = "";
    
    // Manually type hello text
    let helloIndex = 0;
    function typeHello() {
        if (helloIndex < helloContent.length) {
            helloText.textContent += helloContent.charAt(helloIndex);
            helloIndex++;
            setTimeout(typeHello, 100); // Typing speed
        } else {
            // Start welcome text typing after hello is complete
            setTimeout(typeWelcome, 1000); // 1 second pause before welcome
        }
    }
    
    // Manually type welcome text
    let welcomeIndex = 0;
    function typeWelcome() {
        if (welcomeIndex < welcomeContent.length) {
            welcomeText.textContent += welcomeContent.charAt(welcomeIndex);
            welcomeIndex++;
            setTimeout(typeWelcome, 70); // Typing speed (slightly faster)
        } else {
            // Finish animation and show main content after welcome typing is done
            setTimeout(finishAnimation, 1000); // Wait 1 second after typing completes
        }
    }
    
    // Function to end animation and show main content
    function finishAnimation() {
        introOverlay.style.opacity = "0";
        mainContent.style.opacity = "1";
        
        // Remove the overlay after fade out
        setTimeout(() => {
            introOverlay.classList.add("hidden");
        }, 500);
        
        // Set flag in session storage so animation only shows once per session
        sessionStorage.setItem('animationShown', 'true');
    }
    
    // Start typing animation
    setTimeout(typeHello, 500); // Start after a short delay
}); 