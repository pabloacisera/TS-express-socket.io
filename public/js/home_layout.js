// home_layout.js
import { continueStepClient, verifyProductsExist } from './products.js';

$(document).ready(function() {
    $('#step-client').on('click', function(e) {
        e.preventDefault();
        
        continueStepClient('/facturation/clients');
    });
});