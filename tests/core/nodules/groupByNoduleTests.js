import GroupByNodule from '../../../src/entities/nodules/GroupByNodule'
import Table from '../../../src/entities/Table'

const groupByTest = () => {
  const expectedOutput = {
    AshBritt: [
      { id: 'abc', data: 'row', contractor: 'AshBritt' },
      { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
      { id: 'XYZ', data: 'row', contractor: 'AshBritt' }
    ],
    HeyDay: [
      { id: 'XYZ', data: 'row', contractor: 'HeyDay' }
    ]
  }

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt' },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay' },
      ]
    })
  } catch (err) {
    return false
  }

  let groupByNodule = {}
  try {
    groupByNodule = new GroupByNodule({
      id: 'ABC',
      label: 'Test Group By',
      tables: [table],
      groupByValue: 'contractor'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  const groupedRows = groupByNodule.exportRowGroups()
  if (JSON.stringify(groupedRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const groupByAsTables = () => {

  const expectedOutput = [
    {
      id: 'ABC-AshBritt',
      label: 'Test Group by AshBritt',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt' },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt' }
      ],
      headers: [ 'id', 'data', 'contractor' ],
      type: 'Table',
      isValid: true
    },
    {
      id: 'ABC-HeyDay',
      label: 'Test Group by HeyDay',
      rows: [
        { id: 'XYZ', data: 'row', contractor: 'HeyDay' }
      ],
      headers: [ 'id', 'data', 'contractor' ],
      type: 'Table',
      isValid: true
    }
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt' },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay' },
      ]
    })
  } catch (err) {
    return false
  }

  let groupByNodule = {}
  try {
    groupByNodule = new GroupByNodule({
      id: 'ABC',
      label: 'Test Group',
      tables: [table],
      groupByValue: 'contractor'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  // make checks here
  const groupedTables = groupByNodule.asTables()
  const groupedTablesProps = groupedTables.map(t => t.getProperties())
  if (JSON.stringify(groupedTablesProps) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const groupByExportError = () => {
  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt' },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
      ]
    })
  } catch (err) {
    return false
  }

  let groupByNodule = {}
  try {
    groupByNodule = new GroupByNodule({
      id: 'ABC',
      label: 'Test Group',
      tables: [table],
      groupByValue: 'contractor'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  try {
    groupByNodule.export()
    return false
  } catch (err) {
    return true
  }
}

const groupByAsTableError = () => {
  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt' },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay' },
      ]
    })
  } catch (err) {
    return false
  }

  let groupByNodule = {}
  try {
    groupByNodule = new GroupByNodule({
      id: 'ABC',
      label: 'Test Group',
      tables: [table],
      groupByValue: 'contractor'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  try {
    groupByNodule.asTable()
    return false
  } catch (err) {
    return true
  }
}



export default [
  { name: 'Entity | GroupBy Value', test: groupByTest },
  { name: 'Entity | GroupBy As Table', test: groupByAsTables },
  { name: 'Entity | GroupBy export() should error out', test: groupByExportError },
  { name: 'Entity | GroupBy asTable() should error out', test: groupByAsTableError },
]