"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Table {
    id;
    label;
    rows = [];
    type;
    isValid;
    constructor(props) {
        const validatePropsResponse = this.validateConstructionProps(props);
        if (validatePropsResponse.status === 'ERR')
            throw validatePropsResponse;
        else {
            this.id = props.id;
            this.label = props.label;
            this.type = 'Table';
            this.isValid = true;
            if (props.rows)
                this.setRows(props.rows);
        }
    }
    getProperties = () => {
        return {
            id: this.id,
            label: this.label,
            rows: this.rows,
            headers: this.headers,
            type: this.type,
            isValid: this.isValid
        };
    };
    get headers() {
        const rows = this.rows;
        if (!Array.isArray(rows) || rows.length < 1)
            return [];
        const length = rows.length;
        let lengthToSlice = 49;
        if (length < 50)
            lengthToSlice = length;
        const firstSliceOfRows = rows.slice(0, lengthToSlice);
        const headersOfSplicedRows = firstSliceOfRows.map(r => Object.keys(r));
        const flatenedHeaders = headersOfSplicedRows.flat();
        const uniqueHeaders = Array.from(new Set(flatenedHeaders));
        return uniqueHeaders;
    }
    export = () => this.rows;
    setRows = (rows) => {
        const rowsValidation = this.validateRows(rows);
        if (rowsValidation.status === 'ERR')
            throw rowsValidation;
        if (!Array.isArray(rows))
            this.rows = [rows];
        else
            this.rows = rows;
    };
    validateConstructionProps = (props) => {
        const err = {
            status: 'ERR',
            error: {
                label: 'Error Creating Table',
                messages: []
            }
        };
        if (!props) {
            err.error.messages.push('No props on creation of Table');
            return err;
        }
        if (!props.id)
            err.error.messages.push('No id on creation of Table');
        if (!props.label)
            err.error.messages.push('No label on creation of Table');
        if (err.error.messages.length === 0)
            return { status: 'OK' };
        else
            return err;
    };
    validateRows = (rowsToImport) => {
        const err = {
            status: 'ERR',
            error: {
                label: 'Error Creating Table',
                messages: []
            }
        };
        let rows = [];
        if (!Array.isArray(rowsToImport))
            rows = [rowsToImport];
        else
            rows = rowsToImport;
        if (rows.length === 0)
            err.error.messages.push('No Tables imported');
        for (let r = 0; r < rows.length; r++) {
            if (typeof rows[r] !== 'object') {
                err.error.messages.push(`row[${r}] is not an object`);
            }
        }
        if (err.error.messages.length > 0)
            return err;
        else
            return { status: 'OK' };
    };
}
exports.default = Table;
