import { Table, Pagination } from 'flowbite-react';
import { useEffect } from 'react';

export type Row = {
  id: number;
  keys: string[];
  values: JSX.Element[];
}

type Column = {
  accessor: string;
  header: string;
}

type MuptTableProps = {
  colNames: Column[];
  colData: (Row)[];
  currentPage: number;
  totalPages: number;
  defaultText: string;
  onPageChange(page: number): void;
  onRowEditClick?(db_id: number): () => void;
  onRowDeleteClick(db_id: number): () => void;
}


// TODO: refactor this into many smaller components
// IMPORTANT

const MuptTableBase: React.FC<MuptTableProps> = (props) => {
  console.log(props.totalPages)
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
            props.colData.length === 0 ? (
              <Table.Row className="border-gray-700 bg-gray-800">
                <Table.Cell colSpan={props.colNames.length + 2}>
                  {props.defaultText}
                </Table.Cell>
              </Table.Row>
            ) : (
              props.colData.map((colData, index) => (
                <Table.Row key={index} className="border-gray-700 bg-gray-800">
                  {colData.keys.map((col, index) => (
                    col === 'id' ? null :
                      !(props.colNames.some(item => item.accessor === col)) ? null : (
                        <Table.Cell
                          className="whitespace-wrap font-medium text-white border-r-0 border-l-0"
                          key={index}
                        >
                          {colData.values[index]}
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
                </Table.Row>
              ))
            )
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