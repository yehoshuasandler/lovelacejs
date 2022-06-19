declare type tableConstructorProps = {
    id: string;
    label: string;
    rows: tableRows;
    type?: 'Table';
};
declare type tableRow = Record<string, unknown>;
declare type tableRows = tableRow[];
declare type tableProps = {
    id: string;
    label: string;
    rows: tableRows;
    headers: string[];
    type: 'Table';
    isValid: boolean;
};
export { tableConstructorProps, tableRow, tableRows, tableProps };
