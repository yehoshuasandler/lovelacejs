import { errType } from '../../types/errType'
import { groupByNoduleConstructorProps, groupedByRows } from '../../types/noduleTypes'
import { tableConstructorProps } from '../../types/tableTypes'
import Nodule from '../Nodule'
import Table from '../Table'

class GroupByNodule extends Nodule {
  groupByValue: string = ''

  constructor (props: groupByNoduleConstructorProps) {
    super (props)
    if (props.groupByValue) this.setGroupByValue(props.groupByValue)
  }

  asTables = (): Table[] => {
    const exports = this.exportRowGroups()
    const tables = []
    for (let key in exports) {
      const newTableProps: tableConstructorProps = {
        id: `${this.id}-${key}`,
        label: `${this.label} by ${key}`,
        rows: exports[key]
      }
      const table = new Table(newTableProps)
      tables.push(table)
    }
    return tables
  }

  asTable = () => {
    throw new Error('"asTable()" can not be called by GroupByNodule. Call "asTables()"')
  }

  export = () => {
    throw new Error('"export()" can not be called by GroupByNodule. Call "exportTables()"')
  }

  exportRowGroups = (): groupedByRows => {
    const { groupByValue } = this
    const rows = this.tables.map(t => t.export() ).flat()
    const groupedByRows = rows.reduce((groups: groupedByRows, r) => {
      const val: string = r[groupByValue] as string
      groups[val] = groups[val] || []
      groups[val].push(r)
      return groups
    }, {})
    return groupedByRows
  }

  setGroupByValue = (value: string) => {
    const valueValidation = this.validateGroupByValue(value)
    if(valueValidation.status === 'ERR') throw valueValidation
    else this.groupByValue = value
  }

  private validateGroupByValue = (value: string) => {
    const err: errType = {
      status: 'ERR',
      error: {
        label: 'Filter Parameter are not valid',
        messages: []
      }
    }

    if (typeof value !== 'string') {
      const valueType = typeof value
      err.error.messages.push(`GroupBy value was of type ${valueType}, should be a string`)
    }

    if (err.error.messages.length > 0) return err
    else return { status: 'OK' }
  }
}

export default GroupByNodule
