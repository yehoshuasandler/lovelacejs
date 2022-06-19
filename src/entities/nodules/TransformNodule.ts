import { errType } from '../../types/errType'
import { transformNoduleConstructionProps, transformStruct } from '../../types/noduleTypes'
import { tableRow } from '../../types/tableTypes'
import Nodule from '../Nodule'

class TransformNodule extends Nodule {
  structure: transformStruct = {}

  constructor (props: transformNoduleConstructionProps) {
    super(props)
    if (props.structure) this.setStructure(props.structure)
  }

  export = () => {
    const rows = this.tables.map(t => t.export()).flat()
    
    const transformedRows = rows.map(r => {
      let mapShape: tableRow = {}
      for (const [ key, value ] of Object.entries(this.structure)) {
        mapShape[value] = r[key]
      }
      return mapShape
    })
    return transformedRows
  }

  setStructure = (struct: transformStruct) => {
    const structureValidation = this.validateStructureProps(struct)
    if (structureValidation.status === 'ERR') throw structureValidation
    else this.structure = struct
  }

  private validateStructureProps = (struct: transformStruct) => {
    const err: errType = {
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

export default TransformNodule
