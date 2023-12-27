import { Table } from 'flowbite-react';
interface MuptTableProps {
    colNames: string[];
}

const MuptTable: React.FC<MuptTableProps> = ({ colNames }) => {
  return (
    <Table border={0} className='dark'>
    <Table.Head>
        {colNames.map((colName, index) => (
        <Table.HeadCell key={index}>{colName}</Table.HeadCell>))}
        <Table.HeadCell>
            <span className="sr-only">Edit</span>
        </Table.HeadCell>
        <Table.HeadCell>
            <span className="sr-only">Delete</span>
        </Table.HeadCell>
    </Table.Head>
    </Table>
  );
}

export default MuptTable