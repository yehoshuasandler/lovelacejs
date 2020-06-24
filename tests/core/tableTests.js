import Table from '../../src/entities/Table.js'

const input = {
  id: 'abc',
  label: 'Test Label',
  rows: [
    { id: '2345676', type: 'row', lat: 54, long: 31 },
    { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
  ]
}

const getTableProperties = () => {
  const expectedOutput = {
    id: 'abc',
    label: 'Test Label',
    rows: [
      { id: '2345676', type: 'row', lat: 54, long: 31 },
      { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
    ],
    type: 'Table',
    isValid: true
  }

  try {
    const table = new Table(input)
    const tableProperties = table.getProperties()
    if (JSON.stringify(tableProperties) === JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}

const getTableRows = () => {
  const expectedOutput = [
    { id: '2345676', type: 'row', lat: 54, long: 31 },
    { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
  ]

  try {
    const table = new Table(input)
    const tableRows = table.export()
    if (JSON.stringify(tableRows) === JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}

const createTableWithNoProps = () => {
  const expectedOutput = {
    status: 'ERR',
    error: {
      label: 'Error Creating Table',
      messages: ['No props on creation of Table']
    }
  }

  try {
     new Table()
     return false
  } catch (err) {
    if (JSON.stringify(expectedOutput) === JSON.stringify(err)) return true
    else return false
  }
}

const createTableWithOnlyId = () => {
  const input = { id: 'abc' }
  const expectedOutput = {
    status: 'ERR',
    error: {
      label: 'Error Creating Table',
      messages: [
        'No label on creation of Table'
      ]
    }
  }

  try {
     new Table(input)
     return false
  } catch (err) {
    if (JSON.stringify(expectedOutput) === JSON.stringify(err)) return true
    else return false
  }
}

const createTableWithOnlyLabel = () => {
  const input = { label: 'Test Label' }
  const expectedOutput = {
    status: 'ERR',
    error: {
      label: 'Error Creating Table',
      messages: [
        'No id on creation of Table'
      ]
    }
  }

  try {
     new Table(input)
     return false
  } catch (err) {
    if (JSON.stringify(expectedOutput) === JSON.stringify(err)) return true
    else return false
  }
}

const createTableWithEverythingButRows = () => {
  const input = { id: 'abc', label: 'Test Label' }
  const expectedOutput = {
    id: 'abc',
    label: 'Test Label',
    rows: [],
    type: 'Table',
    isValid: true
  }

  try {
    const table = new Table(input)
    const tableProps = table.getProperties()
    if (JSON.stringify(expectedOutput) === JSON.stringify(tableProps)) return true
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}

const createTableWithInvalidRows = () => {
  const input = {
    id: 'abc',
    label: 'Test Label',
    rows: [
      { id: '2345676', type: 'lh', lat: 31, long: -71.34 },
      'fake row'
    ]
  }
  const expectedOutput = {
    status: 'ERR',
    error: {
      label: 'Error Creating Table',
      messages: [
        'row[1] is not an object'
      ]
    }
  }

  try {
     new Table(input)
     return false
  } catch (err) {
    if (JSON.stringify(expectedOutput) === JSON.stringify(err)) return true
    else return false
  }
}

const createTableWithRowsAsNotArray = () => {
  const input = {
    id: 'abc',
    label: 'Test Label',
    rows: { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
  }

  const expectedOutput = {
    id: 'abc',
    label: 'Test Label',
    rows: [
      { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
    ],
    type: 'Table',
    isValid: true
  }

  try {
    const table = new Table(input)
    const tableProperties = table.getProperties()
    if (JSON.stringify(tableProperties) === JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}

const setTableRows = () => {
  
  const initialInput = {
    id: 'abc',
    label: 'Test Label'
  }

  const rows = [
    { id: '2345676', type: 'row', lat: 54, long: 31 },
    { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
  ]

  const expectedOutput = {
    id: 'abc',
    label: 'Test Label',
    rows: [
      { id: '2345676', type: 'row', lat: 54, long: 31 },
      { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
    ],
    type: 'Table',
    isValid: true
  }

  try {
    const table = new Table(initialInput)
    table.setRows(rows)
    const tableProperties = table.getProperties()
    if (JSON.stringify(tableProperties) === JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}

export default [
  { name: 'Entity | Get Table Properties', test: getTableProperties },
  { name: 'Entity | Get Table Rows', test: getTableRows },
  { name: 'Entiry | Table With Invalid Props', test: createTableWithNoProps },
  { name: 'Entiry | Table With Only Id', test: createTableWithOnlyId },
  { name: 'Entiry | Table With Only Label', test: createTableWithOnlyLabel },
  { name: 'Entiry | Table With Everything But Rows', test: createTableWithEverythingButRows },
  { name: 'Entiry | Table With Invalid Rows', test: createTableWithInvalidRows },
  { name: 'Entiry | Table With Rows as Not Array', test: createTableWithRowsAsNotArray },
  { name: 'Entiry | Set Table Rows', test: setTableRows }
]