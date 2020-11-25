class ToxicityMap {
    constructor () {
        this.map = new Map();
    }

    add(key, value) {
        let newValues = [value];
        if (this.map.get(key) != null) {
            newValues.push(...this.map.get(key))
        }
        this.map.set(key, newValues)
    }

    mean (key) {
        if (this.map.get(key) == null || this.map.get(key).length == 0) return undefined
        const sum = this.map.get(key).reduce((sum, current) => sum + current)
        return sum/this.map.get(key).length
    }

    log()  {
        console.log(this.map)
    }
}

module.exports = ToxicityMap