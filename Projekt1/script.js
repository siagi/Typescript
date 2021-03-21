var CalculationApp = /** @class */ (function () {
    function CalculationApp() {
        this.flag = false;
        this.inputNumberOperator = true;
        this.runApp();
    }
    CalculationApp.prototype.runApp = function () {
        this.watchDocument();
        this.getButtons();
        this.watchButtons();
        this.getResultInputs();
        this.getInputFormElements();
        this.getHowManyInputs();
        this.watchHowManyInputs();
        this.watchResultInputs();
    };
    CalculationApp.prototype.watchDocument = function () {
        var _this = this;
        document.body.addEventListener('click', function (e) {
            if (e.target instanceof Element && e.target.tagName == "INPUT" && e.target.id !== "input5" && e.target.parentElement.id !== "results" && _this.flag == true) {
                _this.elementsArray = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
                e.target.hasAttribute('class') ? e.target.removeAttribute('class') : e.target.setAttribute('class', 'selected');
            }
        });
    };
    CalculationApp.prototype.getButtons = function () {
        this.deleteButton = document.querySelector('#deleteButton');
        this.declareButton = document.querySelector('#declareButton');
    };
    CalculationApp.prototype.watchButtons = function () {
        var _this = this;
        this.declareButton.addEventListener('click', function () {
            if (_this.flag == false) {
                _this.declareButton.innerHTML = 'Zaznacz inputy do usuniecia lub wróc';
                _this.flag = true;
                _this.deleteButton.removeAttribute('class');
            }
            else {
                _this.declareButton.innerHTML = 'Chce usunac inputs';
                _this.flag = false;
                _this.deleteButton.setAttribute('class', 'not-visible');
                if (_this.elementsArray != null) {
                    _this.elementsArray.forEach(function (element) { return element.removeAttribute('class'); });
                }
            }
        });
        this.deleteButton.addEventListener('click', function () {
            if (_this.elementsArray !== null && _this.flag == true) {
                _this.elementsArray.forEach(function (element) { return element.hasAttribute('class') ? element.remove() : null; });
                _this.declareButton.innerHTML = 'Chce usunac pliki';
                _this.deleteButton.setAttribute('class', 'not-visible');
                _this.flag = false;
                _this.getInputFormElements();
                _this.calculations();
            }
        });
    };
    CalculationApp.prototype.getResultInputs = function () {
        this.resultInputs = Array.prototype.slice.call(document.querySelectorAll('#results>input'));
    };
    CalculationApp.prototype.getInputFormElements = function () {
        this.inputFormElements = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
    };
    CalculationApp.prototype.getHowManyInputs = function () {
        this.inputHowManyInputs = document.querySelector('#input5');
    };
    CalculationApp.prototype.watchHowManyInputs = function () {
        var _this = this;
        this.inputHowManyInputs.addEventListener('focus', function () {
            _this.resultInputs.forEach(function (element) { return element.setAttribute('class', 'loading'); });
        });
        this.inputHowManyInputs.addEventListener('blur', function () {
            _this.resultInputs.forEach(function (element) { return element.removeAttribute('class'); });
        });
        this.inputHowManyInputs.addEventListener('change', function () {
            _this.sumElement.value = '';
            _this.averageElement.value = '';
            _this.minElement.value = '';
            _this.maxElement.value = '';
            _this.resultInputs.forEach(function (element) { return _this.setClassLoadingAttribute(element); });
            var inputQuantity = typeof (_this.inputHowManyInputs.value) === "string" ? parseInt(_this.inputHowManyInputs.value) : 0;
            var formContainInputs = document.querySelector('#inputForm');
            document.querySelectorAll('#inputForm>input').forEach(function (element) { return element.remove(); });
            for (var i = 0; i < inputQuantity; i++) {
                var customInput = document.createElement('input');
                customInput.setAttribute('id', 'input');
                customInput.setAttribute('type', 'number');
                customInput.addEventListener('focus', function () {
                    _this.resultInputs.forEach(function (element) { return _this.setClassLoadingAttribute(element); });
                });
                customInput.addEventListener('blur', function () {
                    if (_this.inputNumberOperator == true) {
                        _this.resultInputs.forEach(function (element) { return _this.removeClassAttribute(element); });
                    }
                });
                customInput.addEventListener('input', function () { return _this.calculations(); });
                formContainInputs.appendChild(customInput);
                _this.inputFormElements = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
            }
        });
    };
    CalculationApp.prototype.watchResultInputs = function () {
        this.sumElement = document.querySelector('#sum');
        this.averageElement = document.querySelector('#average');
        this.minElement = document.querySelector('#min');
        this.maxElement = document.querySelector('#max');
    };
    CalculationApp.prototype.setClassLoadingAttribute = function (element) {
        element.setAttribute('class', 'loading');
    };
    CalculationApp.prototype.removeClassAttribute = function (element) {
        element.removeAttribute('class');
    };
    CalculationApp.prototype.calculations = function () {
        var _this = this;
        var sumElements = 0;
        var inputElementValue = [];
        for (var i = 0; i < this.inputFormElements.length; i++) {
            if (parseInt(this.inputFormElements[i].value) >= 0) {
                this.resultInputs.forEach(function (element) { return element.hasAttribute('class') ? _this.removeClassAttribute(element) : null; });
                this.inputNumberOperator = true;
                if (parseInt(this.inputFormElements[i].value)) {
                    inputElementValue.push(parseInt(this.inputFormElements[i].value));
                }
                else {
                    inputElementValue.push(0);
                }
                var sumAllElements = inputElementValue.reduce(function (a, b) { return +a + +b; }, 0);
                this.sumElement.value = sumAllElements.toString();
                this.averageElement.value = (sumAllElements / inputElementValue.length).toString();
                this.minElement.value = (Math.min.apply(null, inputElementValue)).toString();
                this.maxElement.value = (Math.max.apply(null, inputElementValue)).toString();
                this.resultInputs.forEach(function (element) { return _this.removeClassAttribute(element); });
            }
            else if (parseInt(this.inputFormElements[i].value) < 0) {
                this.resultInputs.forEach(function (element) { return element.setAttribute('class', 'loading'); });
                this.inputNumberOperator = false;
            }
        }
    };
    return CalculationApp;
}());
var calculationApp = new CalculationApp();
