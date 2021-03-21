//dynamic inputs
var flag = false;
var elementsArray = [];
var inputHowManyInput = document.querySelector('#input5');
var deleteButton = document.querySelector('#deleteButton');
var declareButton = document.querySelector('#declareButton');
declareButton.addEventListener('click', function () {
    if (flag == false) {
        declareButton.innerHTML = 'Zaznacz inputy do usuniecia';
        flag = true;
        deleteButton.removeAttribute('class');
    }
    else {
        declareButton.innerHTML = 'Chce usunac pliki';
        flag = false;
        deleteButton.setAttribute('class', 'not-visible');
    }
});
deleteButton.addEventListener('click', function () {
    console.log(elementsArray);
    if (elementsArray !== null && flag == true) {
        elementsArray.forEach(function (element) { return element.hasAttribute('class') ? element.remove() : console.log('sdas'); });
        declareButton.innerHTML = 'Chce usunac pliki';
        deleteButton.setAttribute('class', 'not-visible');
        flag = false;
    }
    console.log(elementsArray.length);
    inputHowManyInput.value = (elementsArray.length).toString();
});
document.body.addEventListener('click', function (e) {
    // console.log(e.target instanceof Element);
    // console.log(e.target);
    // console.log(e.target instanceof Element && e.target.tagName === "INPUT");
    if (e.target instanceof Element && e.target.tagName == "INPUT" && e.target.id !== "input5" && e.target.parentElement.id !== "results" && flag == true) {
        elementsArray = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
        // e.target.setAttribute('class', 'selected');
        e.target.hasAttribute('class') ? e.target.removeAttribute('class') : e.target.setAttribute('class', 'selected');
        // elementsArray.push(<HTMLHtmlElement>e.target);
        // elementsArray.forEach(element => element.hasAttribute('class') ? element.removeAttribute('class') : element.setAttribute('class', 'selected'));
    }
    // else if (e.target instanceof Element && e.target.tagName == "FORM" && e.target.id == "inputForm") {
    //     const inputsInsideTheForm = e.target.querySelectorAll('form>input');
    //     console.log(inputsInsideTheForm);
    //     console.log('jestem');
    // }
    // console.log(elementsArray);
});
var resultInputs = document.querySelectorAll('#results>input');
var inputFormElements = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
inputHowManyInput.addEventListener('focus', function () {
    resultInputs.forEach(function (element) { return element.setAttribute('class', 'loading'); });
});
inputHowManyInput.addEventListener('blur', function () {
    resultInputs.forEach(function (element) { return element.removeAttribute('class'); });
});
inputHowManyInput.addEventListener('change', function () {
    sumElement.value = '';
    averageElement.value = '';
    minElement.value = '';
    maxElement.value = '';
    resultInputs.forEach(function (element) { return element.setAttribute('class', 'loading'); });
    var inputQuantity = typeof (inputHowManyInput.value) === "string" ? parseInt(inputHowManyInput.value) : 0;
    var formContainInputs = document.querySelector('#inputForm');
    document.querySelectorAll('#inputForm>input').forEach(function (element) { return element.remove(); });
    // console.log(document.querySelectorAll('#input'));
    // document.body.querySelector('#inputForm').remove();
    for (var i = 0; i < inputQuantity; i++) {
        var customInput = document.createElement('input');
        customInput.setAttribute('id', 'input');
        customInput.setAttribute('type', 'number');
        customInput.addEventListener('focus', function () {
            resultInputs.forEach(function (element) { return element.setAttribute('class', 'loading'); });
        });
        customInput.addEventListener('blur', function () {
            resultInputs.forEach(function (element) { return element.removeAttribute('class'); });
        });
        customInput.addEventListener('input', function () { return calculations(); });
        formContainInputs.appendChild(customInput);
        inputFormElements = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
    }
});
//static inputs
// const input1Element: HTMLInputElement = document.querySelector('#input1');
// const input2Element: HTMLInputElement = document.querySelector('#input2');
// const input3Element: HTMLInputElement = document.querySelector('#input3');
// const input4Element: HTMLInputElement = document.querySelector('#input4');
//Array with input elements
// let inputFormElements: Array<HTMLInputElement> = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
// console.log(`Ile elementów ${inputFormElements.length}`);
//result elements
var sumElement = document.querySelector('#sum');
var averageElement = document.querySelector('#average');
var minElement = document.querySelector('#min');
var maxElement = document.querySelector('#max');
// const totalSum = input1Element + input2Element + input3Element + input4Element;
var calculations = function () {
    var sumElements = 0;
    var inputElementValue = [];
    for (var i = 0; i < inputFormElements.length; i++) {
        if (parseInt(inputFormElements[i].value)) {
            inputElementValue.push(parseInt(inputFormElements[i].value));
        }
        else {
            inputElementValue.push(0);
        }
    }
    var sumAllElements = inputElementValue.reduce(function (a, b) { return +a + +b; }, 0);
    sumElement.value = sumAllElements.toString();
    averageElement.value = (sumAllElements / inputElementValue.length).toString();
    minElement.value = (Math.min.apply(null, inputElementValue)).toString();
    maxElement.value = (Math.max.apply(null, inputElementValue)).toString();
};
resultInputs.forEach(function (element) { return element.removeAttribute('class'); });
// input1Element.addEventListener("input", () => calculations());
// input2Element.addEventListener("input", () => calculations());
// input3Element.addEventListener("input", () => calculations());
// input4Element.addEventListener("input", () => calculations());
