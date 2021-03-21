class CalculationApp {
    //buttons properties
    deleteButton: HTMLButtonElement;
    declareButton: HTMLButtonElement;
    //flag propertis
    flag: boolean;
    //Arrays properties
    elementsArray: Array<HTMLHtmlElement>;
    resultInputs: Array<HTMLInputElement>;
    inputFormElements: Array<HTMLInputElement>;
    //HTML Elements properties
    sumElement: HTMLInputElement;
    averageElement: HTMLInputElement;
    minElement: HTMLInputElement;
    maxElement: HTMLInputElement;
    inputHowManyInputs: HTMLInputElement;

    constructor() {
        this.flag = false;
        this.runApp();
    }
    runApp() {
        this.watchDocument();
        this.getButtons();
        this.watchButtons();
        this.getResultInputs();
        this.getInputFormElements();
        this.getHowManyInputs();
        this.watchHowManyInputs();
        this.watchResultInputs();
    }

    watchDocument() {
        document.body.addEventListener('click', (e) => {


            if (e.target instanceof Element && e.target.tagName == "INPUT" && e.target.id !== "input5" && e.target.parentElement.id !== "results" && this.flag == true) {
                this.elementsArray = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));

                e.target.hasAttribute('class') ? e.target.removeAttribute('class') : e.target.setAttribute('class', 'selected');

            }
        })
    }

    getButtons() {
        this.deleteButton = document.querySelector('#deleteButton');
        this.declareButton = document.querySelector('#declareButton');
    }

    watchButtons() {
        this.declareButton.addEventListener('click', () => {
            if (this.flag == false) {
                this.declareButton.innerHTML = 'Zaznacz inputy do usuniecia lub wróc';
                this.flag = true;
                this.deleteButton.removeAttribute('class');

            }
            else {
                this.declareButton.innerHTML = 'Chce usunac pliki';
                this.flag = false;
                this.deleteButton.setAttribute('class', 'not-visible');
                this.elementsArray.forEach(element => element.removeAttribute('class'));
            }

        });

        this.deleteButton.addEventListener('click', () => {

            if (this.elementsArray !== null && this.flag == true) {
                this.elementsArray.forEach(element => element.hasAttribute('class') ? element.remove() : null);
                this.declareButton.innerHTML = 'Chce usunac pliki';
                this.deleteButton.setAttribute('class', 'not-visible');
                this.flag = false;
            }

        })

    }

    getResultInputs() {
        this.resultInputs = Array.prototype.slice.call(document.querySelectorAll('#results>input'));
    }

    getInputFormElements() {
        this.inputFormElements = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
    }
    getHowManyInputs() {

        this.inputHowManyInputs = document.querySelector('#input5');
    }
    watchHowManyInputs() {

        this.inputHowManyInputs.addEventListener('focus', () => {
            this.resultInputs.forEach(element => element.setAttribute('class', 'loading'));
        });

        this.inputHowManyInputs.addEventListener('blur', () => {
            this.resultInputs.forEach(element => element.removeAttribute('class'));
        });


        this.inputHowManyInputs.addEventListener('change', () => {

            this.sumElement.value = '';
            this.averageElement.value = '';
            this.minElement.value = '';
            this.maxElement.value = '';
            this.resultInputs.forEach(element => this.setClassLoadingAttribute(element));

            let inputQuantity: Number = typeof (this.inputHowManyInputs.value) === "string" ? parseInt(this.inputHowManyInputs.value) : 0;
            let formContainInputs: HTMLFormElement = document.querySelector('#inputForm');

            document.querySelectorAll('#inputForm>input').forEach(element => element.remove());

            for (let i = 0; i < inputQuantity; i++) {
                const customInput: HTMLInputElement = document.createElement('input');
                customInput.setAttribute('id', 'input');
                customInput.setAttribute('type', 'number');
                customInput.addEventListener('focus', () => {
                    this.resultInputs.forEach(element => this.setClassLoadingAttribute(element));
                });
                customInput.addEventListener('blur', () => {
                    this.resultInputs.forEach(element => this.removeClassAttribute(element));
                });
                customInput.addEventListener('input', () => this.calculations());
                formContainInputs.appendChild(customInput);
                this.inputFormElements = Array.prototype.slice.call(document.querySelectorAll('#inputForm>input'));
            }


        })



    }

    watchResultInputs() {
        this.sumElement = document.querySelector('#sum');
        this.averageElement = document.querySelector('#average');
        this.minElement = document.querySelector('#min');
        this.maxElement = document.querySelector('#max');
    }

    setClassLoadingAttribute(element: HTMLInputElement) {
        element.setAttribute('class', 'loading');
    }

    removeClassAttribute(element: HTMLInputElement) {
        element.removeAttribute('class');
    }

    calculations() {

        let sumElements: Number = 0;
        let inputElementValue: Array<Number> = [];

        for (let i = 0; i < this.inputFormElements.length; i++) {
            if (parseInt(this.inputFormElements[i].value)) {
                inputElementValue.push(parseInt(this.inputFormElements[i].value));
            }
            else {
                inputElementValue.push(0);
            }

        }
        let sumAllElements: Number = inputElementValue.reduce((a, b) => +a + +b, 0);


        this.sumElement.value = sumAllElements.toString();
        this.averageElement.value = (<number>sumAllElements / inputElementValue.length).toString();
        this.minElement.value = (Math.min.apply(null, inputElementValue)).toString();
        this.maxElement.value = (Math.max.apply(null, inputElementValue)).toString();
        this.resultInputs.forEach(element => this.removeClassAttribute(element));
    }

}

const calculationApp = new CalculationApp();
