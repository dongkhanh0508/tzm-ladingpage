import { Table, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Response, Store } from 'models';
import * as React from 'react';

interface StoreTableProps {
  rs: Response<Store>;
  headCells: any;
  onPageChange: (newPage: number) => void;
  onRowPerPageChange: (perPage: number) => void;
}
const PAGES = [10, 15, 20, 50];

export default function StoreTable({
  rs,
  headCells,
  onPageChange,
  onRowPerPageChange,
}: StoreTableProps) {
  const TblContainer: any = (props: any) => <Table>{props.children}</Table>;
  const { pageNumber, pageSize, totalNumberOfPages, totalNumberOfRecords, results } = rs;
  //functions
  const handelPageChange = (event, newPage: number) => {
    onPageChange(newPage);
  };
  const handelRowPerPageChange = (event) => {
    onRowPerPageChange(event.target.value);
  };
  const TblHead: any = (props) => (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}> {headCell.label} </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
  const TblPagination: any = (props) => (
    <TablePagination
      onPageChange={handelPageChange}
      component="div"
      rowsPerPageOptions={PAGES}
      page={pageNumber - 1}
      rowsPerPage={pageSize}
      count={totalNumberOfRecords}
      //onChangePage={handelPageChange}
      onRowsPerPageChange={handelRowPerPageChange}
    />
  );
  return { TblContainer, TblHead, TblPagination };
}
