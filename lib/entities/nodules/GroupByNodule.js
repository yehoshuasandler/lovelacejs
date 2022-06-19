"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodule_1 = require("../Nodule");
const Table_1 = require("../Table");
class GroupByNodule extends Nodule_1.default {
    groupByValue = '';
    constructor(props) {
        super(props);
        if (props.groupByValue)
            this.setGroupByValue(props.groupByValue);
    }
    asTables = () => {
        const exports = this.exportTables();
        const tables = [];
        for (let key in exports) {
            const newTableProps = {
                id: `${this.id}-${key}`,
                label: `${this.label} by ${key}`,
                rows: exports[key]
            };
            const table = new Table_1.default(newTableProps);
            tables.push(table);
        }
        return tables;
    };
    asTable = () => {
        throw new Error('"asTable()" can not be called by GroupByNodule. Call "asTables()"');
    };
    export = () => {
        throw new Error('"export()" can not be called by GroupByNodule. Call "exportTables()"');
    };
    exportTables = () => {
        const { groupByValue } = this;
        const rows = this.tables.map(t => t.export()).flat();
        const groupedByRows = rows.reduce((groups, r) => {
            const val = r[groupByValue];
            groups[val] = groups[val] || [];
            groups[val].push(r);
            return groups;
        }, {});
        return groupedByRows;
    };
    setGroupByValue = (value) => {
        const valueValidation = this.validateGroupByValue(value);
        if (valueValidation.status === 'ERR')
            throw valueValidation;
        else
            this.groupByValue = value;
    };
    validateGroupByValue = (value) => {
        const err = {
            status: 'ERR',
            error: {
                label: 'Filter Parameter are not valid',
                messages: []
            }
        };
        if (typeof value !== 'string') {
            const valueType = typeof value;
            err.error.messages.push(`GroupBy value was of type ${valueType}, should be a string`);
        }
        if (err.error.messages.length > 0)
            return err;
        else
            return { status: 'OK' };
    };
}
exports.default = GroupByNodule;
