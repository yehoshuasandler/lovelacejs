"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodule_1 = require("../Nodule");
class JoinNodule extends Nodule_1.default {
    baseTableLabel = '';
    joinParams = [];
    constructor(props) {
        super(props);
        if (props.joinBy)
            this.setJoinBy(props.joinBy);
    }
    export = () => {
        const baseTable = this.tables.find(t => t.label === this.baseTableLabel);
        if (!baseTable)
            return [];
        const baseTableRows = baseTable.export();
        const tablesToJoin = this.tables.filter(t => {
            return t.label !== this.baseTableLabel;
        });
        const relatedTables = this.joinParams.map(joinParam => {
            const foreignTable = tablesToJoin.find(t => t.label === joinParam.foreignTable);
            if (!foreignTable)
                return [];
            const foreignTableRows = foreignTable.export();
            const mergedRows = baseTableRows.map(baseRow => {
                const matchingForeignRow = foreignTableRows.find(foreignRow => {
                    return baseRow[joinParam.primaryTableKey] === foreignRow[joinParam.matchingKey];
                });
                let rowToMerge = {};
                for (let key in matchingForeignRow) {
                    rowToMerge[`${joinParam.foreignTable}::${key}`] = matchingForeignRow[key];
                }
                return { ...baseRow, ...rowToMerge };
            });
            return mergedRows;
        });
        return relatedTables[0];
    };
    setJoinBy = (joinBy) => {
        const joinByValidation = this.validateJoinBy(joinBy);
        if (joinByValidation.status === 'ERR')
            throw joinByValidation;
        else {
            this.baseTableLabel = joinBy.baseTableLabel;
            this.joinParams = joinBy.joinParams;
        }
    };
    validateJoinBy = (joinBy) => {
        const err = {
            status: 'ERR',
            error: {
                label: 'JoinBy Parameters are not valid',
                messages: []
            }
        };
        const { baseTableLabel, joinParams } = joinBy;
        if (!baseTableLabel)
            err.error.messages.push('No baseTableLabel provided');
        if (!Array.isArray(joinParams)) {
            const joinParamsType = typeof joinParams;
            err.error.messages.push(`Keys was of type ${joinParamsType} should be an array`);
            return err;
        }
        for (let p = 0; p < joinParams.length; p++) {
            if (typeof joinParams[p] !== 'object')
                err.error.messages.push(`joinParams[${p}] is not an object`);
        }
        if (err.error.messages.length > 0)
            return err;
        else
            return { status: 'OK' };
    };
}
exports.default = JoinNodule;
