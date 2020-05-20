class Node {
  constructor (props) {
    const validatePropsResponse = this._validateConstructionProps(props)
    if (validatePropsResponse.status === 'ERR') {
      this.isValid = false
      throw validatePropsResponse
    }
    else {
      this._assignProps(props)
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
    const validateTablesResponse = this._validateTables(tablesToImport)
    if (validateTablesResponse.status === 'ERR') {
      throw validateTablesResponse
    } else {
      let tables = []
      if (!Array.isArray(tablesToImport)) tables = [tablesToImport]
      else tables = tablesToImport
      this.tables = tables
    }
  }
  
  _assignProps = props => {
    this.id = props.id
    this.label = props.label
    this.type = 'Node'
    this.isValid = true

    if (props.tables) this.importTables(props.tables)
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

export default Node
