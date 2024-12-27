/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { ReactNode, FC, createContext, useContext } from 'react';

// interface StyleBodyProps {
//   $columns: string;
// }

interface CommonRowProps {
  $columns: string;
}

// interface HeaderProps {
//   class: string;
// }

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};

  /* column-gap: 1rem; */
  /* align-items: center; */
  /* transition: none; */
`;

const StyledTable = styled.div.attrs({ className: 'MY_TABLE' })`
  overflow: hidden;
`;

const StyledHeader = styled(CommonRow).attrs({
  className:
    'MY_TABLE_HEADER text-slate-100 semibold uppercase border-b border-slate-500 ',
})`
  letter-spacing: 0.8px;
`;

const StyledRow = styled(CommonRow).attrs({
  className: 'MY_TABLE_ROW ',
})`
  :nth-last-child(-n + 6) {
    border-bottom: 0;
  }
`;

const StyledCell = styled.div.attrs({
  className: 'MY_TABLE_CELL text-slate-100 border-b-2 border-slate-800',
})`
  padding: 0.75rem;
`;

interface TableProps {
  columns: string;
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
}

interface TableHeaderProps {
  children: ReactNode;
}

interface TableBodyProps {
  data: any[];
  render: (data: any) => React.ReactNode;
}

interface CellProps {
  children: ReactNode;
}

interface ITable extends FC<TableProps> {
  Row: FC<TableRowProps>;
  Header: FC<TableHeaderProps>;
  Body: FC<TableBodyProps>;
  Cell: any;
}

type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType | null>(null);

const Table: ITable = ({ columns, children }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Row: FC<TableRowProps> = ({ children }) => {
  const { columns } = useContext<TableContextType>(TableContext as any);
  return <StyledRow $columns={columns}>{children}</StyledRow>;
};

const Header: FC<TableHeaderProps> = ({ children }) => {
  const { columns } = useContext<TableContextType>(TableContext as any);

  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {children}
    </StyledHeader>
  );
};

const Body: FC<TableBodyProps> = ({ data, render }) => {
  //   if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <Table.Row>{data.map(render)}</Table.Row>;
};

const Cell: FC<CellProps> = ({ children }) => {
  return <StyledCell>{children}</StyledCell>;
};

Table.Row = Row;
Table.Header = Header;
Table.Body = Body;
Table.Cell = Cell;

export default Table;

// Table
// - Header
// - Row

// export const Row: React.FC<{
//   props: RowProps;
//   children: React.ReactNode;
// }> = ({ props, children }) => {
//   return (
//     <StyledRow backgroundColor={props.backgroundColor}>{children}</StyledRow>
//   );
// };

// export const Header: React.FC<{
//   props: RowProps;
//   children: React.ReactNode;
// }> = ({ props, children }) => {
//   return (
//     <StyledRow backgroundColor={props.backgroundColor}>{children}</StyledRow>
//   );
// };

// const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return <StyledRow backgroundColor="purple">{children}</StyledRow>;
// };

// const Section = styled.section<RowProps>`
//   color: white;

//   /* Pass variables as inputs */
//   padding: ${padding};

//   /* Adjust the background from the properties */
//   background: ${props => props.backgroundColor};
// `
