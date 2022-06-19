import { errType } from '../types/errType'
import { noduleConstructorProps } from '../types/noduleTypes'
import { tableProps, tableRows } from '../types/tableTypes'
import Table from './Table'

abstract class Nodule {
  id: string
  label: string
  type: 'Nodule'
  isValid: boolean
  tables: Table[] = []

  constructor (props: noduleConstructorProps) {
    const validatePropsResponse = this.validateConstructionProps(props)
    if (validatePropsResponse.status === 'ERR') throw validatePropsResponse
    else {
      this.id = props.id
      this.label = props.label
      this.type = 'Nodule'
      this.isValid = true
  
      if (props.tables) this.setTables(props.tables)
    }
  }

  abstract export () : tableRows

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
    let tables: tableProps[] = []
    if (!Array.isArray(this.tables)) tables = []
    else if (this.tables.length === 0) tables = []
    else tables = this.tables.map((t: Table) => {
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

  setTables = (tablesToSet: Table[]) => {
    const validateTablesResponse = this.validateTables(tablesToSet)
    if (validateTablesResponse.status === 'ERR') {
      throw validateTablesResponse
    } else {
      let tables: Table[] = []
      if (!Array.isArray(tablesToSet)) tables = [tablesToSet]
      else tables = tablesToSet
      this.tables = tables
    }
  }

  private validateTables = (tablesToImport: Table[]) => {
    const err: errType = {
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

  private validateConstructionProps = (props: noduleConstructorProps) => {
    const err: errType = {
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
