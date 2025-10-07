import { showSpinner } from './helpers/spinner.js';

$(function () {

    // EVENTOS CLICK
    $(document).on('click', '.link-item a', function() {
        showSpinner( 2800 );
    })

    $(document).on('click', '.logo img', function () {

        if ($('.profile').is(':hidden')) {
            $('.profile').fadeIn(120);
        } else {
            $('.profile').fadeOut(120);
        }
    })
})
