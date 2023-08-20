import Event from './event.js';

class Model {
    constructor() {

        this.updateEvent = new Event();

        this.localStorageKey = 'coloris-issue-117';

        this.data =
            JSON.parse(localStorage.getItem(this.localStorageKey))
            || this.#createInitialData();
    }

    #createInitialData(
    ) {
        const colors = this.#initializeColors();

        return {
            colors: colors,
        }
    }

    #initializeColors(
        amountOfRealColors = 6,
        initialColor = '#cccccc',
    ) {
        const emptyHoleColors = 1;
        const palette = new Array(amountOfRealColors + emptyHoleColors).fill().map(() => '');

        palette[0] = 'transparent';
        palette[1] = initialColor;

        return {
            active: 1,
            palette: palette,
        };
    }
    changeActiveColor(data) {
        const index = data;

        this.data.colors.active = index;
        this.commit();
    }

    commit() {
        this.updateEvent.trigger(this.data);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
    }

    changeColorPalette(data) {
        const color = data.color;
        const index = data.index;

        // check whether the new chosen color already exists
        const originalColorIndex = this.data.colors.palette.findIndex(paletteColor => {
            return paletteColor === color;
        })

        if (originalColorIndex === -1) {
            this.data.colors.active = index;
            this.data.colors.palette[index] = color;

        } else {
            // set duplicate to transparent
            this.data.colors.active = originalColorIndex;
            this.data.colors.palette[index] = '';
        }

        this.commit();
    }
}

export default Model;