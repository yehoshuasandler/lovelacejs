# Lovelacejs

Lovelacejs is a modern JavaScript Library to create objects that easily mutate data through relationships, filtering, and tranforming the shape of data.. Designed without dependencies and with modern JavaScript Syntax. Lovelacejs is a tool for robust data manipulation with ease.

## Table
Functionality is rooted in data being constructed as an instance of the `Table` class

    import { Table } from 'lovelacejs` 

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

      import { Nodule } from 'lovelacejs` 

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

      import { Table } from 'lovelacejs` 
      import { FilterNodule } from 'lovelacejs` 

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

    import { Table } from 'lovelacejs` 
    import { JoinNodule } from 'lovelacejs`

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

    import { Table } from 'lovelacejs`
    import { TransformNodule } from 'lovelacejs`
    
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

## GroupByNodule (Experimental)

<small>This Nodule is experimental and subject to frequent changes.</small>

The `GroupByNodule` is a sub-class from `Nodule` and can take in `Table`s and a single string value of `groupByValue` to group rows by a table header. Lets use this `Table` and this `Nodule` as our example input data:

```
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

const groupByNodule = new GroupByNodule({
  id: 'ABC',
  label: 'Test Group By',
  tables: [table],
  groupByValue: 'contractor'
})
```

### GroupByNodule Methods

The `Nodule` base class declares an `abstract export () : tableRows`, as well as a base method `asTable (): Table`, yet the `GroupByNodule` subclass does not implement these methods the same as other derivatives of `Nodule`. 

In this subclass, there is no return for these methods and an error is thrown. The way data is mutated is a fundamental deviation from other nodules. The `GroupByNodule` is for categorically separating data out, therefore a single set of `rows` or a singular `Table` is not a sufficient return type.

Instead, either groups of `rows` or multiple `Table`s are exported. Two new methods are implemented in this subclass to function in a similar way.


#### exportRowGroups()
```
// TS Types
type tableRow = Record<string, unknown>
type groupedByRows = Record<string, tableRow[]>
exportRowGroups (): groupedByRows

// JS implementation
const groupedRows = groupByNodule.exportRowGroups()

/* 
expected output based on example above:
{
  AshBritt: [
    { id: 'abc', data: 'row', contractor: 'AshBritt' },
    { id: 'qwe', data: 'lh', contractor: 'AshBritt' },
    { id: 'XYZ', data: 'row', contractor: 'AshBritt' }
  ],
  HeyDay: [
    { id: 'XYZ', data: 'row', contractor: 'HeyDay' }
  ]
}
*/

```

#### asTables()
```
// TS Type
asTables = (): Table[]

// JS implementation
const groupedTables = groupByNodule.asTables()

/*
expected output based on example above:

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
*/

```

## SortNodule (Experimental)
<small>This Nodule is experimental and subject to frequent changes.</small>

The `SortNodule` does one simple task, sort rows based off on particular property/header.

This nodule takes in three new props on top of the properties of the base class:

`sortValueType: 'ALPHABETIC' | 'NUMERIC'` is used to determine if the sorting is based on number or letters.

`sortDirection: 'ASCENDING' | 'DESCENDING'` is used to determine the order of the sorting.

`sortKey: string` is which property/header tha the sorting will be performed on.

```
const sortNodule = new SortNodule({
  id: 'ABC',
  label: 'Test Nodule',
  tables: [table],
  sortValueType: 'ALPHABETIC',
  sortDirection: 'DESCENDING',
  sortKey: 'contractor'
})
```

## Constant Values

A set of declared constant variables has been provided for safer typing. Although importing them is not essential, the values they represent are the only options for certain options.

Filter types for the `FilterNodule` can be one of only these five string values.

```
const filterTypes = {
  EQUAL: 'EQUAL',
  GREATER: 'GREATER',
  GREATEREQUAL: 'GREATEREQUAL',
  LESSER: 'LESSER',
  LESSEREQUAL: 'LESSEREQUAL',
}

```

`SortNodule` constants are as follows:

```
const sortDirections = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING'
}

const sortValueTypes = {
  NUMERIC: 'NUMERIC',
  ALPHABETIC: 'ALPHABETIC'
}
```

# Notes
This library is in its early stages, and improvements are to come. The main priority currently is readability. Experimental features, which are labeled as such, will likely change functionality and naming.

Goals moving forward are to finalize the experimental features and try to move the core of the code base to WASM with Go and a JS/TS api.
