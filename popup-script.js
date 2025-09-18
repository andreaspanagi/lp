document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('popup-modal');

    function openPopup() {
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function closePopup() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Close popup when clicking on the close button or overlay
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal || event.target.classList.contains('popup-close')) {
                closePopup();
            }
        });
    }

    // Assign closePopup to window to be accessible from inline onclick
    window.closePopup = closePopup;

    // "Cargar más" logic
    let loadMoreCount = 0;
    const maxLoads = 2;

    document.body.addEventListener('click', function(event) {
        const target = event.target;

        // Find the closest ancestor link that is a popup trigger
        const popupTrigger = target.closest('a.open-popup, a[href*="#elementor-action"]');

        if (popupTrigger) {
            // Exclude accordions which might also be links with similar patterns
            if (popupTrigger.closest('.e-n-accordion-item')) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            openPopup();
            return; // Stop further processing for this click
        }

        // Handle "Cargar más" separately and specifically.
        // This is speculative as the element is dynamically loaded.
        const loadMoreTrigger = target.closest('a, button');
        if (loadMoreTrigger && loadMoreTrigger.textContent.includes('Cargar más')) {
            if (loadMoreCount >= maxLoads) {
                event.preventDefault();
                event.stopPropagation();
                console.log('"Cargar más" disabled.');
                // Disable the button to prevent further clicks
                if(loadMoreTrigger.tagName === 'A') {
                    loadMoreTrigger.style.pointerEvents = 'none';
                }
                loadMoreTrigger.style.opacity = '0.5';
            } else {
                loadMoreCount++;
                console.log(`"Cargar más" clicked ${loadMoreCount} time(s).`);
                // Allow the click to proceed for the first two times.
            }
        }
    });
});
