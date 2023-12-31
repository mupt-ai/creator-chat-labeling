import { Table, Pagination } from 'flowbite-react';

export type StringOnly = {
  [key: string]: string;
}

export type Row = {
  id: number;
}

type Column = {
  accessor: string;
  header: string;
}

type MuptTableProps = {
  colNames: Column[];
  colData: (Row & StringOnly)[];
  currentPage: number;
  totalPages: number;
  onPageChange(page: number): void;
  onRowEditClick?(db_id: number): () => void;
  onRowDeleteClick(db_id: number): () => void;
}


// TODO: refactor this into many smaller components

const MuptTableBase: React.FC<MuptTableProps> = (props) => {
  return (
    <div>
      <Table className='dark' hoverable>
        <Table.Head>
          {props.colNames.map((colName, index) => (
            <Table.HeadCell key={index}>{colName.header}</Table.HeadCell>))}
          {props.onRowEditClick ? (
            <Table.HeadCell className="w-5">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          ) : null}
          <Table.HeadCell className="w-5">
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {
            props.colData.map((colData, index) => (
              <Table.Row key={index} className="border-gray-700 bg-gray-800">
                {Object.keys(colData).map((col, index) => (
                  col === 'id' ? null :
                    !(props.colNames.some(item => item.accessor === col)) ? null : (
                      <Table.Cell
                        className="whitespace-nowrap font-medium text-white border-r-0 border-l-0"
                        key={index}
                      >
                        {colData[col]}
                      </Table.Cell>
                    )))}
                {props.onRowEditClick ? (
                  <Table.Cell>
                    <a
                      onClick={props.onRowEditClick(props.colData[index].id)}
                      className="font-medium text-cyan-500 hover:underline">
                      Edit
                    </a>
                  </Table.Cell>
                ) : null}
                <Table.Cell>
                  <a
                    onClick={props.onRowDeleteClick(props.colData[index].id)}
                    className="font-medium text-cyan-500 hover:underline">
                    Delete
                  </a>
                </Table.Cell>
              </Table.Row>))
          }
        </Table.Body>
      </Table>
      <Pagination
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        onPageChange={props.onPageChange}
        className="dark" />
    </div>
  );
}

export default MuptTableBase