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
import { BsBookHalf } from 'react-icons/bs';
import { AiOutlineFilePdf, AiFillEdit } from 'react-icons/ai';
import { BiSolidCard } from 'react-icons/bi';

interface PropTypes {
  data: any;
}

const DataIsuStrategisArahKebijakan = ({ data }: PropTypes) => {
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
        <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index1: number) => (
              <>
                <TableHead className='text-title-ss'>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: '100%' }} colSpan={5}>ISU STRATEGIS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover role="checkbox" className='text-bold font-bold' tabIndex={-1}>
                    <TableCell align='left' colSpan={5}>{row.isu_strategis}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHead className='text-title-ss'>
                  <TableRow>
                    <TableCell align="center" style={{ minWidth: 80 }}>NO</TableCell>
                    <TableCell align="center" style={{ minWidth: 200 }}>TUJUAN</TableCell>
                    <TableCell align="center" style={{ minWidth: 200 }}>SASARAN</TableCell>
                    <TableCell align="center" style={{ minWidth: 200 }}>STRATEGI</TableCell>
                    <TableCell align="center" style={{ minWidth: 200 }}>ARAH KEBIJAKAN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.komponen.map((row2: any, index2: number) => (
                    <>
                      <TableRow hover role="checkbox" className='text-bold font-bold' tabIndex={-1}>
                        <TableCell align='center' rowSpan={row2.sasaran.length + 1}>{index2 + 1}</TableCell>
                        <TableCell align='center' rowSpan={row2.sasaran.length + 1}>{row2.tujuan}</TableCell>
                      </TableRow>
                      {row2.sasaran.map((row3: any, index3: number) => (
                        <TableRow hover role="checkbox" key={index3}>
                          <TableCell align="center">{row3.sasaran}</TableCell>
                          <TableCell align="center">{row3.strategi}</TableCell>
                          <TableCell align="center">{row3.arah_kebijakan}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </>
            ))}
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

export default DataIsuStrategisArahKebijakan;