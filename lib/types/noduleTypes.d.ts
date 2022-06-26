import filterTypes from "../constants/filterTypes";
import { sortValueTypes, sortDirections } from "../constants/sortTypes";
import Table from "../entities/Table";
import { tableRow } from "./tableTypes";
declare type noduleConstructorProps = {
    id: string;
    label: string;
    type?: 'Nodule';
    tables?: Table[];
};
declare type filterKeys = keyof typeof filterTypes;
declare type filterValues = typeof filterTypes[filterKeys];
declare type filterType = filterValues;
declare type filterParams = Record<string, string | number>;
declare type filterNoduleConstructionProps = noduleConstructorProps & {
    filterType: filterType;
} & {
    filterParams: filterParams;
};
declare type joinParam = {
    foreignTable: string;
    primaryTableKey: string;
    matchingKey: string;
};
declare type joinBy = {
    baseTableLabel: string;
    joinParams: joinParam[];
};
declare type joinNoduleConstructionProps = noduleConstructorProps & {
    joinBy: joinBy;
};
declare type transformStruct = Record<string, string>;
declare type transformNoduleConstructionProps = noduleConstructorProps & {
    structure: transformStruct;
};
declare type groupByNoduleConstructorProps = noduleConstructorProps & {
    groupByValue: string;
};
declare type groupedByRows = Record<string, tableRow[]>;
declare type sortDirectionKeys = keyof typeof sortDirections;
declare type sortDirectionValues = typeof sortDirections[sortDirectionKeys];
declare type sortDirection = sortDirectionValues;
declare type sortValueTypeKeys = keyof typeof sortValueTypes;
declare type sortValueTypeValues = typeof sortValueTypes[sortValueTypeKeys];
declare type sortValueType = sortValueTypeValues;
declare type sortKey = string;
declare type sortNoduleConstructorProps = noduleConstructorProps & {
    sortDirection: sortDirection;
    sortValueType: sortValueType;
    sortKey: sortKey;
};
export { noduleConstructorProps, filterNoduleConstructionProps, filterType, filterParams, joinParam, joinBy, joinNoduleConstructionProps, transformStruct, transformNoduleConstructionProps, groupByNoduleConstructorProps, groupedByRows, sortDirection, sortValueType, sortKey, sortNoduleConstructorProps, };
