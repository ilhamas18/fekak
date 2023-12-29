import * as React from 'react';
import { useState, useEffect } from 'react';
import DataTable from '@/components/common/table/dataTable';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BsFillTrashFill } from 'react-icons/bs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface PropTypes {
  data: any;
}

const DataIsuStrategisOPD = ({ data }: PropTypes) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (e: any, id: number) => {
    e.preventDefault()
    console.log(id)
  }

  return (
    <div className='bg-white dark:bg-meta-4 dark:text-white'>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>

      <Paper>
        <TableContainer sx={{ maxHeight: 440, overflow: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ minWidth: 80 }}>NO</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>AKSI</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>ISU STRATEGIS</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>TAHUN</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>OPD</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <React.Fragment>
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align='center' rowSpan={row.indikator.length + 1}>{index + 1}</TableCell>
                        <TableCell align='center' rowSpan={row.indikator.length + 1}>
                          <div className='flex gap-3 items-center justify-center'>
                            <button>
                              <BiEdit size={20} />
                            </button>
                            <button>
                              <BsFillTrashFill size={20} />
                            </button>
                          </div>
                        </TableCell>
                        <TableCell align='center' rowSpan={row.indikator.length + 1}>{row.tujuan_kota}</TableCell>
                        <TableCell align='center' rowSpan={row.indikator.length + 1}>{row.periode}</TableCell>
                      </TableRow>
                      {row.indikator.map((el: any, i: number) => (
                        <TableRow hover role="checkbox" key={i}>
                          <TableCell align='center'>{el.text}</TableCell>
                          <TableCell align='center'>{el.target}</TableCell>
                          <TableCell align='center'>{el.satuan}</TableCell>
                          <TableCell align='center'>{el.tahun}</TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  );
                })}
            </TableBody> */}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default DataIsuStrategisOPD;