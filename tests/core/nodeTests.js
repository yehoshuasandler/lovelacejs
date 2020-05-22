import Node from '../../core/entities/Node.js'
import Table from '../../core/entities/Table.js'

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
    type: 'Node',
    tables: [
      {
        id: 'XYZ',
        label: 'Test Table',
        rows: [{ id: 'abc', data: 'row' }],
        type: 'Table',
        isValid: true
      }
    ],
    isValid: true
  }

  try {
    const node = new Node(input)
    const nodeProps = node.getProperties()
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
    type: 'Node',
    tables: [],
    isValid: true
  }

  try {
    const node = new Node(input)
    const nodeProps = node.getProperties()
    if (JSON.stringify(nodeProps) == JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    return false
  }
}

const importTables = () => {
  const table = new Table({
    id: 'XYZ',
    label: 'Test Table',
    rows: [{ id: 'abc', data: 'row' }]
  })

  const expectedOutput = {
    id: 'ABC',
    label: 'Test Node',
    type: 'Node',
    tables: [{
      id: 'XYZ',
      label: 'Test Table',
      rows: [{ id: 'abc', data: 'row' }],
      type: 'Table',
      isValid: true
    }],
    isValid: true
  }

  try {
    const node = new Node({
      id: 'ABC',
      label: 'Test Node',
    })
    node.importTables(table)
    const nodeProps = node.getProperties()

    if (JSON.stringify(nodeProps) == JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}

const failToExport = () => {
  const expectedOutput = null
  const node = new Node({
    id: 'ABC',
    label: 'Test Node',
  })

  const nodeAsTable = node.asTable()
  if (expectedOutput === nodeAsTable) return true
  else return false
}

export default [
  { name: 'Entity | Get Node Properties', test: getNodeProperties },
  { name: 'Entity | Create Node Without Tables', test: createNodeWithoutTables },
  { name: 'Entity | Import Tables to Node', test: importTables },
  { name: 'Entity | Fail to Export', test: failToExport }
]