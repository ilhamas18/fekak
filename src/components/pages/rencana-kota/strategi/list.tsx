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
import { FaShare } from 'react-icons/fa6';

interface PropTypes {
  data: any;
}

const DataStrategiKota = ({ data }: PropTypes) => {
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
                <TableCell align="center" style={{ minWidth: 220 }}>STRATEGI</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>ISU STRATEGIS KOTA</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>TAHUN</TableCell>
                <TableCell align="center" style={{ minWidth: 380 }}>BAGIKAN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <React.Fragment>
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell align='center'>
                          <div className='flex gap-3 items-center justify-center'>
                            <button>
                              <BiEdit size={20} />
                            </button>
                            <button>
                              <BsFillTrashFill size={20} />
                            </button>
                          </div>
                        </TableCell>
                        <TableCell align='center'>{row.strategi}</TableCell>
                        <TableCell align='center'>{row.isu_strategis}</TableCell>
                        <TableCell align='center'>{row.tahun}</TableCell>
                        <TableCell align='center'>
                          <div className='flex gap-3'>
                            <button className='border border-xl-base px-4 py-2 rounded-lg hover:bg-xl-base hover:text-white duration-300'>Jumlah dibagikan <span className='bg-xl-base py-1 px-2 text-title-ss text-white rounded-full'>2</span></button>
                            <button className='border border-deep-gray px-4 py-2 rounded-lg hover:bg-deep-gray hover:text-white duration-300 flex'><FaShare size={16} className='mr-2' />Bagikan ke OPD</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
            </TableBody>
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

export default DataStrategiKota;