import { tableConstructorProps, tableProps, tableRows } from "../types/tableTypes";
declare class Table {
    id: string;
    label: string;
    rows: tableRows;
    type: 'Table';
    isValid: boolean;
    constructor(props: tableConstructorProps);
    getProperties: () => tableProps;
    get headers(): string[];
    export: () => tableRows;
    setRows: (rows: tableRows) => void;
    private validateConstructionProps;
    private validateRows;
}
export default Table;
