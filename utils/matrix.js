class MatrixItem {
    constructor() {}
    setMatrix(matrix) {
        this.matrix = matrix;
    }
}

exports.Matrix = class Matrix {
    constructor(data) {
        this.data = data;
        this.rows = data.length;
        this.columns = data[0].length;
        this.forEach(item => item instanceof MatrixItem && item.setMatrix(this));
    }
    
    forEach(handler) {
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.columns; i++) {
                handler(this.cell(j, i), j, i);
            }
        }
    }

    map(handler) {
        const result = [];
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.columns; i++) {
                result.push(handler(this.cell(j, i), j, i));
            }
        }
        return result;
    }

    filter(handler) {
        const result = [];
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.columns; i++) {
                if (handler(this.cell(j, i), j, i)) {
                    result.push(this.cell(j, i));
                }
            }
        }
        return result;
    }

    coordinates(condition) {
        const result = [];
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.columns; i++) {
                if (!condition || condition(j, i)) {
                    result.push([j, i]);
                }
            }
        }
        return result;
    }

    cell(j, i) {
        if (j >= 0 && j < this.rows && i >= 0 && i < this.columns) {
            return this.data[j][i];
        }
    }
}

exports.MatrixItem = MatrixItem;