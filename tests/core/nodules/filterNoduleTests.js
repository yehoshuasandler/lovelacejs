import FilterNodule from '../../../src/entities/nodules/FilterNodule.js'
import Table from '../../../src/entities/Table.js'

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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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

  const filteredRows = filterNodule.export()
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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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
    filterNodule.addFilter({ contractor: 'AshBritt' })
  } catch (err) {
    console.log(err)
    return false
  }

  const filteredRows = filterNodule.export()
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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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
    filterNodule.export()
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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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
    filterNodule.setFilterType('EQUAL')
  } catch (err) {
    console.log(err)
    return false
  }

  const filteredRows = filterNodule.export()
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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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
    filteredRows = filterNodule.export()
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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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
    filteredRows = filterNodule.export()
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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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
    filteredRows = filterNodule.export()
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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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
    filteredRows = filterNodule.export()
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

const getAsTable = () => {
  const expectedOutput = {
    id: 'ABC',
    label: 'Test Nodule',
    rows: [
      { id: 'qwe', count: 4, contractor: 'AshBritt' },
      { id: 'xyz', count: 2, contractor: 'HeyDay' }
    ],
    headers: [ 'id', 'count', 'contractor' ],
    type: 'Table',
    isValid: true
  }

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

  let filterNodule = {}
  try {
    filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
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

  let filterNoduleAsTable = []
  try {
    filterNoduleAsTable = filterNodule.asTable().getProperties()
  } catch (err) {
    console.log(err)
    return false
  }
  if (JSON.stringify(filterNoduleAsTable) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

export default [
  { name: 'Entity | FilterNodule Equal Filter', test: equalFilter },
  { name: 'Entity | FilterNodule GREATER Filter', test: greaterFilter },
  { name: 'Entity | FilterNodule GREATEREQUAL Filter', test: greaterEqualFilter },
  { name: 'Entity | FilterNodule LESSER Filter', test: lesserFilter },
  { name: 'Entity | FilterNodule LESSEREQUAL Filter', test: lesserEqualFilter },
  { name: 'Entity | FilterNodule Add Filter', test: addFilter },
  { name: 'Entity | FilterNodule Set Type', test: setType },
  { name: 'Entity | FilterNodule Export Without Type Error', test: exportWithoutTypeErrorHandle },
  { name: 'Entity | FilterNodule Export As Table', test: getAsTable },
]