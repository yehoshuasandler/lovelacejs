import JoinNodule from '../../../src/entities/nodules/JoinNodule'
import Table from '../../../src/entities/Table'

const joinTables = () => {
  const pickupTable = new Table({
    id: 'abc',
    label: 'receipts',
    rows: [
      { id: '2345676', contractor: 'AshBritt', type: 'row', lat: 54, long: 31 },
      { id: '2345676', contractor: 'Jefferson',type: 'lh', lat: 31, long: -71.34 },
      { id: '2345676', contractor: 'AshBritt', type: 'lh', lat: 80, long: -41 },
    ]
  })

  const contractorTable = new Table({
    id: 'XYZ',
    label: 'contractors',
    rows: [
      { id: '1WE3V6', name: 'AshBritt', employeeCount: 43, homeState: 'CA'  },
      { id: 'FG4S67', name: 'Jefferson', employeeCount: 91, homeState: 'AL'  }
    ]
  })

  const expectedOutput = [
    { id: '2345676', contractor: 'AshBritt', type: 'row', lat: 54, long: 31, 'contractors::id': '1WE3V6', 'contractors::name': 'AshBritt', 'contractors::employeeCount': 43, 'contractors::homeState': 'CA' },
    { id: '2345676', contractor: 'Jefferson',type: 'lh', lat: 31, long: -71.34, 'contractors::id': 'FG4S67', 'contractors::name': 'Jefferson', 'contractors::employeeCount': 91, 'contractors::homeState': 'AL' },
    { id: '2345676', contractor: 'AshBritt', type: 'lh', lat: 80, long: -41, 'contractors::id': '1WE3V6', 'contractors::name': 'AshBritt', 'contractors::employeeCount': 43, 'contractors::homeState': 'CA' },
  ]

  const joinNodule = new JoinNodule({
    id: 'QWE',
    label: 'Receipts with Contractors',
    tables: [pickupTable, contractorTable],
    joinBy: {
      baseTableLabel: 'receipts',
      joinParams: [
        { foreignTable: 'contractors', primaryTableKey: 'contractor', matchingKey: 'name' }
      ]
    }
  })

  

  const joinNoduleProps = joinNodule.export()

  if (JSON.stringify(joinNoduleProps) === JSON.stringify(expectedOutput)) return true
  else return false
}

const setJoinBy = () => {
  const pickupTable = new Table({
    id: 'abc',
    label: 'receipts',
    rows: [
      { id: '2345676', contractor: 'AshBritt', type: 'row', lat: 54, long: 31 },
      { id: '2345676', contractor: 'Jefferson',type: 'lh', lat: 31, long: -71.34 },
      { id: '2345676', contractor: 'AshBritt', type: 'lh', lat: 80, long: -41 },
    ]
  })

  const contractorTable = new Table({
    id: 'XYZ',
    label: 'contractors',
    rows: [
      { id: '1WE3V6', name: 'AshBritt', employeeCount: 43, homeState: 'CA'  },
      { id: 'FG4S67', name: 'Jefferson', employeeCount: 91, homeState: 'AL'  }
    ]
  })

  const expectedOutput = [
    { id: '2345676', contractor: 'AshBritt', type: 'row', lat: 54, long: 31, 'contractors::id': '1WE3V6', 'contractors::name': 'AshBritt', 'contractors::employeeCount': 43, 'contractors::homeState': 'CA' },
    { id: '2345676', contractor: 'Jefferson',type: 'lh', lat: 31, long: -71.34, 'contractors::id': 'FG4S67', 'contractors::name': 'Jefferson', 'contractors::employeeCount': 91, 'contractors::homeState': 'AL' },
    { id: '2345676', contractor: 'AshBritt', type: 'lh', lat: 80, long: -41, 'contractors::id': '1WE3V6', 'contractors::name': 'AshBritt', 'contractors::employeeCount': 43, 'contractors::homeState': 'CA' },
  ]

  const joinNodule = new JoinNodule({
    id: 'QWE',
    label: 'Receipts with Contractors',
    tables: [pickupTable, contractorTable]
  })

  joinNodule.setJoinBy({
    baseTableLabel: 'receipts',
    joinParams: [
      { foreignTable: 'contractors', primaryTableKey: 'contractor', matchingKey: 'name' }
    ]
  })
  const joinNoduleProps = joinNodule.export()

  if (JSON.stringify(joinNoduleProps) === JSON.stringify(expectedOutput)) return true
  else return false
}

export default [
  { name: 'Entity | Join Table Test', test: joinTables },
  { name: 'Entity | Join Table setJoinBy', test: setJoinBy },
]