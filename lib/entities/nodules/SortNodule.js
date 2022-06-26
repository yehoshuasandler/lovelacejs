"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortTypes_1 = require("../../constants/sortTypes");
const Nodule_1 = require("../Nodule");
class SortNodule extends Nodule_1.default {
    sortValueType = sortTypes_1.sortValueTypes.ALPHABETIC;
    sortDirection = sortTypes_1.sortDirections.ASCENDING;
    sortKey = '';
    constructor(props) {
        super(props);
        const { sortValueType, sortDirection, sortKey } = props;
        if (sortValueType)
            this.sortValueType = sortValueType;
        if (sortDirection)
            this.sortDirection = sortDirection;
        if (sortKey)
            this.sortKey = sortKey;
    }
    export = () => {
        const { sortValueType, sortDirection, sortKey } = this;
        const { NUMERIC } = sortTypes_1.sortValueTypes;
        const { DESCENDING } = sortTypes_1.sortDirections;
        let sortMethod;
        if (sortValueType === NUMERIC)
            sortMethod = (a, b) => {
                const aValue = a[sortKey];
                const bValue = b[sortKey];
                return aValue - bValue;
            };
        else
            sortMethod = (a, b) => {
                const aValue = a[sortKey];
                const bValue = b[sortKey];
                return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
            };
        let rows = this.tables.map(t => t.export()).flat().sort(sortMethod);
        if (sortDirection === DESCENDING)
            rows = rows.reverse();
        return rows;
    };
}
exports.default = SortNodule;
