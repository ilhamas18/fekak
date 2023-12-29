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

interface PropTypes {
  data: any;
}

const DataRekapRencanaKinerja = ({ data }: PropTypes) => {
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
                <TableCell align="center" style={{ minWidth: 80 }}>NO</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }}>PEMILIK RENCANA</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }}>STRATEGI</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>RENCANA KINERJA</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>TAHUN</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>INDIKATOR KINERJA</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>TARGET</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>SATUAN</TableCell>
                <TableCell align="center" style={{ minWidth: 160 }}>AKSI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <React.Fragment>
                      <TableRow hover role="checkbox" className='bg-[#f1f5f9] text-bold font-bold' tabIndex={-1} key={index}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell align='center' colSpan={8}>{row.sub_kegiatan}</TableCell>
                      </TableRow>
                      {row.rencana.map((el: any, i: number) => (
                        <>
                          <TableRow hover role="checkbox" key={i}>
                            <TableCell align='center'>{index + 1}.{i + 1}</TableCell>
                            <TableCell align='center'>{el.pemilik_rencana}</TableCell>
                            <TableCell align='center'>{el.strategi}</TableCell>
                            <TableCell align='center'>{el.rencana_kinerja}</TableCell>
                            <TableCell align='center'>{el.tahun}</TableCell>
                            <TableCell align='center'>{el.indikator_kinerja}</TableCell>
                            <TableCell align='center'>{el.target}</TableCell>
                            <TableCell align='center'>{el.satuan}</TableCell>
                            <TableCell align='center'>
                              <div className='flex flex-col gap-2'>
                                <button className='bg-xl-base p-2 flex items-center justify-center rounded-lg flex space-x-2 text-white text-center hover:shadow-xl'>
                                  <BsBookHalf size={18} />
                                  <span>KAK</span>
                                </button>
                                <button className='bg-white border border-xl-base hover:bg-xl-base hover:text-white text-xl-base p-2 flex items-center justify-center rounded-lg flex space-x-2 text-white text-center hover:shadow-xl'>
                                  <AiFillEdit size={18} />
                                  <span>Cetak</span>
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
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

export default DataRekapRencanaKinerja;