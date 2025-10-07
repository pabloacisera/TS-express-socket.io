$(function() {
    let inputSearch = $('#searchTerm');
    let modalOverlay = $('.modal-overlay');
    let closeModal = $('.header-modal');

    /**
     *  EVENTO CLICK
     */
    inputSearch.on('click', function() {
        modalOverlay.addClass('active');
    })

    closeModal.on('click', function() {
        modalOverlay.removeClass('active');
    })
})
