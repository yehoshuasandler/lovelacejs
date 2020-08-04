import GroupByNodule from '../../../src/entities/nodules/GroupByNodule.js'
import Table from '../../../src/entities/Table.js'

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

  const groupedRows = groupByNodule.export()
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
  const groupedTables = groupByNodule.asTable()
  const groupedTablesProps = groupedTables.map(t => t.getProperties())
  if (JSON.stringify(groupedTablesProps) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}


export default [
  { name: 'Entity | GroupBy Value', test: groupByTest },
  { name: 'Entity | GroupBy As Table', test: groupByAsTables },
]