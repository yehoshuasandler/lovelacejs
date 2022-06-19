import Nodule from '../../src/entities/Nodule'
import Table from '../../src/entities/Table'

const input = {
  id: 'ABC',
  label: 'Test Node',
  tables: [
    new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [{ id: 'abc', data: 'row' }]
    })
  ]
}

const getNodeProperties = () => {
  const expectedOutput = {
    id: 'ABC',
    label: 'Test Node',
    type: 'Nodule',
    tables: [
      {
        id: 'XYZ',
        label: 'Test Table',
        rows: [{ id: 'abc', data: 'row' }],
        headers: [ 'id', 'data' ],
        type: 'Table',
        isValid: true
      }
    ],
    isValid: true
  }

  try {
    const nodule = new Nodule(input)
    const nodeProps = nodule.getProperties()
    if (JSON.stringify(nodeProps) == JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    return false
  }
}

const createNodeWithoutTables = () => {
  const input = {
    id: 'ABC',
    label: 'Test Node',
  }

  const expectedOutput = {
    id: 'ABC',
    label: 'Test Node',
    type: 'Nodule',
    tables: [],
    isValid: true
  }

  try {
    const nodule = new Nodule(input)
    const nodeProps = nodule.getProperties()
    if (JSON.stringify(nodeProps) == JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    return false
  }
}

const failToExport = () => {
  const expectedOutput = null
  const nodule = new Nodule({
    id: 'ABC',
    label: 'Test Node',
  })

  const nodeAsTable = nodule.asTable()
  if (expectedOutput === nodeAsTable) return true
  else return false
}

const setTables = () => {
  const initialTable = new Table({
    id: 'XYZ',
    label: 'Test Table',
    rows: [{ id: 'xyz', data: 'lh' }]
  })

  const overrideTable = new Table({
    id: 'XYZ',
    label: 'Test Table',
    rows: [{ id: 'abc', data: 'row' }]
  })

  const expectedOutput = {
    id: 'ABC',
    label: 'Test Node',
    type: 'Nodule',
    tables: [{
      id: 'XYZ',
      label: 'Test Table',
      rows: [{ id: 'abc', data: 'row' }],
      headers: [ 'id', 'data' ],
      type: 'Table',
      isValid: true
    }],
    isValid: true
  }

  try {
    const nodule = new Nodule({
      id: 'ABC',
      label: 'Test Node',
      tables: initialTable
    })
    nodule.setTables(overrideTable)
    const nodeProps = nodule.getProperties()

    if (JSON.stringify(nodeProps) == JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}

export default [
  { name: 'Entity | Get Nodule Properties', test: getNodeProperties },
  { name: 'Entity | Create Nodule Without Tables', test: createNodeWithoutTables },
  { name: 'Entity | Fail to Export', test: failToExport },
  { name: 'Entity | Nodule setTables', test: setTables }
]