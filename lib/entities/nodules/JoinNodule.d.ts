import { joinBy, joinNoduleConstructionProps, joinParam } from '../../types/noduleTypes';
import Nodule from '../Nodule';
declare class JoinNodule extends Nodule {
    baseTableLabel: string;
    joinParams: joinParam[];
    constructor(props: joinNoduleConstructionProps);
    export: () => {
        [x: string]: unknown;
    }[];
    setJoinBy: (joinBy: joinBy) => void;
    private validateJoinBy;
}
export default JoinNodule;
