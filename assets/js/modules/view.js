import Event from './event.js';
import Coloris from "@melloware/coloris";
import HtmlElementViewhelper from './viewhelper/html_element_viewhelper';

class View {
    constructor() {
        this.htmlElements = new HtmlElementViewhelper();

        this.activeColorEvent = new Event();
        this.colorChangeEvent = new Event();
    }

    render(data) {
        this.#removeOldElements();
        this.#renderColorPalette(data);
    }

    #renderColorPalette(data) {
        Coloris.init();

        const paletteContainer = document.getElementById('color-palette');

        const palette = data.colors.palette;
        const active = data.colors.active;

        palette.forEach((color, i) => {

            // Container div
            let container = this.htmlElements.container(['color-container', 'clr-field']);
            container.style.color = color;

            // Create label (will be hidden, for a11y
            let label = this.htmlElements.label(
                `Color {i}`,
                `label-color-${i}`,
                `color-${i}`,
                ['visually-hidden']
            );
            container.appendChild(label);

            // Create input field
            let input = this.htmlElements.input(
                'text', `color-${i}`, color
            );
            if (color !== 'transparent') {
                input.setAttribute('data-coloris', '');
            }

            if (parseFloat(active) === parseFloat(i)) {
                input.setAttribute('aria-current', 'true');
            }
            input.addEventListener('change', event => {
                this.colorChangeEvent.trigger({
                    color: event.target.value,
                    index: event.target.id.replace('color-', ''),
                });
            });

            input.addEventListener('click', event => {
                this.activeColorEvent.trigger(event.target.id.replace('color-', ''));
            });
            container.appendChild(input);

            // Create button
            let button = document.createElement('button');
            button.setAttribute('aria-labelledby', `label-color-${i}`);
            container.appendChild(button);

            if (color !== 'transparent') {
                Coloris.setInstance(`color-${i}`, {
                    alpha: false,
                    format: 'hsl',
                });
            }

            paletteContainer.appendChild(container);
        });
    }

    #removeOldElements() {

        this.#removeSettings('color-palette');
    }

    #removeSettings(id) {
        let parent = document.getElementById(id);
        if (!parent) return;

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}

export default View;