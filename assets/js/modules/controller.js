import Model from "./model";
import View from "./view";

class Controller {
    constructor() {
        this.view = new View();
        this.model = new Model();

        this.model.updateEvent.addListener( data => this.view.render(data));
        this.view.activeColorEvent.addListener( data => this.model.changeActiveColor(data));
        this.view.colorChangeEvent.addListener( data => this.model.changeColorPalette(data));
    }

    run() {
        this.model.commit();
    }
}

export default Controller;


