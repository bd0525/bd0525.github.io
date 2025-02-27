document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const introOverlay = document.getElementById('introOverlay');
    const mainContent = document.getElementById('mainContent');
    const helloText = document.getElementById('helloText');
    const welcomeText = document.getElementById('welcomeText');
    const skipIntroBtn = document.getElementById('skipIntroBtn');
    
    console.log('Skip button element:', skipIntroBtn); // Debug log
    
    // Make sure skip button is visible
    if (skipIntroBtn) {
        skipIntroBtn.style.display = 'flex';
        skipIntroBtn.style.opacity = '1';
    }
    
    // Text content for typewriter effect
    const helloContent = "Hello\u00A0\u00A0,\u00A0\u00A0\u00A0\u00A0_____";
    const welcomeContent = "Welcome\u00A0 to\u00A0 Boyuan's\u00A0 Homepage";
    
    // Function to skip intro and show main content
    function skipIntro() {
        console.log('Skip intro function called'); // Debug log
        
        // Immediately stop any ongoing animations
        helloText.style.animation = '';
        welcomeText.style.animation = '';
        
        // Reset text elements
        const helloTextElement = helloText.querySelector('.typewriter-text');
        const welcomeTextElement = welcomeText.querySelector('.typewriter-text');
        
        if (helloTextElement) helloTextElement.textContent = '';
        if (welcomeTextElement) welcomeTextElement.textContent = '';
        
        // Hide skip button
        skipIntroBtn.style.opacity = '0';
        setTimeout(() => {
            skipIntroBtn.style.display = 'none';
        }, 300);
        
        // Fade out the overlay with the white transition
        introOverlay.style.opacity = '0';
        
        // Show main content after a delay
        setTimeout(() => {
            introOverlay.style.display = 'none';
            mainContent.style.opacity = '1';
        }, 800);
    }
    
    // Add click event listener to skip button
    if (skipIntroBtn) {
        console.log('Adding click event listener to skip button');
        skipIntroBtn.addEventListener('click', function(event) {
            console.log('Skip button clicked!');
            skipIntro();
        });
    } else {
        console.error('Skip button element not found!');
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
        // First animation: Hello, world
        typeWriter(helloText, helloContent, 100, 500, () => {
            // Fade out the first text
            setTimeout(() => {
                fadeOut(helloText, () => {
                    // Second animation: Welcome text
                    setTimeout(() => {
                        typeWriter(welcomeText, welcomeContent, 80, 0, () => {
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
                                        }, 800);
                                    }, 500);
                                });
                            }, 1200);
                        });
                    }, 300);
                });
            }, 1000);
        });
    }
    
    // Start the animation sequence
    startAnimation();
}); 