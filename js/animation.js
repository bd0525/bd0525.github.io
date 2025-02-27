document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const introOverlay = document.getElementById('introOverlay');
    const mainContent = document.getElementById('mainContent');
    const helloText = document.getElementById('helloText');
    const welcomeText = document.getElementById('welcomeText');
    const progressBar = document.getElementById('introProgressBar');
    
    // Debug check for progress bar
    if (!progressBar) {
        console.error('Progress bar element not found! Check if the ID is correct.');
    } else {
        console.log('Progress bar found:', progressBar);
        // Force the progress bar to be empty but visible
        progressBar.style.width = '0%';
    }
    
    // Animation timing variables (in milliseconds)
    const initialDelay = 500;
    const typingDelayHello = 100;
    const pauseAfterHello = 1000;
    const transitionDelay = 300;
    const typingDelayWelcome = 80;
    const pauseBeforeEnd = 1200;
    const overlayFadeDelay = 500;
    const finalDelay = 800;
    
    // Text content for typewriter effect
    const helloContent = "Hello\u00A0\u00A0,\u00A0\u00A0\u00A0\u00A0_____";
    const welcomeContent = "Welcome to Boyuan's Homepage";
    
    // Calculate total animation duration for progress bar
    const calculateTotalDuration = () => {
        const helloTypingDuration = typingDelayHello * helloContent.length;
        const welcomeTypingDuration = typingDelayWelcome * welcomeContent.length;
        const totalDuration = initialDelay + helloTypingDuration + 1000 + pauseAfterHello + 500 /* fadeOut */ + 
                            transitionDelay + welcomeTypingDuration + 1000 + pauseBeforeEnd + 500 /* fadeOut */ + 
                            overlayFadeDelay + finalDelay;
        return totalDuration;
    };
    
    const totalDuration = calculateTotalDuration();
    
    // Simplified progress bar animation that's independent of the animation sequence
    // This ensures the progress bar will always fill completely
    function animateProgressBar() {
        // Use a separate animation to ensure the progress bar fills smoothly
        let startTime = Date.now();
        let progress = 0;
        
        function updateProgress() {
            const elapsed = Date.now() - startTime;
            progress = Math.min((elapsed / totalDuration) * 100, 100);
            
            // Directly set the width for more reliable updating
            progressBar.style.width = `${progress}%`;
            
            if (progress < 100) {
                // Continue updating at 30fps
                setTimeout(updateProgress, 33);
            } else {
                console.log('Progress bar animation completed');
            }
        }
        
        // Start with a visible but empty progress bar
        progressBar.style.width = '0%';
        progressBar.style.display = 'block';
        
        // Start the progress animation
        updateProgress();
    }
    
    // Typewriter effect function
    function typeWriter(element, text, speed, startDelay = 0, callback = null) {
        // First, ensure we have the right structure:
        // Check if typewriter container exists, if not create it
        let container = element.querySelector('.typewriter-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'typewriter-container';
            
            // Find or create the text element
            let textElement = element.querySelector('.typewriter-text');
            if (!textElement) {
                textElement = document.createElement('span');
                textElement.className = 'typewriter-text';
                container.appendChild(textElement);
            } else {
                // Move existing text element into container
                element.removeChild(textElement);
                container.appendChild(textElement);
            }
            
            // Find or create the cursor element
            let cursor = element.querySelector('.cursor');
            if (!cursor) {
                cursor = document.createElement('span');
                cursor.className = 'cursor';
                container.appendChild(cursor);
            } else {
                // Move existing cursor into container
                element.removeChild(cursor);
                container.appendChild(cursor);
            }
            
            element.appendChild(container);
        }
        
        const textElement = container.querySelector('.typewriter-text');
        const cursor = container.querySelector('.cursor');
        
        // Reset text
        textElement.textContent = '';
        
        // Ensure container has proper style
        container.style.display = 'inline-flex';
        container.style.whiteSpace = 'nowrap';
        
        // Show the element with fade-in animation
        setTimeout(() => {
            element.style.animation = 'fadeIn 0.5s forwards ease-out';
            
            let i = 0;
            // Start typing after specified delay
            setTimeout(function type() {
                if (i < text.length) {
                    textElement.textContent = text.substring(0, i + 1);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // When typing is complete
                    if (callback) {
                        setTimeout(callback, 1000);
                    }
                }
            }, startDelay);
        }, 100);
    }
    
    // Fade out function
    function fadeOut(element, callback = null) {
        element.style.animation = 'fadeOut 0.5s forwards ease-in';
        
        if (callback) {
            setTimeout(callback, 500);
        }
    }
    
    // Animation sequence
    function startAnimation() {
        // Make sure progress bar is initially visible but empty
        progressBar.style.width = '0%';
        
        // Start the progress bar animation separately from main animation
        animateProgressBar();
        
        // First animation: Hello, world
        typeWriter(helloText, helloContent, typingDelayHello, initialDelay, () => {
            // Fade out the first text
            setTimeout(() => {
                fadeOut(helloText, () => {
                    // Second animation: Welcome text
                    setTimeout(() => {
                        typeWriter(welcomeText, welcomeContent, typingDelayWelcome, 0, () => {
                            // Pause before ending intro
                            setTimeout(() => {
                                fadeOut(welcomeText, () => {
                                    // Fade out the overlay
                                    setTimeout(() => {
                                        introOverlay.style.opacity = '0';
                                        
                                        // Show main content
                                        setTimeout(() => {
                                            introOverlay.style.display = 'none';
                                            mainContent.style.opacity = '1';
                                        }, finalDelay);
                                    }, overlayFadeDelay);
                                });
                            }, pauseBeforeEnd);
                        });
                    }, transitionDelay);
                });
            }, pauseAfterHello);
        });
    }
    
    // Start the animation sequence
    startAnimation();
}); 