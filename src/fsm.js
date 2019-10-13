class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        if (!config) throw new Error("Error");

        this.initial = config.initial;
        this.state = this.initial;
        this.states = config.states;
        this.prevStates = [];
        this.nextStates = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {

        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if (!(state in this.states)) throw new Error("Error");
        
        this.prevStates.push(this.state);
        this.nextStates = [];
        
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        let obj = this.states[this.state]["transitions"];

        if (!(event in obj)) throw new Error("Error");

        this.prevStates.push(this.state);
        this.nextStates = [];
        
        this.state = (obj[event]);   
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {

        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

        let arr = [];

        if (!event) {

            for (let key in this.states) {

                arr.push(key);
            }
        }
        else {

            let arr2 = [], obj;

            for (let key in this.states) {

                arr.push(key);
            }
            
            for (let i = 0; i < arr.length; i++) {

                obj = this.states[arr[i]]["transitions"];

                if (event in obj) {

                    arr2.push(arr[i]);
                }
            }

            arr = arr2;
        }

        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    
        if (this.prevStates.length == 0) return false;

        this.nextStates.push(this.state);
        this.state = this.prevStates.pop();

        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {

        if (this.nextStates.length == 0) return false;

        this.prevStates.push(this.state);
        this.state = this.nextStates.pop();

        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {

        this.prevStates = [];
        this.nextStates = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
