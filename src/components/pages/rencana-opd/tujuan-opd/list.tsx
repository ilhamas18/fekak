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
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

interface PropTypes {
  data: any;
}

const DataTujuanOPD = ({ data }: PropTypes) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log(data);

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
  console.log(data);

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
                <TableCell style={{ borderBottom: "none" }}></TableCell>
                <TableCell colSpan={2} align="center" style={{ border: '1px solid #68788A' }}>2020</TableCell>
                <TableCell colSpan={2} align="center" style={{ border: '1px solid #68788A' }}>2021</TableCell>
                <TableCell colSpan={2} align="center" style={{ border: '1px solid #68788A' }}>2022</TableCell>
                <TableCell colSpan={2} align="center" style={{ border: '1px solid #68788A' }}>2023</TableCell>
                <TableCell colSpan={2} align="center" style={{ border: '1px solid #68788A' }}>2024</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ minWidth: 80 }} rowSpan={2}>NO</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }} rowSpan={2}>AKSI</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>TUJUAN OPD</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>BIDANG URUSAN</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>INDIKATOR</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>RUMUS PERHITUNGAN</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }} rowSpan={2}>SUMBER DATA</TableCell>
                <TableCell align="center" style={{ minWidth: 180, borderLeft: '1px solid #68788A' }}>TARGET</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }}>SATUAN</TableCell>
                <TableCell align="center" style={{ minWidth: 180, borderLeft: '1px solid #68788A' }}>TARGET</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }}>SATUAN</TableCell>
                <TableCell align="center" style={{ minWidth: 180, borderLeft: '1px solid #68788A' }}>TARGET</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }}>SATUAN</TableCell>
                <TableCell align="center" style={{ minWidth: 180, borderLeft: '1px solid #68788A' }}>TARGET</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }}>SATUAN</TableCell>
                <TableCell align="center" style={{ minWidth: 180, borderLeft: '1px solid #68788A' }}>TARGET</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }}>SATUAN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <React.Fragment>
                      <TableRow hover role="checkbox" className='text-bold font-bold' tabIndex={-1} key={index}>
                        <TableCell align='center' rowSpan={row.indikator_tujuan.length + 1}>{index + 1}</TableCell>
                        <TableCell align='center' rowSpan={row.indikator_tujuan.length + 1}>
                          <div className='flex flex-col gap-2'>
                            <button className='bg-white border border-meta-6 hover:bg-meta-6 hover:text-white text-meta-6 p-2 flex items-center justify-center rounded-lg flex space-x-2 text-center hover:shadow-xl duration-300'>
                              <AiFillEdit size={18} />
                              <span>Edit</span>
                            </button>
                            <button className='bg-danger hover:shadow-lg text-white p-2 flex items-center justify-center rounded-lg flex space-x-2 text-white text-center hover:shadow-xl'>
                              <AiFillDelete size={18} />
                              <span>Hapus</span>
                            </button>
                          </div>
                        </TableCell>
                        <TableCell align='center' rowSpan={row.indikator_tujuan.length + 1}>{row.tujuan}</TableCell>
                        <TableCell align='center' rowSpan={row.indikator_tujuan.length + 1}>
                          {row.bidang_urusan?.map((el: any, i: number) => (
                            <TableRow>
                              <TableCell align='center'>
                                {el.nama_bidang_urusan}

                              </TableCell>
                            </TableRow>
                          ))}
                        </TableCell>
                        {/* {row.Bidang_Urusans.map((el: any, i: number) => (
                          <TableCell align='center'>{el.nama_bidang_urusan}</TableCell>
                        ))} */}
                      </TableRow>
                      {/* {row.Bidang_Urusans.map((el: any, i: number) => (
                        <>
                          <TableRow hover role="checkbox" key={i}>
                            <TableCell align='center'>{el.nama_bidang_urusan}</TableCell>
                          </TableRow>
                        </>
                      ))} */}
                      {row.indikator_tujuan?.map((row2: any, index2: number) => (
                        <>
                          <TableRow hover role="checkbox" key={index2}>
                            <TableCell align='center'>{row2.indikator !== '' ? row2.indikator : '-'}</TableCell>
                            <TableCell align='center'>{row2.rumus_perhitungan !== '' ? row2.rumus_perhitungan : '-'}</TableCell>
                            <TableCell align='center'>{row2.sumber_data !== '' ? row2.sumber_data : '-'}</TableCell>
                            {row2.tahun.map((row3: any, index3: number) => (
                              <>
                                <TableCell align='center'>{row3.target !== '' ? row3.target : '-'}</TableCell>
                                <TableCell align='center'>{row3.satuan !== '' ? row3.satuan : '-'}</TableCell>
                              </>
                            ))}
                          </TableRow>
                        </>
                      ))}
                    </React.Fragment>
                  )
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

export default DataTujuanOPD;