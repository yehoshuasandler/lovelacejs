"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodule_1 = require("../Nodule");
const filterTypes_1 = require("../../constants/filterTypes");
class FilterNodule extends Nodule_1.default {
    filterType;
    filterParams;
    constructor(props) {
        super(props);
        this.filterParams = props.filterParams;
        if (props.filterType)
            this.setFilterType(props.filterType);
    }
    addFilter = (params) => {
        const filterValidation = this.validateFilters(params);
        if (filterValidation.status === 'ERR')
            throw filterValidation;
        else
            this.filterParams = { ...this.filterParams, ...params };
    };
    setFilterType = (filterType) => {
        const typeValidation = this.validateType(filterType);
        if (typeValidation.status === 'ERR')
            throw typeValidation;
        else
            this.filterType = filterType;
    };
    export = () => {
        let rows = this.tables.map(t => t.export()).flat();
        let filters = this.createFilterMethods();
        filters.forEach((f) => {
            rows = rows.filter(f);
        });
        return rows;
    };
    createFilterMethods = () => {
        const typeValidation = this.validateType(this.filterType);
        if (typeValidation.status !== 'OK')
            throw typeValidation;
        let filters = [];
        for (let key in this.filterParams) {
            let filterMethod = () => { };
            if (this.filterType === filterTypes_1.default.EQUAL)
                filterMethod = (t) => t[key] === this.filterParams[key];
            else if (this.filterType === filterTypes_1.default.GREATER)
                filterMethod = (t) => t[key] > this.filterParams[key];
            else if (this.filterType === filterTypes_1.default.GREATEREQUAL)
                filterMethod = (t) => t[key] >= this.filterParams[key];
            else if (this.filterType === filterTypes_1.default.LESSER)
                filterMethod = (t) => t[key] < this.filterParams[key];
            else if (this.filterType === filterTypes_1.default.LESSEREQUAL)
                filterMethod = (t) => t[key] <= this.filterParams[key];
            filters.push(filterMethod);
        }
        return filters;
    };
    validateFilters = (params) => {
        const err = {
            status: 'ERR',
            error: {
                label: 'Filter Parameter are not valid',
                messages: []
            }
        };
        if (typeof params !== 'object') {
            const paramsType = typeof params;
            err.error.messages.push(`Filter was of type ${paramsType} should be an object`);
        }
        if (err.error.messages.length > 0)
            return err;
        else
            return { status: 'OK' };
    };
    validateType = (type) => {
        const err = {
            status: 'ERR',
            error: {
                label: 'Filter Type is not valid',
                messages: []
            }
        };
        if (!type)
            err.error.messages.push(`Type must be one of: ${Object.keys(filterTypes_1.default)}`);
        else if (Object.values(filterTypes_1.default).indexOf(type) < 0) {
            err.error.messages.push(`Type must be one of: ${Object.keys(filterTypes_1.default)}`);
        }
        if (err.error.messages.length > 0)
            return err;
        else
            return { status: 'OK' };
    };
}
exports.default = FilterNodule;
