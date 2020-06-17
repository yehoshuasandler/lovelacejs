import Node from '../Node.js'

class TransformNode extends Node {
  constructor (props) {
    super(props)
    this._assignProps(props)
  }

  export = () => {
    const rows = this.tables.map(t => t.export()).flat()
    
    const transformedRows = rows.map(r => {
      let mapShape = {}
      for (const [ key, value ] of Object.entries(this.structure)) {
        mapShape[value] = r[key]
      }
      return mapShape
    })
    return transformedRows
  }

  setStructure = struct => {
    const structureValidation = this._validateStructureProps(struct)
    if (structureValidation.status === 'ERR') throw structureValidation
    else this.structure = struct
  }

  _assignProps = props => {
    if (props.structure) this.setStructure(props.structure)
  }

  _validateStructureProps = struct => {
    const err = {
      status: 'ERR',
      error: {
        label: 'Ptructure Parameters are not valid',
        messages: []
      }
    }

    if (!struct) {
      err.error.messages.push('No structure provided')
      return err
    }

    for (let key in struct) {
      if (typeof struct[key] !== 'string')
        err.error.messages.push(`Key [${struct}] is not a String`)
    }

    if (err.error.messages.length > 0) return err
    else return { status: 'OK' }
  }
}

export default TransformNode
