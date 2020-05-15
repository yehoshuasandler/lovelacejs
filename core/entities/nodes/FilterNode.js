import Node from '../Node.js'

class FilterNode extends Node {
  constructor (props) {
    super (props)
    this._assignProps(props)
  }

  addFilter = params => {
    const validation = this._validateFilters(params)
    if (validation.status === 'ERR') throw validation
    else this.filterParams = {...this.filterParams, ...params}
  }

  export = () => {
    let rows = this.tables.map(t => t.getRows() ).flat()
    let filters = []
    for (let key in this.filterParams) {
      const filterMethod = (t) => { return t[key] === this.filterParams[key] }
      filters.push(filterMethod)
    }

    filters.forEach(f => {
      rows = rows.filter(f)
    })
    
    return rows
  }
  

  _assignProps = (props) => {
    this.type = 'Filter'
    this.filterParams = props.filterParams || []
  }

  _validateFilters = params => {
    const err = {
      status: 'ERR',
      error: {
        label: 'Filter Parameter are not valid',
        messages: []
      }
    }

    if (typeof params !== 'object') {
      const paramsType = typeof params
      err.error.messages.push(`Filter was of type ${paramsType} should be an object`)
    }

    if (err.error.messages.length > 0) return err
    else return { status: 'OK' }
  }
}

export default FilterNode
