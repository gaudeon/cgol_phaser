export default class Rules {
    constructor () {
        this._cellBornAtList = [];
        this._cellSurvivesAtList = [];
    }

    get cellBornAtList () { return this._cellBornAtList; }
    get cellSurvivesAtList () { return this._cellSurvivesAtList; }

    addBornAtRule (count) {
        const maxAdjacent = 8;
        let numericalCount = new Number(count);

        if (numericalCount <= 0 || numericalCount > maxAdjacent) {
            throw Error(`Born at rule count must be greater than 0 and less than ${maxAdjacent}`);
        }

        this._cellBornAtList.push(Math.floor(numericalCount));
    }

    addSurvivesAtRule (count) {
        const maxAdjacent = 8;
        let numericalCount = new Number(count);

        if (numericalCount <= 0 || numericalCount > maxAdjacent) {
            throw Error(`Born at rule count must be greater than 0 and less than ${maxAdjacent}`);
        }

        this._cellSurvivesAtList.push(Math.floor(numericalCount));
    } 

    canBeBorn (cellAdjacentCount) {
        return this.cellBornAtList.includes(Math.floor(cellAdjacentCount));
    }

    canSurvive (cellAdjacentCount) {
        return this.cellSurvivesAtList.includes(Math.floor(cellAdjacentCount));
    }
}