import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MdEdit } from "react-icons/md";

interface PropTypes {
  data: any;
}

const DataMandatori = ({ data }: PropTypes) => {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditData = (id: number) => router.push(`/master/master-usulan/musrenbang/edit/${id}`);

  return (
    <div className='bg-white dark:bg-meta-4 dark:text-white'>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>

      <Paper>
        <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{ minWidth: 80 }}>No.</TableCell>
                <TableCell align='center' style={{ minWidth: 120 }}>TAHUN</TableCell>
                <TableCell align='center' style={{ minWidth: 220 }}>USULAN</TableCell>
                <TableCell align='center' style={{ minWidth: 220 }}>PERATURAN</TableCell>
                <TableCell align='center' style={{ minWidth: 220 }}>URAIAN</TableCell>
                <TableCell align='center' style={{ minWidth: 220 }}>PENGUSUL</TableCell>
                <TableCell align='center' style={{ minWidth: 180 }}>OPD</TableCell>
                <TableCell align='center' style={{ minWidth: 130 }}>STATUS</TableCell>
                <TableCell align='center' style={{ minWidth: 170 }}>AKSI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell align='center'>{row.tahun}</TableCell>
                        <TableCell align='center'>{row.usulan}</TableCell>
                        <TableCell align='center'>{row.peraturan}</TableCell>
                        <TableCell align='center'>{row.uraian}</TableCell>
                        <TableCell align='center'>{row.pengusul}</TableCell>
                        <TableCell align='center'>{row.opd}</TableCell>
                        <TableCell align='center'>{row.status}</TableCell>
                        <TableCell align='center'>
                          <button
                            className='flex gap-2 border border-[#f59e0b] bg-white text-[#f59e0b] px-2 py-1 hover:bg-[#f59e0b] hover:text-white duration-200 rounded-md'
                            onClick={() => handleEditData(row.id)}
                          >
                            <MdEdit size={18} />
                            Edit
                          </button>
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

export default DataMandatori;