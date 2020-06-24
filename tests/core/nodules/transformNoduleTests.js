import Table from '../../../src/entities/Table.js'
import TransformNodule from '../../../src/entities/nodules/TransformNodule.js'

const transformTable = () => {
  const expectedOutput = [
    { identifier: 'abc', ticketType: 'row', contractor: 'AshBritt' },
    { identifier: 'qwe', ticketType: 'lh', contractor: 'AshBritt' },
    { identifier: 'XYZ', ticketType: 'row', contractor: 'AshBritt' },
    { identifier: 'XYZ', ticketType: 'row', contractor: 'HeyDay' },
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
    console.log(err)
    return false
  }

  let transformNodule = {}
  try {  
    transformNodule = new TransformNodule({
      id: 'ABC',
      label: 'Transform Test',
      tables: [table],
      structure: {
        'id': 'identifier',
        'data': 'ticketType',
        'contractor': 'contractor'
      }
    })
  } catch (err) {
    console.log(err)
    return false
  }

  const transformRows = transformNodule.export()
  if (JSON.stringify(transformRows) === JSON.stringify(expectedOutput)) return true
  else return false
}

const setStructure = () => {
  const expectedOutput = [
    { identifier: 'abc', ticketType: 'row', contractor: 'AshBritt' },
    { identifier: 'qwe', ticketType: 'lh', contractor: 'AshBritt' },
    { identifier: 'XYZ', ticketType: 'row', contractor: 'AshBritt' },
    { identifier: 'XYZ', ticketType: 'row', contractor: 'HeyDay' },
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
    console.log(err)
    return false
  }

  let transformNodule = {}
  try {  
    transformNodule = new TransformNodule({
      id: 'ABC',
      label: 'Transform Test',
      tables: [table],
    })
  } catch (err) {
    console.log(err)
    return false
  }

  try {
    transformNodule.setStructure({
      'id': 'identifier',
      'data': 'ticketType',
      'contractor': 'contractor'
    })
  } catch (err) {
    console.log(err)
    return false
  }

  const transformRows = transformNodule.export()
  if (JSON.stringify(transformRows) === JSON.stringify(expectedOutput)) return true
  else return false
}

export default [
  { name: 'Entities | Transform Nodule Test', test: transformTable },
  { name: 'Entities | Transform Nodule Set Structure', test: setStructure }
]
