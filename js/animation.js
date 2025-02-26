/**
 * Apple-style intro animation for Boyuan's Homepage
 * Controls the animation sequence and timing for the intro overlay
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get DOM elements
    const introOverlay = document.getElementById("introOverlay");
    const mainContent = document.getElementById("mainContent");
    
    // Skip animation if it's already been shown in this session
    if (sessionStorage.getItem('animationShown')) {
        introOverlay.classList.add("hidden");
        mainContent.classList.add("animated-content");
        mainContent.style.opacity = "1";
        return;
    }
    
    // Show the main content after the animation completes
    setTimeout(() => {
        introOverlay.style.opacity = "0";
        mainContent.style.opacity = "1";
        
        // Remove the overlay after fade out
        setTimeout(() => {
            introOverlay.classList.add("hidden");
        }, 500);
        
        // Set flag in session storage so animation only shows once per session
        sessionStorage.setItem('animationShown', 'true');
    }, 3500); // Total animation duration: ~3.5 seconds
}); 