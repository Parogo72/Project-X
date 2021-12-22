const relData = { sunSize: 50, planetSize: 1 };

class Rel {
    static defaultData = relData;
    static defaultErrval = 0;
    data = Rel.defaultData;
    errval = Rel.defaultErrval;
    /**
     * Rel Constructor
     * @param {number} x Relationship base.
     */
    constructor(x) {
        this.x = x;
    }

    /**
     * Get the value of `name`.
     * @param {("sunSize" | "planetSize")} name
     * @param {boolean} useDefaultData Use the default values.
     * @returns {number} name value.
     */
    get(name, useDefaultData) {
        return (useDefaultData ? Rel.defaultDataData : this.data)[name] || this.errval;
    }

    /**
     * Calculate the size of the specified `name`.
     * @param {("sunSize" | "planetSize")} name Identifier.
     * @param {boolean} useDefaultData Use the default values.
     * @returns {number} `<this.x> * <name>` or `this.errval` if `name` doesn't exists.
     */
    calc(name, useDefaultData) {
        return ((useDefaultData ? Rel.defaultDataData : this.data)[name] || this.errval) * this.x;
    }
}
export { Rel };