import { sortDirection, sortKey, sortNoduleConstructorProps, sortValueType } from '../../types/noduleTypes';
import { tableRow } from '../../types/tableTypes';
import Nodule from '../Nodule';
declare class SortNodule extends Nodule {
    sortValueType: sortValueType;
    sortDirection: sortDirection;
    sortKey: sortKey;
    constructor(props: sortNoduleConstructorProps);
    export: () => tableRow[];
}
export default SortNodule;
