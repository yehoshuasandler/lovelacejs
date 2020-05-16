import FilterNode from '../../../core/entities/nodes/FilterNode.js'
import Table from '../../../core/entities/Table.js'

const exportRows = () => {
  const expectedOutput = [
    { id: 'abc', data: 'row', contractor: 'AshBritt' },
    { id: 'XYZ', data: 'row', contractor: 'AshBritt' }
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

  let filterNode = {}
  try {
    filterNode = new FilterNode({
      id: 'ABC',
      label: 'Test Node',
      tables: [table],
      filterParams: {
        data: 'row',
        contractor: 'AshBritt'
      },
      type: 'EQUAL'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  const filteredRows = filterNode.export()
  if (JSON.stringify(filteredRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const addFilter = () => {
  const expectedOutput = [
    { id: 'abc', data: 'row', contractor: 'AshBritt' },
    { id: 'XYZ', data: 'row', contractor: 'AshBritt' }
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

  let filterNode = {}
  try {
    filterNode = new FilterNode({
      id: 'ABC',
      label: 'Test Node',
      tables: [table],
      filterParams: {
        data: 'row',
      },
      type: 'EQUAL'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  try {
    filterNode.addFilter({ contractor: 'AshBritt' })
  } catch (err) {
    console.log(err)
    return false
  }

  const filteredRows = filterNode.export()
  if (JSON.stringify(filteredRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const setType = () => {
  const expectedOutput = [
    { id: 'abc', data: 'row', contractor: 'AshBritt' },
    { id: 'XYZ', data: 'row', contractor: 'AshBritt' }
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

  let filterNode = {}
  try {
    filterNode = new FilterNode({
      id: 'ABC',
      label: 'Test Node',
      tables: [table],
      filterParams: {
        data: 'row',
        contractor: 'AshBritt'
      }
    })
  } catch (err) {
    console.log(err)
    return false
  }

  try {
    filterNode.setType('EQUAL')
  } catch (err) {
    console.log(err)
    return false
  }

  const filteredRows = filterNode.export()
  if (JSON.stringify(filteredRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}


export default [
  { name: 'Entity | FilterNode Export Rows', test: exportRows },
  { name: 'Entity | FilterNode Add Filter', test: addFilter },
  { name: 'Entity | FilterNode Set Type', test: setType },
]