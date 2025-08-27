document.addEventListener('DOMContentLoaded', () => {
    // --- ACT I: THE RIDDLE ---
    const riddleContainer = document.getElementById('riddle-container');
    const riddleInput = document.getElementById('riddle-input');
    const submitButton = document.getElementById('submit-button');
    const feedbackText = document.getElementById('feedback-text');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    const scrollContainer = document.getElementById('scroll-container');

    const triggerHaptic = (pattern) => { if (navigator.vibrate) { navigator.vibrate(pattern); } };

    const checkAnswer = () => {
        const userAnswer = riddleInput.value.trim().toLowerCase();
        const correctAnswer = 'alaa';

        if (userAnswer === correctAnswer) {
            feedbackText.textContent = '...Correct.'; correctSound.play(); triggerHaptic(100);
            riddleContainer.classList.add('solved');
            riddleContainer.addEventListener('animationend', () => {
                riddleContainer.style.display = 'none';
                scrollContainer.style.display = 'block';
            }, { once: true });
        } else {
            feedbackText.textContent = 'stop being a puss, Not even close. Try again.'; wrongSound.play(); triggerHaptic([50, 50, 50]);
            riddleInput.value = '';
        }
    };
    submitButton.addEventListener('click', checkAnswer);
    riddleInput.addEventListener('keyup', (event) => { if (event.key === 'Enter') { checkAnswer(); } });
    riddleInput.focus();

    // --- ACT II & BEYOND: THE SCROLLING JOURNEY ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const finalScene = document.getElementById('final-scene');
    const finalContent = document.getElementById('final-content');
    const finalCaption = document.getElementById('final-caption');
    const finalButton = document.getElementById('final-button');
    const polaroid = document.getElementById('polaroid');

    // --- CHOOSE YOUR DESTINATION! ---
    // Pick ONE and comment out the other.
    const destination = "Cold Spring, NY";
    // const destination = "Beacon";

    const captionText = `Happy Birthday! Your reward is a trip to ${destination}. My treat.`;
    const smsLink = `sms:&body=The prophecy is my destiny. A trip to ${destination} sounds amazing!`;
    const myPhoneNumber = '2014565296'; // <-- IMPORTANT: USE YOUR REAL PHONE NUMBER HERE
    const facetimeLink = `facetime://${myPhoneNumber}`;
    finalCaption.textContent = captionText;
    finalButton.href = smsLink;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If the final scene is visible, trigger its unique animation
                if (entry.target.id === 'final-scene') {
                    finalContent.classList.add('start-animation');
                    polaroid.classList.add('start-animation');
                    // Stop observing once the final animation starts
                    observer.unobserve(finalScene);
                }
            }
        });
    }, { threshold: 0.6 }); // Trigger when 60% of the element is visible

    animatedElements.forEach(el => { observer.observe(el); });
    observer.observe(finalScene); // Make sure to observe the final scene itself
});