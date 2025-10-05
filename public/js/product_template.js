// jQuery delegada — funciona aunque el template se inserte dinámicamente

let products = window.ALL_PRODUCTS || [];
let productsSelected = []; // Array para productos seleccionados
let currentFocusIndex = -1; // Índice del item actualmente enfocado

$(function () {

  // Input -> show/hide lista (delegado)
  $(document).on('input', '#search-product-input', function () {
    const $input = $(this);
    const valor = $input.val().trim().toLowerCase();
    const $lista = $input.siblings('.result-list');

    currentFocusIndex = -1; // Reset del índice al filtrar

    if (valor !== '') {
      // Filtro por múltiples campos
      const sugerencias = products.filter(s => {
        if (!s) return false;

        const coincideMake = s.make && s.make.toLowerCase().includes(valor);
        const coincideCode = s.code && s.code.toLowerCase().includes(valor);
        const coincideName = s.name && s.name.toLowerCase().includes(valor);
        const coincidePrice = s.price && s.price.toString().includes(valor);
        const coincideOwner = s.owner && s.owner.toLowerCase().includes(valor);
        const coincideId = s.id && s.id.toLowerCase().includes(valor);

        return coincideMake || coincideCode || coincideName || coincidePrice || coincideOwner || coincideId;
      });

      // Renderiza los resultados con checkboxes
      $lista.html(sugerencias.length
        ? sugerencias.map((s, index) => {
            const isSelected = productsSelected.some(p => p.id === s.id);
            return `
              <div class="item" data-id="${s.id}" data-index="${index}" tabindex="0">
                <input type="checkbox" class="product-checkbox" ${isSelected ? 'checked' : ''}>
                <div class="item-content">
                  <strong>${s.name}</strong> - ${s.make}
                  <span style="color: #666;">(${s.code})</span>
                  - $${s.price}
                </div>
              </div>
            `;
          }).join('')
        : `<div class="item no-result">Sin resultados</div>`
      );

      $lista.css('display', 'flex');
    } else {
      $lista.hide();
      $lista.empty();
      currentFocusIndex = -1;
    }
  });

  // Navegación con teclado (Arrow Up/Down y Space)
  $(document).on('keydown', '#search-product-input', function (e) {
    const $lista = $(this).siblings('.result-list');
    const $items = $lista.find('.item:not(.no-result)');

    if ($items.length === 0) return;

    // Arrow Down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentFocusIndex = (currentFocusIndex + 1) % $items.length;
      updateFocus($items);
    }
    // Arrow Up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentFocusIndex = currentFocusIndex <= 0 ? $items.length - 1 : currentFocusIndex - 1;
      updateFocus($items);
    }
    // Space - toggle checkbox del item enfocado
    else if (e.key === ' ' && currentFocusIndex >= 0) {
      e.preventDefault();
      const $currentItem = $items.eq(currentFocusIndex);
      toggleProductSelection($currentItem);
    }
  });

  // ESC -> oculta todas las listas visibles
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.result-list:visible').hide();
      currentFocusIndex = -1;
    }
  });

  // Click fuera -> oculta (delegado)
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.search-product').length) {
      $('.result-list:visible').hide();
      currentFocusIndex = -1;
    }
  });

  // Click en checkbox o en el item
  $(document).on('click', '.result-list .item:not(.no-result)', function (e) {
    e.stopPropagation();

    // Si el click fue directamente en el checkbox, ya se maneja con el evento change
    if ($(e.target).hasClass('product-checkbox')) return;

    // Si el click fue en cualquier otra parte del item, toggle el checkbox
    toggleProductSelection($(this));
  });

  // Evento change del checkbox
  $(document).on('change', '.product-checkbox', function (e) {
    e.stopPropagation();
    const $item = $(this).closest('.item');
    updateProductSelection($item, $(this).is(':checked'));
  });

  // Función para actualizar el foco visual
  function updateFocus($items) {
    $items.removeClass('focused');
    if (currentFocusIndex >= 0 && currentFocusIndex < $items.length) {
      const $currentItem = $items.eq(currentFocusIndex);
      $currentItem.addClass('focused');

      // Scroll automático si es necesario
      const itemTop = $currentItem.position().top;
      const itemHeight = $currentItem.outerHeight();
      const listHeight = $currentItem.parent().height();
      const scrollTop = $currentItem.parent().scrollTop();

      if (itemTop < 0) {
        $currentItem.parent().scrollTop(scrollTop + itemTop);
      } else if (itemTop + itemHeight > listHeight) {
        $currentItem.parent().scrollTop(scrollTop + itemTop + itemHeight - listHeight);
      }
    }
  }

  // Función para toggle la selección del producto
  function toggleProductSelection($item) {
    const $checkbox = $item.find('.product-checkbox');
    $checkbox.prop('checked', !$checkbox.is(':checked'));
    updateProductSelection($item, $checkbox.is(':checked'));
  }

  // Función para actualizar el array de productos seleccionados
  function updateProductSelection($item, isChecked) {
    const productId = $item.data('id');
    const product = products.find(p => p.id === productId);

    if (!product) return;

    if (isChecked) {
      // Agregar producto si no está ya seleccionado
      if (!productsSelected.some(p => p.id === productId)) {
        productsSelected.push({
          ...product,
          quantity: 1 // Cantidad inicial
        });
        console.log('Producto agregado:', product);
      }
    } else {
      // Remover producto
      productsSelected = productsSelected.filter(p => p.id !== productId);
      console.log('Producto removido:', product);
    }

    console.log('Productos seleccionados:', productsSelected);

    // Actualizar tabla
    renderProductsTable();

    // **ELIMINADO** scrollToLastProduct() automático
    // Dejar que el usuario vea los productos mientras los agrega

    // Aquí puedes disparar un evento custom si necesitas notificar a otros componentes
    $(document).trigger('products-selection-changed', [productsSelected]);
  }

  // Función para calcular el total
  function calculateTotal() {
    return productsSelected.reduce((total, p) => {
      return total + (p.price * p.quantity);
    }, 0);
  }

  // Función para renderizar la tabla de productos
  function renderProductsTable() {
    const $tbody = $('.table-result tbody');

    if (productsSelected.length === 0) {
      $tbody.html('<tr><td colspan="5" style="text-align: center; color: #999;">No hay productos seleccionados</td></tr>');

      // Ocultar el footer si no hay productos
      $('.table-result tfoot').hide();
      return;
    }

    $tbody.html(
      productsSelected.map(p => {
        const subtotal = p.price * p.quantity;
        return `
          <tr data-product-id="${p.id}">
            <td>${p.code}</td>
            <td>${p.name}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td>
              <div class="quantity-controls">
                <button class="qty-btn qty-minus" data-id="${p.id}">-</button>
                <input type="number" class="qty-input" value="${p.quantity}" min="1" data-id="${p.id}">
                <button class="qty-btn qty-plus" data-id="${p.id}">+</button>
                <button class="remove-btn" data-id="${p.id}" title="Eliminar">×</button>
              </div>
            </td>
            <td class="subtotal">$${subtotal.toFixed(2)}</td>
          </tr>
        `;
      }).join('')
    );

    // Calcular y mostrar el total
    const total = calculateTotal();
    const $tfoot = $('.table-result tfoot');

    $tfoot.html(`
      <tr class="total-row">
        <td colspan="4" class="total-label">TOTAL</td>
        <td class="total-value">$${total.toFixed(2)}</td>
      </tr>
    `).show();
  }

  // Eventos para controlar cantidad
  $(document).on('click', '.qty-minus', function() {
    const productId = $(this).data('id');
    const product = productsSelected.find(p => p.id === productId);
    if (product && product.quantity > 1) {
      product.quantity--;
      renderProductsTable();
    }
  });

  $(document).on('click', '.qty-plus', function() {
    const productId = $(this).data('id');
    const product = productsSelected.find(p => p.id === productId);
    if (product) {
      product.quantity++;
      renderProductsTable();
    }
  });

  $(document).on('change', '.qty-input', function() {
    const productId = $(this).data('id');
    const newQty = parseInt($(this).val()) || 1;
    const product = productsSelected.find(p => p.id === productId);
    if (product) {
      product.quantity = Math.max(1, newQty);
      renderProductsTable();
    }
  });

  $(document).on('click', '.remove-btn', function() {
    const productId = $(this).data('id');
    productsSelected = productsSelected.filter(p => p.id !== productId);

    // Desmarcar checkbox en la lista de búsqueda
    $(`.result-list .item[data-id="${productId}"] .product-checkbox`).prop('checked', false);

    renderProductsTable();
    $(document).trigger('products-selection-changed', [productsSelected]);
  });

  // Evento para el botón facturar
  $(document).on('click', '#btn-facturar', function() {
    if (productsSelected.length === 0) {
      alert('No hay productos seleccionados para facturar');
      return;
    }

    // Por ahora solo muestra un console.log
    console.log('Facturar presionado');
    console.log('Productos a facturar:', productsSelected);
    console.log('Total:', calculateTotal());

    // Aquí irá la funcionalidad futura
    alert('Funcionalidad de facturación próximamente...');
  });

  // Exponer el array globalmente si es necesario
  window.getSelectedProducts = function() {
    return productsSelected;
  };

  window.clearSelectedProducts = function() {
    productsSelected = [];
    $('.product-checkbox').prop('checked', false);
    renderProductsTable();
  };

  window.getTotal = function() {
    return calculateTotal();
  };
});
