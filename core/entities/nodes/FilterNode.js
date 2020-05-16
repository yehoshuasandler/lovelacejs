import Node from '../Node.js'
import filterTypes from '../../constants/filterTypes.js'

class FilterNode extends Node {
  constructor (props) {
    super (props)
    this._assignProps(props)
  }

  addFilter = params => {
    const filterValidation = this._validateFilters(params)
    if (filterValidation.status === 'ERR') throw filterValidation
    else this.filterParams = {...this.filterParams, ...params}
  }

  setType = type => {
    const typeValidation = this._validateType(type)
    if (typeValidation.status === 'ERR') throw typeValidation
    else this.type = type
  }

  export = () => {
    let rows = this.tables.map(t => t.getRows() ).flat()
    let filters = this._createFilterMethods()
    for (let key in this.filterParams) {
      const filterMethod = t => {
        return t[key] === this.filterParams[key]
      }
      filters.push(filterMethod)
    }

    filters.forEach(f => {
      rows = rows.filter(f)
    })
    
    return rows
  }
  

  _assignProps = props => {
    this.filterParams = props.filterParams || {}
    if (props.type) this.setType(props.type)
  }

  _createFilterMethods = () => {
    let filters = []
    for (let key in this.filterParams) {
      let filterMethod = {}
      if (this.type === filterTypes.EQUAL){
        filterMethod = t => {
          return t[key] === this.filterParams[key]
        }
      }
      filters.push(filterMethod)
    }
    return filters
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

  _validateType = type => {
    const err = {
      status: 'ERR',
      error: {
        label: 'Filter Type is not valid',
        messages: []
      }
    }

    if (Object.values(filterTypes).indexOf(type) < 0) {
      err.error.messages.push(`Type must be one of: ${Object.keys(filterTypes)}`)
    }

    if (err.error.messages.length > 0) return err
    else return { status: 'OK' }
  }
}

export default FilterNode
