document.addEventListener('DOMContentLoaded', function () {
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupButton = document.getElementById('close-popup');
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            if (this.classList.contains('no-popup')) {
                return;
            }

            event.preventDefault();
            popupOverlay.style.display = 'flex';
        });
    });

    closePopupButton.addEventListener('click', function () {
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', function (event) {
        if (event.target === this) {
            popupOverlay.style.display = 'none';
        }
    });
});
