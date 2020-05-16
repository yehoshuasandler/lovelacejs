import Table from '../core/entities/Table.js'
import Node from '../core/entities/Node.js'
import FilterNode from '../core/entities/nodes/FilterNode.js'
import testData from './testData.js'

const tableInput = {
  id: 'XYZABC',
  label: 'SC Total Receipts',
  rows: testData
}

let receipts = {}

try {
  receipts = new Table(tableInput)
} catch (err) {
  console.log(err)
}

let filterNode = {}
try {
  filterNode = new FilterNode({
    id: 'ERTHJNHBGFDS',
    label: 'Filter Node',
    tables: receipts,
    filterParams: {
      siteName: 'Seewee Road DMS',
      fieldMonitorUserCertificationNumber: '9YW6ZAY'
    },
    type: 'EQUAL'
  })
  console.log(filterNode.tables[0].getRows().length)
  console.log(filterNode.export().length)
} catch (err) {
  console.log(err)
}

