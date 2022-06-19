import { noduleConstructorProps } from '../types/noduleTypes';
import { tableProps, tableRows } from '../types/tableTypes';
import Table from './Table';
declare abstract class Nodule {
    id: string;
    label: string;
    type: 'Nodule';
    isValid: boolean;
    tables: Table[];
    constructor(props: noduleConstructorProps);
    abstract export(): tableRows;
    asTable: () => Table | null;
    getProperties: () => {
        id: string;
        label: string;
        type: "Nodule";
        tables: tableProps[];
        isValid: boolean;
    };
    setTables: (tablesToSet: Table[]) => void;
    private validateTables;
    private validateConstructionProps;
}
export default Nodule;
