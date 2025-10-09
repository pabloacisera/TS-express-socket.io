// home_layout.js
import { continueStepClient } from './helpers/stepAccess.js';

$(document).ready(function() {
    $('#step-client').on('click', function(e) {
        e.preventDefault();
        continueStepClient( 'selectedProducts', '/facturation/clients');
    });

    $('#step-pay').on('click', function(e) {
        e.preventDefault();
        continueStepClient('SelectedClients', '/facturation/pay');
    });
});