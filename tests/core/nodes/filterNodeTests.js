import FilterNode from '../../../core/entities/nodes/FilterNode.js'
import Table from '../../../core/entities/Table.js'

const equalFilter = () => {
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
      filterType: 'EQUAL'
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
      filterType: 'EQUAL'
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

const exportWithoutTypeErrorHandle = () => {
  const expectedOutput = {
    status: 'ERR',
    error: {
      label: 'Filter Type is not valid',
      messages: ['Type must be one of: EQUAL,GREATER,GREATEREQUAL,LESSER,LESSEREQUAL']
    }
  }

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt' }
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
    filterNode.export()
  } catch (err) {
    if (JSON.stringify(err) === JSON.stringify(expectedOutput)) {
      return true
    } else {
      return false
    }
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
    filterNode.setFilterType('EQUAL')
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

const greaterFilter = () => {
  const expectedOutput = [
    { id: 'abc', count: 5, contractor: 'AshBritt' },
    { id: 'XYZ', count: 8, contractor: 'AshBritt' }
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', count: 5, contractor: 'AshBritt' },
        { id: 'qwe', count: 4, contractor: 'AshBritt' },
        { id: 'XYZ', count: 8, contractor: 'AshBritt' },
        { id: 'xyz', count: 2, contractor: 'HeyDay' },
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
        count: 4
      },
      filterType: 'GREATER'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  let filteredRows = []
  try {
    filteredRows = filterNode.export()
  } catch (err) {
    console.log(err)
    return false
  }
  if (JSON.stringify(filteredRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const greaterEqualFilter = () => {
  const expectedOutput = [
    { id: 'abc', count: 5, contractor: 'AshBritt' },
    { id: 'qwe', count: 4, contractor: 'AshBritt' },
    { id: 'XYZ', count: 8, contractor: 'AshBritt' }
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', count: 5, contractor: 'AshBritt' },
        { id: 'qwe', count: 4, contractor: 'AshBritt' },
        { id: 'XYZ', count: 8, contractor: 'AshBritt' },
        { id: 'xyz', count: 2, contractor: 'HeyDay' },
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
        count: 4
      },
      filterType: 'GREATEREQUAL'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  let filteredRows = []
  try {
    filteredRows = filterNode.export()
  } catch (err) {
    console.log(err)
    return false
  }
  if (JSON.stringify(filteredRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const lesserFilter = () => {
  const expectedOutput = [
    { id: 'xyz', count: 2, contractor: 'HeyDay' }
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', count: 5, contractor: 'AshBritt' },
        { id: 'qwe', count: 4, contractor: 'AshBritt' },
        { id: 'XYZ', count: 8, contractor: 'AshBritt' },
        { id: 'xyz', count: 2, contractor: 'HeyDay' },
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
        count: 4
      },
      filterType: 'LESSER'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  let filteredRows = []
  try {
    filteredRows = filterNode.export()
  } catch (err) {
    console.log(err)
    return false
  }
  if (JSON.stringify(filteredRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const lesserEqualFilter = () => {
  const expectedOutput = [
    { id: 'qwe', count: 4, contractor: 'AshBritt' },
    { id: 'xyz', count: 2, contractor: 'HeyDay' }
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', count: 5, contractor: 'AshBritt' },
        { id: 'qwe', count: 4, contractor: 'AshBritt' },
        { id: 'XYZ', count: 8, contractor: 'AshBritt' },
        { id: 'xyz', count: 2, contractor: 'HeyDay' },
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
        count: 4
      },
      filterType: 'LESSEREQUAL'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  let filteredRows = []
  try {
    filteredRows = filterNode.export()
  } catch (err) {
    console.log(err)
    return false
  }
  if (JSON.stringify(filteredRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

export default [
  { name: 'Entity | FilterNode Equal Filter', test: equalFilter },
  { name: 'Entity | FilterNode GREATER Filter', test: greaterFilter },
  { name: 'Entity | FilterNode GREATEREQUAL Filter', test: greaterEqualFilter },
  { name: 'Entity | FilterNode LESSER Filter', test: lesserFilter },
  { name: 'Entity | FilterNode LESSEREQUAL Filter', test: lesserEqualFilter },
  { name: 'Entity | FilterNode Add Filter', test: addFilter },
  { name: 'Entity | FilterNode Set Type', test: setType },
  { name: 'Entity | FilterNode Export Without Type Error', test: exportWithoutTypeErrorHandle },
]