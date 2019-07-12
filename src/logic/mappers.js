import Grid from './grid';

export const generateRandomizedGrid = (cols, rows) => {
    let grid = new Grid(cols, rows);

    for (let i = 0; i < cols * rows; i++) {
        const value = Math.floor(Math.random() * 2);

        grid.setCellAtIndex(i, value);
    }

    return grid;
};

export const evolveGrid = (rules, grid) => {
    let newGrid = new Grid(grid.cols, grid.rows);

    for (let i = 0; i < grid.cols * grid.rows; i++) {
        const currentValue = grid.getCellAtIndex(i);
        const countAdjacent = grid.getAdjacentToCellAtIndex(i).reduce( (accumulator, value) => accumulator + value );

        let nextValue = currentValue;

        if (currentValue == 1 && !rules.canSurvive(countAdjacent)) {
            nextValue = 0;
        }
        else if (currentValue == 0 && rules.canBeBorn(countAdjacent)) {
            nextValue = 1;
        }

        newGrid.setCellAtIndex(i, nextValue);
    }

    return newGrid;
};