/* Задание 5: калькулятор стоимости заказа (vanilla JS, без библиотек) */
'use strict';

function formatCost(cost) {
    return cost.toLocaleString('ru-RU') + ' ₽';
}

function initCalculator() {
    var quantityInput = document.getElementById('calc-quantity'),
        productSelect = document.getElementById('calc-product'),
        calcButton = document.getElementById('calc-button'),
        resultBox = document.getElementById('calc-result'),
        errorBox = document.getElementById('calc-error');

    function showError(message) {
        errorBox.textContent = message;
        resultBox.textContent = '';
    }

    function clearError() {
        errorBox.textContent = '';
    }

    function calculateCost() {
        var quantityText = quantityInput.value.trim(),
            selectedOption = productSelect.options[productSelect.selectedIndex],
            price,
            quantity;

        errorBox.textContent = '';

        if (selectedOption === undefined || selectedOption.value === '') {
            showError('Выберите товар из списка.');
            return;
        }

        if (!/^[0-9]+$/.test(quantityText)) {
            showError('В поле «Количество» допустимы только цифры: введите целое положительное число.');
            return;
        }

        quantity = parseInt(quantityText, 10);
        if (quantity === 0) {
            showError('Количество должно быть больше нуля.');
            return;
        }

        price = parseInt(selectedOption.getAttribute('data-price'), 10);
        resultBox.textContent = 'Стоимость заказа: ' + formatCost(price * quantity);
    }

    calcButton.addEventListener('click', calculateCost);
    quantityInput.addEventListener('input', clearError);
    productSelect.addEventListener('change', clearError);
}

document.addEventListener('DOMContentLoaded', initCalculator);
