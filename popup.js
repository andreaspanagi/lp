document.addEventListener('DOMContentLoaded', function () {
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupButton = document.getElementById('close-popup');
    const links = document.querySelectorAll('a, summary');
    let navigateUrl = null;
    let cargarMasCounter = 0;

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            const isLeerMas = this.classList.contains('no-popup');
            const isCargarMas = this.innerText.trim().toLowerCase() === 'cargar más';

            if (isLeerMas) {
                // Don't prevent default, just show popup
                popupOverlay.style.display = 'flex';
                navigateUrl = null; // Don't navigate on close
                return;
            }

            if (isCargarMas) {
                if (cargarMasCounter < 2) {
                    cargarMasCounter++;
                    // Don't prevent default, just show popup
                    popupOverlay.style.display = 'flex';
                    navigateUrl = null; // Don't navigate on close
                    return;
                }
            }

            event.preventDefault();
            navigateUrl = this.href;
            popupOverlay.style.display = 'flex';
        });
    });

    function closePopup() {
        popupOverlay.style.display = 'none';
        if (navigateUrl) {
            window.location.href = navigateUrl;
            navigateUrl = null; // Reset for next time
        }
    }

    closePopupButton.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', function (event) {
        if (event.target === this) {
            closePopup();
        }
    });
});
