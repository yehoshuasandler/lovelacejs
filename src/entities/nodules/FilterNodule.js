import Nodule from '../Nodule.js'
import filterTypes from '../../constants/filterTypes.js'

class FilterNodule extends Nodule {
  constructor (props) {
    super (props)
    this._assignProps(props)
  }

  addFilter = params => {
    const filterValidation = this._validateFilters(params)
    if (filterValidation.status === 'ERR') throw filterValidation
    else this.filterParams = {...this.filterParams, ...params}
  }

  setFilterType = filterType => {
    const typeValidation = this._validateType(filterType)
    if (typeValidation.status === 'ERR') throw typeValidation
    else this.filterType = filterType
  }

  export = () => {
    let rows = this.tables.map(t => t.export() ).flat()
    let filters = this._createFilterMethods()

    filters.forEach(f => {
      rows = rows.filter(f)
    })
    
    return rows
  }
  
  _assignProps = props => {
    this.filterParams = props.filterParams || {}
    if (props.filterType) this.setFilterType(props.filterType)
  }

  _createFilterMethods = () => {
    const typeValidation = this._validateType(this.filterType)
    if (typeValidation.status !== 'OK') throw typeValidation

    let filters = []
    for (let key in this.filterParams) {
      let filterMethod = {}
      if (this.filterType === filterTypes.EQUAL)
        filterMethod = t => t[key] === this.filterParams[key]
      else if (this.filterType === filterTypes.GREATER)
        filterMethod = t => t[key] > this.filterParams[key]
      else if (this.filterType === filterTypes.GREATEREQUAL)
        filterMethod = t => t[key] >= this.filterParams[key]
      else if (this.filterType === filterTypes.LESSER)
        filterMethod = t => t[key] < this.filterParams[key]
      else if (this.filterType === filterTypes.LESSEREQUAL)
        filterMethod = t => t[key] <= this.filterParams[key]

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

export default FilterNodule
