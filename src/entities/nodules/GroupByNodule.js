import Nodule from '../Nodule.js'
import Table from '../Table.js'

class GroupByNodule extends Nodule {
  constructor (props) {
    super (props)
    this._assignProps(props)
  }

  /* Overload the Nodule Method
  Returns an Array of Tables with modified ids */
  asTable = () => {
    const exports = this.export()
    const tables = []
    for (let key in exports) {
      const newTableProps = {
        id: `${this.id}-${key}`,
        label: `${this.label} by ${key}`,
        rows: exports[key]
      }
      const table = new Table(newTableProps)
      tables.push(table)
    }
    return tables
  }

  export = () => {
    const { groupByValue } = this
    const rows = this.tables.map(t => t.export() ).flat()
    const groupedByRows = rows.reduce((groups, r) => {
      const val = r[groupByValue]
      groups[val] = groups[val] || []
      groups[val].push(r)
      return groups
    }, {})
    return groupedByRows
  }

  setGroupByValue = value => {
    const valueValidation = this._validateGroupByValue(value)
    if(valueValidation.status === 'ERR') throw valueValidation
    else this.groupByValue = value
  }

  _assignProps = props => {
    if (props.groupByValue) this.setGroupByValue(props.groupByValue)
  }

  _validateGroupByValue = value => {
    const err = {
      status: 'ERR',
      error: {
        label: 'Filter Parameter are not valid',
        messages: []
      }
    }

    if (typeof value !== 'string') {
      const valueType = typeof value
      err.error.messages.push(`GroupBy value was of type ${valueType}, should be a string`)
    } else return { status: 'OK' }
  }
}

export default GroupByNodule
