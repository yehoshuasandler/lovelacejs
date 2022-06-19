import { transformNoduleConstructionProps, transformStruct } from '../../types/noduleTypes';
import { tableRow } from '../../types/tableTypes';
import Nodule from '../Nodule';
declare class TransformNodule extends Nodule {
    structure: transformStruct;
    constructor(props: transformNoduleConstructionProps);
    export: () => tableRow[];
    setStructure: (struct: transformStruct) => void;
    private validateStructureProps;
}
export default TransformNodule;
