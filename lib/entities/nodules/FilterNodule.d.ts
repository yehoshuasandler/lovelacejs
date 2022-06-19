import Nodule from '../Nodule';
import { filterNoduleConstructionProps, filterParams, filterType } from '../../types/noduleTypes';
declare class FilterNodule extends Nodule {
    filterType?: filterType;
    filterParams: filterParams;
    constructor(props: filterNoduleConstructionProps);
    addFilter: (params: filterParams) => void;
    setFilterType: (filterType: filterType) => void;
    export: () => import("../../types/tableTypes").tableRow[];
    private createFilterMethods;
    private validateFilters;
    private validateType;
}
export default FilterNodule;
