//dynamic inputs
let flag: boolean = false;
let elementsArray: Array<HTMLHtmlElement> = [];
const inputHowManyInput: HTMLInputElement = document.querySelector('#input5');
const deleteButton = document.querySelector('#deleteButton');
const declareButton = document.querySelector('#declareButton');
declareButton.addEventListener('click', () => {
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

})
deleteButton.addEventListener('click', () => {
    console.log(elementsArray);
    if (elementsArray !== null && flag == true) {
        elementsArray.forEach(element => element.hasAttribute('class') ? element.remove() : console.log('sdas'));
        declareButton.innerHTML = 'Chce usunac pliki';
        deleteButton.setAttribute('class', 'not-visible');
        flag = false;
    }

    console.log(elementsArray.length);
    inputHowManyInput.value = (elementsArray.length).toString();

})
document.body.addEventListener('click', (e) => {
    // console.log(e.target instanceof Element);
    // console.log(e.target);
    // console.log(e.target instanceof Element && e.target.tagName === "INPUT");

    if (e.target instanceof Element && e.target.tagName == "INPUT" && e.target.id !== "input5" && e.target.parentElement.id !== "results" && flag == true) {
        elementsArray = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
        // e.target.setAttribute('class', 'selected');

        e.target.hasAttribute('class') ? e.target.removeAttribute('class') : e.target.setAttribute('class', 'selected')
        // elementsArray.push(<HTMLHtmlElement>e.target);

        // elementsArray.forEach(element => element.hasAttribute('class') ? element.removeAttribute('class') : element.setAttribute('class', 'selected'));
    }
    // else if (e.target instanceof Element && e.target.tagName == "FORM" && e.target.id == "inputForm") {
    //     const inputsInsideTheForm = e.target.querySelectorAll('form>input');
    //     console.log(inputsInsideTheForm);
    //     console.log('jestem');
    // }
    // console.log(elementsArray);
})
const resultInputs = document.querySelectorAll('#results>input');

let inputFormElements: Array<HTMLInputElement> = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
inputHowManyInput.addEventListener('focus', () => {
    resultInputs.forEach(element => element.setAttribute('class', 'loading'));
});

inputHowManyInput.addEventListener('blur', () => {
    resultInputs.forEach(element => element.removeAttribute('class'));
});


inputHowManyInput.addEventListener('change', () => {

    sumElement.value = '';
    averageElement.value = '';
    minElement.value = '';
    maxElement.value = '';
    resultInputs.forEach(element => element.setAttribute('class', 'loading'));

    let inputQuantity: Number = typeof (inputHowManyInput.value) === "string" ? parseInt(inputHowManyInput.value) : 0;
    let formContainInputs: HTMLFormElement = document.querySelector('#inputForm');

    document.querySelectorAll('#inputForm>input').forEach(element => element.remove());
    // console.log(document.querySelectorAll('#input'));
    // document.body.querySelector('#inputForm').remove();
    for (let i = 0; i < inputQuantity; i++) {
        const customInput: HTMLInputElement = document.createElement('input');
        customInput.setAttribute('id', 'input');
        customInput.setAttribute('type', 'number');
        customInput.addEventListener('focus', () => {
            resultInputs.forEach(element => element.setAttribute('class', 'loading'));
        });
        customInput.addEventListener('blur', () => {
            resultInputs.forEach(element => element.removeAttribute('class'));
        });
        customInput.addEventListener('input', () => calculations());
        formContainInputs.appendChild(customInput);
        inputFormElements = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
    }


})


//static inputs

// const input1Element: HTMLInputElement = document.querySelector('#input1');
// const input2Element: HTMLInputElement = document.querySelector('#input2');
// const input3Element: HTMLInputElement = document.querySelector('#input3');
// const input4Element: HTMLInputElement = document.querySelector('#input4');

//Array with input elements

// let inputFormElements: Array<HTMLInputElement> = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
// console.log(`Ile elementów ${inputFormElements.length}`);
//result elements

let sumElement: HTMLInputElement = document.querySelector('#sum');
let averageElement: HTMLInputElement = document.querySelector('#average');
let minElement: HTMLInputElement = document.querySelector('#min');
let maxElement: HTMLInputElement = document.querySelector('#max');





// const totalSum = input1Element + input2Element + input3Element + input4Element;

const calculations = () => {

    let sumElements: Number = 0;
    let inputElementValue: Array<Number> = [];

    for (let i = 0; i < inputFormElements.length; i++) {
        if (parseInt(inputFormElements[i].value)) {
            inputElementValue.push(parseInt(inputFormElements[i].value));
        }
        else {
            inputElementValue.push(0);
        }

    }


    let sumAllElements: Number = inputElementValue.reduce((a, b) => +a + +b, 0);


    sumElement.value = sumAllElements.toString();
    averageElement.value = (<number>sumAllElements / inputElementValue.length).toString();
    minElement.value = (Math.min.apply(null, inputElementValue)).toString();
    maxElement.value = (Math.max.apply(null, inputElementValue)).toString();

}
resultInputs.forEach(element => element.removeAttribute('class'));

// input1Element.addEventListener("input", () => calculations());
// input2Element.addEventListener("input", () => calculations());
// input3Element.addEventListener("input", () => calculations());
// input4Element.addEventListener("input", () => calculations());

