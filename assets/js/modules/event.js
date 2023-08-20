class Event {
    constructor() {
        this.listener = [];
    }

    addListener(listener) {
        this.listener.push(listener);
    }

    trigger(params) {
        this.listener.forEach(listener => {
            listener(params);
        })
    }
}

export default Event;