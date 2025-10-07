$(function() {
    let searchInput = $('#productSearchTerm');

    // Obtener datos del script JSON
    let productsData = JSON.parse(document.getElementById('products-data').textContent);
    console.log('Products data completo:', productsData);

    // evento de busqueda
    searchInput.on('input', function() {
        console.log(searchInput.val());
    });
});
