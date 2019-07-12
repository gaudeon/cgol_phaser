export default class Grid {
    constructor (cols = 10, rows = 10) {
        if (cols < 1) {
            throw Error('Columns cannot be less than one in Grid.');
        }

        if (rows < 1) {
            throw Error('Rows cannot be less than one in Grid.');
        }

        this._cols = cols;
        this._rows = rows;
        this._grid = Array(cols * rows);
    }

    get cols () { return this._cols; }
    get rows () { return this._rows; }
    get grid () { return this._grid; }

    getCellAtIndex (index) {
        if (0 <= index && index < this.cols * this.rows) {
            return this.grid[index];
        }
        else {
            return 0;
        }
    }

    getCellAtXY (x, y) {
        if (0 <= x  && x < this.cols && 0 <= y && y < this.rows) {
            return this.grid[x + y * this.cols];
        }
        else {
            return 0;
        }
    }

    setCellAtIndex (index, val = 0) {
        if (0 <= index && index < this.cols * this.rows) {
            this._grid[index] = val;
        }
    }

    setCellAtXY (x, y, val = 0) {
        if (0 <= x && x < this.cols && 0 <= y && y < this.rows) {
            this._grid[x + y * this.cols] = val;
        }
    }

    generateAdjacentCoordListByXY (x, y) {
        return [
            {x: x-1, y: y-1},
            {x: x, y: y-1},
            {x: x+1, y: y-1},
            {x: x-1, y: y},
            {x: x+1, y: y},
            {x: x-1, y: y+1},
            {x: x, y: y+1},
            {x: x+1, y: y+1}
        ];
    }

    getAdjacentToCellAtXY (x, y) {
        let coords = this.generateAdjacentCoordListByXY(x, y);
        let values = [];

        coords.forEach(coord => {
            values.push(this.getCellAtXY(coord.x, coord.y));
        });

        return values;
    }

    getAdjacentToCellAtIndex (index) {
        const y = Math.floor(index / this.cols);
        const x = index - y * this.cols;

        return this.getAdjacentToCellAtXY(x, y);
    }

    serialize () {
        return this.grid.join('');
    }
}