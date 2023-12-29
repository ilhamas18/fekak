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

const DataLaporanRankir2 = ({ data }: PropTypes) => {
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
        <div className="card-body">
          <div className="table-responsive">
            <TableContainer sx={{ maxHeight: 1000, overflow: 'auto' }}>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row1: any, index1: number) => (
                <>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead className='text-title-ss'>
                      <TableRow>
                        <TableCell align="left" colSpan={2} sx={{ backgroundColor: '#ef4444', color: 'white' }}>KODE BIDANG URUSAN</TableCell>
                        <TableCell align="left" colSpan={32} sx={{ backgroundColor: '#ef4444', color: 'white' }}>NAMA BIDANG URUSAN</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover role="checkbox" className='text-bold font-bold' tabIndex={-1}>
                        <TableCell align='left' colSpan={2}>{row1.kode_bidang_urusan}</TableCell>
                        <TableCell align='left' colSpan={32}>{row1.nama_bidang_urusan}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  {row1.programs.map((row2: any, index2: number) => (
                    <>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead className='text-title-ss'>
                          <TableRow>
                            <TableCell style={{ borderBottom: "none", backgroundColor: '#06b6d4', color: 'white' }}></TableCell>
                            <TableCell style={{ borderBottom: "none", backgroundColor: '#06b6d4', color: 'white' }}></TableCell>
                            <TableCell style={{ borderBottom: "none", backgroundColor: '#06b6d4', color: 'white' }}></TableCell>
                            <TableCell style={{ borderBottom: "none", backgroundColor: '#06b6d4', color: 'white' }}></TableCell>
                            <TableCell style={{ borderBottom: "none", backgroundColor: '#06b6d4', color: 'white' }}></TableCell>
                            <TableCell colSpan={5} align="center" style={{ backgroundColor: '#06b6d4', color: 'white', border: '1px solid white' }}>2023_PERUBAHAN</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" style={{ minWidth: 90, backgroundColor: '#06b6d4', color: 'white' }} rowSpan={2}>NO</TableCell>
                            <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#06b6d4', color: 'white' }} rowSpan={2}>KODE PROGRAM</TableCell>
                            <TableCell align="left" style={{ minWidth: 200, backgroundColor: '#06b6d4', color: 'white' }} rowSpan={2}>PROGRAM</TableCell>
                            <TableCell align="center" style={{ minWidth: 180, backgroundColor: '#06b6d4', color: 'white' }} rowSpan={2}>AKSI</TableCell>
                            <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#06b6d4', color: 'white' }}>INDIKATOR</TableCell>
                            <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#06b6d4', color: 'white', borderLeft: '1px solid white' }}>TARGET</TableCell>
                            <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#06b6d4', color: 'white' }}>SATUAN</TableCell>
                            <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#06b6d4', color: 'white' }}>PAGU INDIKATIF</TableCell>
                            <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#06b6d4', color: 'white' }}>KETERANGAN</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow hover role="checkbox" className='text-bold font-bold' tabIndex={-1} key={index2}>
                            <TableCell align='left'>{index2 + 1}</TableCell>
                            <TableCell align='left'>{row2.kode_program}</TableCell>
                            <TableCell align='left'>{row2.nama_program}</TableCell>
                            <TableCell align='center'>EDIT</TableCell>
                            {row2.tahun.map((el: any, i: number) => (
                              <>
                                <TableCell align='left'>{el.indikator}</TableCell>
                                <TableCell align='left'>{el.target}</TableCell>
                                <TableCell align='left'>{el.satuan}</TableCell>
                                <TableCell align='left'>{el.pagu_indikatif}</TableCell>
                                <TableCell align='left'>{el.keterangan}</TableCell>
                              </>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                      {row2.kegiatans.map((row3: any, index3: number) => (
                        <>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead className='text-title-ss'>
                              <TableRow>
                                <TableCell style={{ borderBottom: "none", backgroundColor: '#14b8a6', color: 'white' }}></TableCell>
                                <TableCell style={{ borderBottom: "none", backgroundColor: '#14b8a6', color: 'white' }}></TableCell>
                                <TableCell style={{ borderBottom: "none", backgroundColor: '#14b8a6', color: 'white' }}></TableCell>
                                <TableCell style={{ borderBottom: "none", backgroundColor: '#14b8a6', color: 'white' }}></TableCell>
                                <TableCell style={{ borderBottom: "none", backgroundColor: '#14b8a6', color: 'white' }}></TableCell>
                                <TableCell colSpan={5} align="center" style={{ backgroundColor: '#14b8a6', color: 'white', border: '1px solid white' }}>2023_PERUBAHAN</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left" style={{ minWidth: 90, backgroundColor: '#14b8a6', color: 'white' }} rowSpan={2}>NO</TableCell>
                                <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#14b8a6', color: 'white' }} rowSpan={2}>KODE KEGIATAN</TableCell>
                                <TableCell align="left" style={{ minWidth: 200, backgroundColor: '#14b8a6', color: 'white' }} rowSpan={2}>KEGIATAN</TableCell>
                                <TableCell align="center" style={{ minWidth: 180, backgroundColor: '#14b8a6', color: 'white' }} rowSpan={2}>AKSI</TableCell>
                                <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#14b8a6', color: 'white' }}>INDIKATOR</TableCell>
                                <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#14b8a6', color: 'white', borderLeft: '1px solid white' }}>TARGET</TableCell>
                                <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#14b8a6', color: 'white' }}>SATUAN</TableCell>
                                <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#14b8a6', color: 'white' }}>PAGU INDIKATIF</TableCell>
                                <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#14b8a6', color: 'white' }}>KETERANGAN</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody key={index3}>
                              <TableRow hover role="checkbox" className='text-bold font-bold' tabIndex={-1} key={index2}>
                                <TableCell align='left'>{index2 + 1}.{index3 + 1}</TableCell>
                                <TableCell align='left'>{row3.kode_kegiatan}</TableCell>
                                <TableCell align='left'>{row3.nama_kegiatan}</TableCell>
                                <TableCell align='center'>EDIT</TableCell>
                                {row3.tahun.map((el: any, i: number) => (
                                  <>
                                    <TableCell align='left'>{el.indikator}</TableCell>
                                    <TableCell align='left'>{el.target}</TableCell>
                                    <TableCell align='left'>{el.satuan}</TableCell>
                                    <TableCell align='left'>{el.pagu_indikatif}</TableCell>
                                    <TableCell align='left'>{el.keterangan}</TableCell>
                                  </>
                                ))}
                              </TableRow>
                            </TableBody>
                          </Table>
                          <TableHead className='text-title-ss'>
                            <TableRow>
                              <TableCell style={{ borderBottom: "none", backgroundColor: '#93c5fd', color: 'white' }}></TableCell>
                              <TableCell style={{ borderBottom: "none", backgroundColor: '#93c5fd', color: 'white' }}></TableCell>
                              <TableCell style={{ borderBottom: "none", backgroundColor: '#93c5fd', color: 'white' }}></TableCell>
                              <TableCell style={{ borderBottom: "none", backgroundColor: '#93c5fd', color: 'white' }}></TableCell>
                              <TableCell style={{ borderBottom: "none", backgroundColor: '#93c5fd', color: 'white' }}></TableCell>
                              <TableCell colSpan={5} align="center" style={{ backgroundColor: '#93c5fd', color: 'white', border: '1px solid white' }}>2023_PERUBAHAN</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left" style={{ minWidth: 90, backgroundColor: '#93c5fd', color: 'white' }} rowSpan={2}>NO</TableCell>
                              <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#93c5fd', color: 'white' }} rowSpan={2}>KODE SUBKEGIATAN</TableCell>
                              <TableCell align="left" style={{ minWidth: 200, backgroundColor: '#93c5fd', color: 'white' }} rowSpan={2}>SUBKEGIATAN</TableCell>
                              <TableCell align="center" style={{ minWidth: 180, backgroundColor: '#93c5fd', color: 'white' }} rowSpan={2}>AKSI</TableCell>
                              <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#93c5fd', color: 'white' }}>INDIKATOR</TableCell>
                              <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#93c5fd', color: 'white', borderLeft: '1px solid white' }}>TARGET</TableCell>
                              <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#93c5fd', color: 'white' }}>SATUAN</TableCell>
                              <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#93c5fd', color: 'white' }}>PAGU INDIKATIF</TableCell>
                              <TableCell align="left" style={{ minWidth: 180, backgroundColor: '#93c5fd', color: 'white' }}>KETERANGAN</TableCell>
                            </TableRow>
                          </TableHead>
                          {row3.sub_kegiatan.map((row4: any, index4: number) => (
                            <>
                              {/* <Table stickyHeader aria-label="sticky table"> */}
                              <TableBody key={index4}>
                                <TableRow hover role="checkbox" className='text-bold font-bold' tabIndex={-1} key={index2}>
                                  <TableCell align='left'>{index2 + 1}.{index3 + 1}.{index4 + 1} </TableCell>
                                  <TableCell align='left'>{row4.kode_sub_kegiatan}</TableCell>
                                  <TableCell align='left'>{row4.nama_sub_kegiatan}</TableCell>
                                  <TableCell align='center'>EDIT</TableCell>
                                  {row4.tahun.map((el: any, i: number) => (
                                    <>
                                      <TableCell align='left'>{el.indikator}</TableCell>
                                      <TableCell align='left'>{el.target}</TableCell>
                                      <TableCell align='left'>{el.satuan}</TableCell>
                                      <TableCell align='left'>{el.pagu_indikatif}</TableCell>
                                      <TableCell align='left'>{el.keterangan}</TableCell>
                                    </>
                                  ))}
                                </TableRow>
                              </TableBody>
                              {/* </Table> */}
                            </>
                          ))}
                        </>
                      ))}
                    </>
                  ))}
                </>
              ))}
            </TableContainer>
          </div>
        </div>
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

export default DataLaporanRankir2;