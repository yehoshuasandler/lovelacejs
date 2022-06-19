import Nodule from '../Nodule'
import filterTypes from '../../constants/filterTypes'
import { filterNoduleConstructionProps, filterParams, filterType } from '../../types/noduleTypes'
import { errType } from '../../types/errType'

class FilterNodule extends Nodule {
  filterType?: filterType
  filterParams: filterParams

  constructor (props: filterNoduleConstructionProps) {
    super (props)

    this.filterParams = props.filterParams
    if (props.filterType) this.setFilterType(props.filterType)
  }

  addFilter = (params: filterParams) => {
    const filterValidation = this.validateFilters(params)
    if (filterValidation.status === 'ERR') throw filterValidation
    else this.filterParams = {...this.filterParams, ...params}
  }

  setFilterType = (filterType: filterType) => {
    const typeValidation = this.validateType(filterType)
    if (typeValidation.status === 'ERR') throw typeValidation
    else this.filterType = filterType
  }

  export = () => {
    let rows = this.tables.map(t => t.export() ).flat()
    let filters = this.createFilterMethods()

    filters.forEach((f: any) => { // TODO: I dont like the any, gotta find a type solution
      rows = rows.filter(f)
    })
    
    return rows
  }

  private createFilterMethods = (): Function[]  => {
    const typeValidation = this.validateType(this.filterType)
    if (typeValidation.status !== 'OK') throw typeValidation

    let filters: Function[] = []
    for (let key in this.filterParams) {
      let filterMethod: Function = () => {}
      if (this.filterType === filterTypes.EQUAL)
        filterMethod = (t: filterParams) => t[key] === this.filterParams[key]
      else if (this.filterType === filterTypes.GREATER)
        filterMethod = (t: filterParams) => t[key] > this.filterParams[key]
      else if (this.filterType === filterTypes.GREATEREQUAL)
        filterMethod = (t: filterParams) => t[key] >= this.filterParams[key]
      else if (this.filterType === filterTypes.LESSER)
        filterMethod = (t: filterParams) => t[key] < this.filterParams[key]
      else if (this.filterType === filterTypes.LESSEREQUAL)
        filterMethod = (t: filterParams) => t[key] <= this.filterParams[key]

      filters.push(filterMethod)
    }
    return filters
  }

  private validateFilters = (params: filterParams) => {
    const err: errType = {
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

  private validateType = (type?: filterType) => {
    const err: errType = {
      status: 'ERR',
      error: {
        label: 'Filter Type is not valid',
        messages: []
      }
    }

    if(!type) err.error.messages.push(`Type must be one of: ${Object.keys(filterTypes)}`)
    else if (Object.values(filterTypes).indexOf(type) < 0) {
      err.error.messages.push(`Type must be one of: ${Object.keys(filterTypes)}`)
    }

    if (err.error.messages.length > 0) return err
    else return { status: 'OK' }
  }
}

export default FilterNodule
