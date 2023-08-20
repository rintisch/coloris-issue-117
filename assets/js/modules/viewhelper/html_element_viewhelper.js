class HtmlElementViewhelper {
    constructor() {
    }

    container(classes = []) {
        let container = document.createElement('div');

        if (!classes) return container;

        classes.forEach(className => {
            container.classList.add(className);
        });
        return container;
    }

    label(text, forAttr, id, classes = []) {
        let label = document.createElement('label');
        label.setAttribute('for', forAttr);
        label.setAttribute('id', id);
        label.innerText = text;

        classes.forEach(className => {
            label.classList.add(className);
        });
        return label;
    }

    input(type, id, value){
        let input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('id', id);

        if(type === 'checkbox' && (value === true || String(value).toLowerCase() === 'true')){
            input.setAttribute('checked', '');
        } else {
            input.setAttribute('value', value);
        }

        return input;
    }

    button(text, listener) {

        let button = document.createElement('button');
        button.innerText = text;
        button.addEventListener('click', listener);
        return button;
    }
}
export default HtmlElementViewhelper;