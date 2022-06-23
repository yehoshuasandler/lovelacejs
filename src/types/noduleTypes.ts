import filterTypes from "../constants/filterTypes"
import Table from "../entities/Table"
import { tableRow } from "./tableTypes"

type noduleConstructorProps = {
  id: string,
  label: string,
  type?: 'Nodule'
  tables?: Table[]
}

type filterKeys = keyof typeof filterTypes
type filterValues = typeof filterTypes[filterKeys]
type filterType = filterValues
type filterParams = Record<string, string | number>
type filterNoduleConstructionProps = noduleConstructorProps & {filterType: filterType} & {filterParams: filterParams}

type joinParam = { foreignTable: string, primaryTableKey: string, matchingKey: string }
type joinBy = { baseTableLabel: string, joinParams: joinParam[] }
type joinNoduleConstructionProps = noduleConstructorProps & { joinBy: joinBy }

type transformStruct = Record<string, string>
type transformNoduleConstructionProps = noduleConstructorProps & { structure: transformStruct }

type groupByNoduleConstructorProps = noduleConstructorProps & { groupByValue: string }

type groupedByRows = Record<string, tableRow[]>

export {
  noduleConstructorProps,
  filterNoduleConstructionProps,
  filterType,
  filterParams,
  joinParam,
  joinBy,
  joinNoduleConstructionProps,
  transformStruct,
  transformNoduleConstructionProps,
  groupByNoduleConstructorProps,
  groupedByRows
}
