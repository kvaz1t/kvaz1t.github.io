/* Задание 6: калькулятор стоимости услуги с динамическим пересчётом цены */
'use strict';

function formatPrice(value) {
    return value.toLocaleString('ru-RU') + ' ₽';
}

function initServiceCalculator() {
    var typeInputs = document.querySelectorAll('input[name="service-type"]'),
        quantityInput = document.getElementById('service-quantity'),
        optionWrap = document.getElementById('service-option-wrap'),
        optionSelect = document.getElementById('service-option'),
        propertyWrap = document.getElementById('service-property-wrap'),
        propertyBox = document.getElementById('service-property'),
        resultBox = document.getElementById('service-result'),
        errorBox = document.getElementById('service-error'),
        i;

    function selectedType() {
        for (i = 0; i < typeInputs.length; i += 1) {
            if (typeInputs[i].checked) {
                return typeInputs[i];
            }
        }
        return typeInputs[0];
    }

    function updateVisibility() {
        var type = selectedType();
        optionWrap.hidden = type.getAttribute('data-has-option') !== 'true';
        propertyWrap.hidden = type.getAttribute('data-has-property') !== 'true';
    }

    function calculate() {
        var type = selectedType(),
            base = parseInt(type.getAttribute('data-base'), 10),
            quantityText = quantityInput.value.trim(),
            quantity,
            multiplier = 1,
            total;

        errorBox.textContent = '';

        if (quantityText === '') {
            resultBox.textContent = 'Введите количество — цена пересчитается автоматически.';
            return;
        }

        if (!/^[0-9]+$/.test(quantityText)) {
            errorBox.textContent = 'В поле «Количество» допустимы только цифры: введите целое положительное число.';
            resultBox.textContent = '';
            return;
        }

        quantity = parseInt(quantityText, 10);
        if (quantity === 0) {
            errorBox.textContent = 'Количество должно быть больше нуля.';
            resultBox.textContent = '';
            return;
        }

        if (!optionWrap.hidden) {
            multiplier *= parseFloat(optionSelect.value);
        }
        if (!propertyWrap.hidden && propertyBox.checked) {
            multiplier *= 1.25;
        }

        total = Math.round(base * multiplier) * quantity;
        resultBox.textContent = 'Стоимость услуги: ' + formatPrice(total);
    }

    function refresh() {
        updateVisibility();
        calculate();
    }

    for (i = 0; i < typeInputs.length; i += 1) {
        typeInputs[i].addEventListener('change', refresh);
    }
    quantityInput.addEventListener('input', refresh);
    optionSelect.addEventListener('change', calculate);
    propertyBox.addEventListener('change', calculate);

    refresh();
}

document.addEventListener('DOMContentLoaded', initServiceCalculator);
