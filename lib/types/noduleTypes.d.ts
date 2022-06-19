import Table from "../entities/Table";
import { tableRow } from "./tableTypes";
declare type noduleConstructorProps = {
    id: string;
    label: string;
    type?: 'Nodule';
    tables?: Table[];
};
declare type filterType = 'EQUAL' | 'GREATER' | 'GREATEREQUAL' | 'LESSER' | 'LESSEREQUAL';
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
export { noduleConstructorProps, filterNoduleConstructionProps, filterType, filterParams, joinParam, joinBy, joinNoduleConstructionProps, transformStruct, transformNoduleConstructionProps, groupByNoduleConstructorProps, groupedByRows };
