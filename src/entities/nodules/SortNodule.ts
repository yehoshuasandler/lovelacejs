import { sortDirections, sortValueTypes } from '../../constants/sortTypes'
import { sortDirection, sortKey, sortNoduleConstructorProps, sortValueType } from '../../types/noduleTypes'
import { tableRow } from '../../types/tableTypes'
import Nodule from '../Nodule'

class SortNodule extends Nodule {
  sortValueType: sortValueType = sortValueTypes.ALPHABETIC
  sortDirection: sortDirection = sortDirections.ASCENDING
  sortKey: sortKey = ''

  constructor (props: sortNoduleConstructorProps) {
    super(props)
    const { sortValueType, sortDirection, sortKey } = props
    if (sortValueType) this.sortValueType = sortValueType
    if (sortDirection) this.sortDirection = sortDirection
    if (sortKey) this.sortKey = sortKey
  }
  
  export = () => {
    const { sortValueType, sortDirection, sortKey } = this
    const { NUMERIC } = sortValueTypes
    const { DESCENDING } = sortDirections

    let sortMethod
    if (sortValueType === NUMERIC) sortMethod = (a: tableRow, b: tableRow) => {
      const aValue = a[sortKey] as number
      const bValue = b[sortKey] as number
      return aValue - bValue
    }
    else sortMethod = (a: tableRow, b: tableRow) => {
      const aValue = a[sortKey] as string
      const bValue = b[sortKey] as string
      return aValue.toLowerCase().localeCompare(bValue.toLowerCase())
    }

    let rows = this.tables.map(t => t.export()).flat().sort(sortMethod)

    if (sortDirection === DESCENDING) rows = rows.reverse()

    return rows
  }
}

export default SortNodule
