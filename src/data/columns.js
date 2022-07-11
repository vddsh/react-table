import {format, parse} from 'date-fns';


const COLUMNS = [
  {
    accessor: 'id',
    label: 'ID'
  },  {
    accessor: 'name',
    label: 'Name'
  },  {
    accessor: 'price',
    label: 'Price'
  },  {
    accessor: (({receiptDate}) => format(parse(receiptDate, 'yyyy-MM-dd', new Date()), 'do MMMM yyyy')),
    label: 'Receipt Date'
  },
]

export default COLUMNS