import SortNodule from '../../../src/entities/nodules/SortNodule'
import Table from '../../../src/entities/Table'

const sortNumericAscending = () => {
  const expectedOutput = [
    { id: 'XYZ', data: 'row', contractor: 'AshBritt',  someNumber: 1 },
    { id: 'XYZ', data: 'row', contractor: 'HeyDay',  someNumber: 4 },
    { id: 'abc', data: 'row', contractor: 'AshBritt', someNumber: 9 },
    { id: 'qwe', data: 'lh', contractor: 'AshBritt',  someNumber: 11 },
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt', someNumber: 9 },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt',  someNumber: 11 },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt',  someNumber: 1 },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay',  someNumber: 4 },
      ]
    })
  } catch (err) {
    return false
  }

  let sortNodule = {}
  try {
    sortNodule = new SortNodule({
      id: 'ABC',
      label: 'Test Nodule',
      tables: [table],
      sortValueType: 'NUMERIC',
      sortDirection: 'ASCENDING',
      sortKey: 'someNumber'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  const sortedRows = sortNodule.export()
  if (JSON.stringify(sortedRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const sortNumericDesscending = () => {
  const expectedOutput = [
    { id: 'qwe', data: 'lh', contractor: 'AshBritt',  someNumber: 11 },
    { id: 'abc', data: 'row', contractor: 'AshBritt', someNumber: 9 },
    { id: 'XYZ', data: 'row', contractor: 'HeyDay',  someNumber: 4 },
    { id: 'XYZ', data: 'row', contractor: 'AshBritt',  someNumber: 1 },
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt', someNumber: 9 },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt',  someNumber: 11 },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt',  someNumber: 1 },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay',  someNumber: 4 },
      ]
    })
  } catch (err) {
    return false
  }

  let sortNodule = {}
  try {
    sortNodule = new SortNodule({
      id: 'ABC',
      label: 'Test Nodule',
      tables: [table],
      sortValueType: 'NUMERIC',
      sortDirection: 'DESCENDING',
      sortKey: 'someNumber'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  const sortedRows = sortNodule.export()
  if (JSON.stringify(sortedRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

const sortAlphabeticAscending = () => {
  const expectedOutput = [
    { id: 'abc', data: 'row', contractor: 'AshBritt', someNumber: 9 },
    { id: 'qwe', data: 'lh', contractor: 'AshBritt',  someNumber: 11 },
    { id: 'XYZ', data: 'row', contractor: 'AshBritt',  someNumber: 1 },
    { id: 'XYZ', data: 'row', contractor: 'HeyDay',  someNumber: 4 },
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt', someNumber: 9 },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt',  someNumber: 11 },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay',  someNumber: 4 },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt',  someNumber: 1 },
      ]
    })
  } catch (err) {
    return false
  }

  let sortNodule = {}
  try {
    sortNodule = new SortNodule({
      id: 'ABC',
      label: 'Test Nodule',
      tables: [table],
      sortValueType: 'ALPHABETIC',
      sortDirection: 'ASCENDING',
      sortKey: 'contractor'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  const sortedRows = sortNodule.export()
  if (JSON.stringify(sortedRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}


const sortAlphabeticDescending = () => {
  const expectedOutput = [
    { id: 'XYZ', data: 'row', contractor: 'HeyDay',  someNumber: 4 },
    { id: 'XYZ', data: 'row', contractor: 'AshBritt',  someNumber: 1 },
    { id: 'qwe', data: 'lh', contractor: 'AshBritt',  someNumber: 11 },
    { id: 'abc', data: 'row', contractor: 'AshBritt', someNumber: 9 },
  ]

  let table = {}
  try {
    table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt', someNumber: 9 },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt',  someNumber: 11 },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay',  someNumber: 4 },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt',  someNumber: 1 },
      ]
    })
  } catch (err) {
    return false
  }

  let sortNodule = {}
  try {
    sortNodule = new SortNodule({
      id: 'ABC',
      label: 'Test Nodule',
      tables: [table],
      sortValueType: 'ALPHABETIC',
      sortDirection: 'DESCENDING',
      sortKey: 'contractor'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  const sortedRows = sortNodule.export()
  if (JSON.stringify(sortedRows) === JSON.stringify(expectedOutput)) {
    return true
  } else {
    return false
  }
}

export default [
  { name: 'Entities | Sort Nodule Numeric Ascending', test: sortNumericAscending },
  { name: 'Entities | Sort Nodule Numeric Descending', test: sortNumericDesscending },
  { name: 'Entities | Sort Nodule Alphabetic Ascending', test: sortAlphabeticAscending },
  { name: 'Entities | Sort Nodule Alphabetic Descending', test: sortAlphabeticDescending },
]
