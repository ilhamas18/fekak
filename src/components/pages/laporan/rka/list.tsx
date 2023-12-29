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

const DataLaporanRKA = ({ data }: PropTypes) => {
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
                <TableCell style={{ borderBottom: "none" }}></TableCell>
                <TableCell style={{ borderBottom: "none" }}></TableCell>
                <TableCell style={{ borderBottom: "none" }}></TableCell>
                <TableCell style={{ borderBottom: "none" }}></TableCell>
                <TableCell style={{ borderBottom: "none" }}></TableCell>
                <TableCell style={{ borderBottom: "none" }}></TableCell>
                <TableCell colSpan={3} align="center">ANGGARAN</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ minWidth: 80 }} rowSpan={2}>NO</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }} rowSpan={2}>PEMILIK RENCANA</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>RENCANA KINERJA</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>INDIKATOR</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>TARGET</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>SATUAN</TableCell>
                <TableCell align="center" style={{ minWidth: 160 }}>RANKIR 1</TableCell>
                <TableCell align="center" style={{ minWidth: 160 }}>RANKIR 2</TableCell>
                <TableCell align="center" style={{ minWidth: 160 }}>PENETAPAN</TableCell>
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
                        <TableCell align='center' colSpan={2}>{row.sub_kegiatan}</TableCell>
                        <TableCell align='center'>{row.indikator}</TableCell>
                        <TableCell align='center'>{row.target}</TableCell>
                        <TableCell align='center'>{row.satuan}</TableCell>
                        <TableCell align='center'>{row.rankir1}</TableCell>
                        <TableCell align='center'>{row.rankir2}</TableCell>
                        <TableCell align='center'>{row.rankir3}</TableCell>
                        <TableCell align='center'>
                          <div className='flex flex-col gap-2'>
                            <button className='bg-xl-base p-2 flex items-center justify-center rounded-lg flex space-x-2 text-white text-center hover:shadow-xl'>
                              <BsBookHalf size={18} />
                              <span>Tampilkan</span>
                            </button>
                            <button className='bg-[#f59e0b] p-2 flex items-center justify-center rounded-lg flex space-x-2 text-white text-center hover:shadow-xl'>
                              <AiOutlineFilePdf size={18} />
                              <span>Cetak</span>
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {row.pemilik_rencana.map((el: any, i: number) => (
                        <>
                          <TableRow hover role="checkbox" key={i}>
                            <TableCell align='center'>{index + 1}.{i + 1}</TableCell>
                            <TableCell align='center'>{el.nama}</TableCell>
                            <TableCell align='center'>{el.rencana_kinerja}</TableCell>
                            <TableCell align='center'>{el.indikator}</TableCell>
                            <TableCell align='center'>{el.target}</TableCell>
                            <TableCell align='center'>{el.satuan}</TableCell>
                            <TableCell align='center'>{el.rankir1}</TableCell>
                            <TableCell align='center'>{el.rankir2}</TableCell>
                            <TableCell align='center'>{el.rankir3}</TableCell>
                            <TableCell align='center'>
                              <div className='flex flex-col gap-2'>
                                <button className='bg-[#65a30d] p-2 flex items-center justify-center rounded-lg flex space-x-2 text-white text-center hover:shadow-xl'>
                                  <BiSolidCard size={18} />
                                  <span>Rincian</span>
                                </button>
                                <button className='bg-white border border-xl-base hover:bg-xl-base hover:text-white text-xl-base p-2 flex items-center justify-center rounded-lg flex space-x-2 text-white text-center hover:shadow-xl'>
                                  <AiFillEdit size={18} />
                                  <span>Edit</span>
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                          {el.renaksi.map((el2: any, i2: number) => (
                            <TableRow hover role="checkbox" key={i2}>
                              <TableCell align='left' colSpan={6}>Renaksi {i2 + 1}. {el2.renaksi}</TableCell>
                              <TableCell align='center'>{el2.rankir1}</TableCell>
                              <TableCell align='center'>{el2.rankir2}</TableCell>
                              <TableCell align='center'>{el2.rankir3}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          ))}
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

export default DataLaporanRKA;