let currentCallback = null;

function setHeader(header) {
    $('.header-modal').html(`<h5>${header}</h5>`);
}

function setMessage(message) {
    $('.message-modal').html(`<p>${message}</p>`);
}

function closeModal() {
    $('.modal-accept-overlay').removeClass('active');
    currentCallback = null;
}

function setupEventListeners() {
    $('.btn-option-yes').off('click').on('click', function() {
        if (currentCallback) {
            currentCallback(true);
        }
        closeModal();
    });

    $('.btn-option-no').off('click').on('click', function() {
        if (currentCallback) {
            currentCallback(false);
        }
        closeModal();
    });
}

export function initModal(header, message, callback) {
    setHeader(header);
    setMessage(message);
    currentCallback = callback;
    $('.modal-accept-overlay').addClass('active');
    setupEventListeners();
}

// Inicializar eventos cuando el DOM esté listo
$(function() {
    setupEventListeners();
});

