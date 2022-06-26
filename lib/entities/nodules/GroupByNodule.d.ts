import { groupByNoduleConstructorProps, groupedByRows } from '../../types/noduleTypes';
import Nodule from '../Nodule';
import Table from '../Table';
declare class GroupByNodule extends Nodule {
    groupByValue: string;
    constructor(props: groupByNoduleConstructorProps);
    asTables: () => Table[];
    asTable: () => never;
    export: () => never;
    exportRowGroups: () => groupedByRows;
    setGroupByValue: (value: string) => void;
    private validateGroupByValue;
}
export default GroupByNodule;
