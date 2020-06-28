# Dmein

Dmein is a modern JavaScript Library to create objects that easily mutate data through relationships, filtering, and tranforming the shape of data. Designed without dependencies and with modern JavaScript Syntax. Dmein is a tool for robust data manipulation with ease.

## Table
Functionality is rooted in data being constructed as an instance of the `Table` class

    import { Table } from 'dmein` 

    const table = new Table({
      id: 'abc',
      label: 'Test Label',
      rows: [
        { id: '2345676', type: 'row', lat: 54, long: 31 },
        { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
      ]
    })

Your data will be passed in as the rows property as an object. It is besed to pass it as an array of objects, yet if only a single object is passed it will be autocast as an array.

### Table Methods

    getProperties() // all props of the class

    export() // array of rows

    setRows([
      { id: '2345676', type: 'row', lat: 54, long: 31 },
      { id: '2345676', type: 'lh', lat: 31, long: -71.34 }
    ])

## Nodule
`Nodule`s are classes used to transform `Tables` in various ways. There is a `Nodule` base class, but it has no purpose in the wild by itself. Create an instance of one of its child classes depending on the desired use case.

      import { Nodule } from 'dmein` 

      const nodule = new Nodule({
      id: 'ABC',
      label: 'Test Node',
      tables: [
        new Table({
          id: 'XYZ',
          label: 'Test Table',
          rows: [{ id: 'abc', data: 'row' }]
        })
      ]
    })

### Nodule Methods

    getProperties() // all props of the class and the props of the tables

    asTable() // return the Nodule as an instance of a new Table

    setTables(new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [{ id: 'abc', data: 'row' }]
    }))

## FilterNodule
For the use case of filtering out only the rows of data that fits the desired credentials. The two distinct properties of the `FilterNodule` are the `filterParams` and `filterType`.

      import { Table } from 'dmein` 
      import { FilterNodule } from 'dmein` 

      const table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt' },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay' },
      ]
    })

    const filterNodule = new FilterNodule({
      id: 'ABC',
      label: 'Test Nodule',
      tables: [table],
      filterParams: {
        data: 'row',
        contractor: 'AshBritt'
      },
      filterType: 'EQUAL'
    })

    const output = filterNodule.export()
    [
      { id: 'abc', data: 'row', contractor: 'AshBritt' },
      { id: 'XYZ', data: 'row', contractor: 'AshBritt' }
    ]

The `filterParams` is an object where the key is the name of the column that is desired to be evaluated and the value to that key is used in its evaluation.

A `FilterNodule` can take these different filterTypes (where the latter four only regard to numerical values):

    'EQUAL', 'GREATER', 'GREATEREQUAL', 'LESSER, 'LESSEREQUAL'

### FilterNodule Methods

    addFilter({ contractor: 'AshBritt' })

    filterNodule.setFilterType('EQUAL')

    export() // get the filtered data from the Nodule


## JoinNodule
This class' usecase is akin to that of an SQL join. It takes in `Table` instances like any other `Nodule`. With it, there are some extra properties that dictate how the `Nodule` should relate them to one another.

    import { Table } from 'dmein` 
    import { JoinNodule } from 'dmein`

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

    const output = joinNodule.export()
    [
      { id: '2345676', contractor: 'AshBritt', type: 'row', lat: 54, long: 31, 'contractors::id': '1WE3V6', 'contractors::name': 'AshBritt', 'contractors::employeeCount': 43, 'contractors::homeState': 'CA' },
      { id: '2345676', contractor: 'Jefferson',type: 'lh', lat: 31, long: -71.34, 'contractors::id': 'FG4S67', 'contractors::name': 'Jefferson', 'contractors::employeeCount': 91, 'contractors::homeState': 'AL' },
      { id: '2345676', contractor: 'AshBritt', type: 'lh', lat: 80, long: -41, 'contractors::id': '1WE3V6', 'contractors::name': 'AshBritt', 'contractors::employeeCount': 43, 'contractors::homeState': 'CA' }
    ]

The `joinBy` property is an object that tells the `Nodule `how the rows of the `Table` instances relate to one another.

The `baseTableLabel` finds an imported `Table` by its label property. This is the `Table` that will be "joined into". 

The `joinParams` property is an array of objects that state which `Table`s should relate to which rows and in what way. 
The `foreignTable` is a string that will find, by the label, the `Table` that is desired to join into the base `Table`. The `primaryKey` is the column of the base `Table`. The `matchingKey` is the column of the foreign `Table`. The `matchingKey` and the `primaryKey` are used to match with one another to create the join.

After the join the column names coming from the foreign `Table` will be altered to make sure none of the original data is overwritten. The naming convention will appear as seen in the example above and as the following:

    'foreignTableName::foreignValue'

### JoinNodule Methods

    setJoinBy({
      baseTableLabel: 'receipts',
      joinParams: [
        { foreignTable: 'contractors', primaryTableKey: 'contractor', matchingKey: 'name' }
      ]
    })

    export() // get the joined data from the Nodule

## TransformNodule
The `TransformNodule` class, just as the others, extends from the `Nodule` base class. This usecase however is to mold the shape of data from `Table`s into an entirly new one; renaming columns and/or extracting select data.

    import { Table } from 'dmein`
    import { TransformNodule } from 'dmein`
    
    const table = new Table({
      id: 'XYZ',
      label: 'Test Table',
      rows: [
        { id: 'abc', data: 'row', contractor: 'AshBritt' },
        { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'AshBritt' },
        { id: 'XYZ', data: 'row', contractor: 'HeyDay' },
      ]
    })

    const transformNodule = new TransformNodule({
      id: 'ABC',
      label: 'Transform Test',
      tables: [table],
      structure: {
        'id': 'identifier',
        'data': 'ticketType',
        'contractor': 'contractor'
      }
    })

    const output = transformNodule.export()
    [
      { identifier: 'abc', ticketType: 'row', contractor: 'AshBritt' },
      { identifier: 'qwe', ticketType: 'lh', contractor: 'AshBritt' },
      { identifier: 'XYZ', ticketType: 'row', contractor: 'AshBritt' },
      { identifier: 'XYZ', ticketType: 'row', contractor: 'HeyDay' },
    ]

The difference in properties with this `Nodule` is the `structure` object. The keys on this object refer to a column that currently exists in the `Table`s, the value of that key is what the new column name should be in the exported data. 

The value does not need to be used to rename the column, meaning that the value can be the same as the curent key.

Only the columns specified in the `structure` object will be exported from the `Nodule`.

### TransformNodule Methods

    setStructure({
      'id': 'identifier',
      'data': 'ticketType',
      'contractor': 'contractor'
    })

    export() // get the joined data from the Nodule

## Constant Values

A set of declared constant variables has been provided for safer typing. Although importing them is not essential, the values they represent are the only options for certain options.

Filter types for the `FilterNodule` can be one of only these five string values.

    {
      EQUAL: 'EQUAL',
      GREATER: 'GREATER',
      GREATEREQUAL: 'GREATEREQUAL',
      LESSER: 'LESSER',
      LESSEREQUAL: 'LESSEREQUAL',
    }

# Notes
This library is in its early stages, and improvements are to come. The main priority being speed and readability when using the options in these classes. Extra features are not the priority, but will be worked on. Adding features is agains the philosophy of this project however. Dmein is to be a powerful building block to making dynamic and programatic data mutation. It is to be a tool to help craft software, not a wall that gets in the way of work.

If you have any questions or issues please open one up or reach out to me at `joshua@jshoemaker.dev`