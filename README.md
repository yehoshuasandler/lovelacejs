# Dmein

A web application to migrate data from various sources (i.e. files, DBs, APIs) and create visual reports on them.

## Features
- Upload files represented as Tables
  - parse excel files to JSON
  - parse CSV files to JSON (LT)

- Methods that relate data
- methods that map data
- methods that filter data
- Methods that map data to structures for graphs (many graph types)

- Save to local storage (browser)
  - Save the data from files (after parsed)
  - Save user prefs for how to manipulate data

- UI for user to create data mapping functionality into graphs
  - define what types of input params with forms
  - restrictions if data can not work for graph (LT)

- Save to PDF
- Export to XLSX

## Classes
- Tables - what data sources are converted into and what is exported from nodes
- Nodes
  - Filter Node (filter out data from tables with matching criteria)
  - Relate Node (join different tables)
  - Transform Node (mutate data structures)
  - Graph Node (map table data to fit what is needed for a graph)
- Graph - takes in a Graph Nodes return value then returns a graph element

## Application Independent Rules (Use Cases)
- Create Tables from file
- Create Filter Node
- Create Relate Node
- Create Transform Node
- Create Graph Node 
