import * as React from 'react';
import { useState, useEffect } from 'react';
import DataTable from '@/components/common/table/dataTable';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

interface PropTypes {
  data: any;
}

const DataOPD = ({ data }: PropTypes) => {
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
            <TableHead className='text-title-ss'>
              <TableRow>
                <TableCell align="center" style={{ minWidth: 80 }} rowSpan={2}>K/L</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }} rowSpan={2}>KODE OPD</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>NAMA OPD</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <TableRow hover role="checkbox" key={index}>
                      <TableCell align='center'>-</TableCell>
                      <TableCell align='center'>{row.kode_opd}</TableCell>
                      <TableCell align='center'>{row.nama_opd}</TableCell>
                      {row.active == true ? (
                        <TableCell align='center'>
                          <div className='flex gap-4 items-center justify-center text-[#16a34a]'>
                            <FaCircleCheck size={20} />
                            Active
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell align='center'>
                          <div className='flex gap-4 items-center justify-center text-[#e11d48]'>
                            <IoCloseCircle size={22} />
                            Non Aktif
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default DataOPD;