import Table from '../../src/entities/Table'

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
    headers: [ "id", "type", "lat", "long" ],
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
    headers: [],
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
    headers: [ 'id', 'type', 'lat', 'long' ],
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
    headers: [ 'id', 'type', 'lat', 'long' ],
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

const getTableHeaders = () => { 
  const expectedOutput = ["id", "type", "lat", "long"]

  try {
    const table = new Table(input)
    const headers = table.headers
    if (JSON.stringify(headers) === JSON.stringify(expectedOutput)) return true
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}

export default [
  { name: 'Entity | Get Table Properties', test: getTableProperties },
  { name: 'Entity | Get Table Rows', test: getTableRows },
  { name: 'Entity | Table With Invalid Props', test: createTableWithNoProps },
  { name: 'Entity | Table With Only Id', test: createTableWithOnlyId },
  { name: 'Entity | Table With Only Label', test: createTableWithOnlyLabel },
  { name: 'Entity | Table With Everything But Rows', test: createTableWithEverythingButRows },
  { name: 'Entity | Table With Invalid Rows', test: createTableWithInvalidRows },
  { name: 'Entity | Table With Rows as Not Array', test: createTableWithRowsAsNotArray },
  { name: 'Entity | Set Table Rows', test: setTableRows },
  { name: 'Entity | Table Headers Getter', test: getTableHeaders }
]