import { Table, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import * as React from 'react';

const PAGES = [5, 10, 15, 20, 50];

export default function useTable(data, headCells) {
  const TblContainer = (props) => <Table>{props.children}</Table>;
  const { pageNumber, pageSize, totalNumberOfPages, totalNumberOfRecords, results } = data;
  const TblHead = (props) => (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
  const TblPagination = () => (
    <TablePagination
      component="div"
      rowsPerPageOptions={PAGES}
      page={pageNumber - 1}
      rowsPerPage={pageSize}
      count={totalNumberOfRecords}
    />
  );
  return { TblContainer, TblHead, TblPagination };
}
