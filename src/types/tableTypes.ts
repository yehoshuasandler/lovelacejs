
type tableConstructorProps = {
  id: string,
  label: string,
  rows: tableRows,
  type?: 'Table',
}

type tableRow = Record<string, unknown>
type tableRows = tableRow[]

type tableProps = {
  id: string,
  label: string,
  rows: tableRows,
  headers: string[],
  type: 'Table',
  isValid: boolean
}

export {
  tableConstructorProps,
  tableRow,
  tableRows,
  tableProps
}