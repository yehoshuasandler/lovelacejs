class Table {
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
    return {
      id: this.id,
      label: this.label,
      rows: this.rows,
      type: this.type,
      isValid: this.isValid
    }
  }

  getRows = () => this.rows

  _assignProps = props => {
    this.id = props.id
    this.label = props.label
    this.type = 'Table' 
    this.isValid = true

    if (!Array.isArray(props.rows)) this.rows = [props.rows]
    else this.rows = props.rows
  }

  _validateConstructionProps = props => {
    const err = {
      status: 'ERR',
      error: {
        label: 'Error Creating Table',
        messages: []
      }
    }

    if(!props) {
      err.error.messages.push('No props on creation of Table')
      return err
    }
    if (!props.id) err.error.messages.push('No id on creation of Table')
    if (!props.label) err.error.messages.push('No label on creation of Table')

    const validateRowsErrors = this._validateRows(props.rows)
    if (validateRowsErrors.length > 0) {
      validateRowsErrors.forEach(e => {
        err.error.messages.push(e)
      })
    }
  
    if (err.error.messages.length === 0){
      return { status: 'OK' }
    } else{
      return err
    }
  }

  _validateRows = rowsToImport => {
    let rows = []
    if (!Array.isArray(rowsToImport)) rows = [rowsToImport]
    else rows = rowsToImport

    const errorMesages = []

    if (rows.length === 0) {
      errorMesages.push('No Tables imported')
    }

    for (let r = 0; r < rows.length; r++) {
      if (typeof rows[r] !== 'object') {
        errorMesages.push(`row[${r}] is not an object`)
      }
    }

    return errorMesages
  }
}

export default Table
