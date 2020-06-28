import Table from './Table.js'

class Nodule {
  constructor (props) {
    const validatePropsResponse = this._validateConstructionProps(props)
    if (validatePropsResponse.status === 'ERR') {
      throw validatePropsResponse
    }
    else {
      this._assignProps(props)
    }
  }

  asTable = () => {
    if (!this.export) return null
    try {
      return new Table({
        id: this.id,
        label: this.label,
        rows: this.export()
      })
    } catch (err) {
      throw err
    }
  }

  getProperties = () => {
    let tables = []
    if (!Array.isArray(this.tables)) tables = []
    else if (this.tables.length === 0) tables = []
    else tables = this.tables.map(t => {
      return t.getProperties()
    })

    const properties = {
      id: this.id,
      label: this.label,
      type: this.type,
      tables: tables,
      isValid: this.isValid
    }

    return properties
  }

  importTables = tablesToImport => {
    console.log('Function importTables has been depricated, please use "setTables()"')
    this.setTables(tablesToImport)
  }

  setTables = tablesToSet => {
    const validateTablesResponse = this._validateTables(tablesToSet)
    if (validateTablesResponse.status === 'ERR') {
      throw validateTablesResponse
    } else {
      let tables = []
      if (!Array.isArray(tablesToSet)) tables = [tablesToSet]
      else tables = tablesToSet
      this.tables = tables
    }
  }
  
  _assignProps = props => {
    this.id = props.id
    this.label = props.label
    this.type = 'Nodule'
    this.isValid = true

    if (props.tables) this.setTables(props.tables)
    else this.tables = []
  }

  _validateTables = tablesToImport => {
    const err = {
      status: 'ERR',
      error: {
        label: 'Not all imported Tables are valid',
        messages: []
      }
    }

    let tables = []
    if (!tablesToImport) {
      err.error.messages.push('No Tables imported')
      return err
    } else if (!Array.isArray(tablesToImport)) {
      tables = [tablesToImport]
    } else tables = tablesToImport

    for (let t = 0; t < tables.length; t++) {
      if (!tables[t].isValid) {
        err.error.messages.push(`Table[${t}] is not valid`)
      }
    }

    if (err.error.messages.length === 0){
      return { status: 'OK' }
    } else{
      return err
    }
  }

  _validateConstructionProps = (props) => {
    const err = {
      status: 'ERR',
      error: {
        label: 'Error Creating Node',
        messages: []
      }
    }
    if (!props.id) err.error.messages.push('No id on creation of Node')
    if (!props.label) err.error.messages.push('No label on creation of Node')
  
    if (err.error.messages.length === 0){
      return { status: 'OK' }
    } else{
      return err
    }
  }
}

export default Nodule
