import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { setStorePayload } from '@/store/payload/action';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';

interface PropTypes {
  data: any;
  getTematik: any;
  setLoading: any;
}

const DataTematikKota = ({ data, getTematik, setLoading }: PropTypes) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditTematik = async (id: number) => {
    setLoading(true);
    const response = await fetchApi({
      url: `/api/v1/tematiks/${id}`,
      method: 'get',
      type: 'auth'
    })

    if (response.status == 200) {
      dispatch(setStorePayload(response.data));
      router.push(`/rencana-kota/tematik/edit`);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    }
  }

  const deleteConfirm = (id: number, name: string) => {
    Swal.fire({
      title: `Yakin hapus tematik "${name}" ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Hapus",
      denyButtonText: `Batal`
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteTematik(id, name)
      }
    });
  }

  const handleDeleteTematik = async (id: number, name: string) => {
    setLoading(true);
    const response = await fetchApi({
      url: `/api/v1/tematiks/${id}`,
      method: 'delete',
      type: 'auth'
    })

    if (response.status == 204) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Berhasil hapus Tematik "${name}"`,
        showConfirmButton: false,
        timer: 1500,
      });
      getTematik();
      setLoading(false);
    } else if (response.status == 404) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data tematik tidak ditemukan",
      });
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    }
  }

  return (
    <div className='bg-white dark:bg-meta-4 dark:text-white'>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>

      <Paper>
        <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ minWidth: 80 }}>NO</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>AKSI</TableCell>
                <TableCell align="center" style={{ minWidth: 220 }}>TEMATIK</TableCell>
                <TableCell align="center" style={{ minWidth: 180 }}>KETERANGAN</TableCell>
                <TableCell align="center" style={{ minWidth: 300 }}>INDIKATOR</TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>TARGET</TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>SATUAN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort((a: any, b: any) => b.id - a.id)
                .map((row: any, index: number) => {
                  return (
                    <React.Fragment>
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell align='center'>
                          <div className='flex gap-3 items-center justify-center'>
                            <button
                              className='bg-warning text-white p-2 rounded-md hover:cursor-pointer'
                              onClick={() => handleEditTematik(row.id)}
                            >
                              <BiEdit size={20} />
                            </button>
                            <button
                              className='bg-danger text-white p-2 rounded-md hover:cursor-pointer'
                              onClick={() => deleteConfirm(row.id, row.tematik)}
                            >
                              <BsFillTrashFill size={20} />
                            </button>
                          </div>
                        </TableCell>
                        <TableCell align='center'>{row.tematik}</TableCell>
                        <TableCell align='center'>{row.keterangan}</TableCell>
                      </TableRow>
                      {/* {row.indikator.map((el: any, i: number) => (
                        <TableRow hover role="checkbox" key={i}>
                          <TableCell align='center'>{el.indikator}</TableCell>
                          <TableCell align='center'>{el.target}</TableCell>
                          <TableCell align='center'>{el.satuan}</TableCell>
                        </TableRow>
                      ))} */}
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

export default DataTematikKota;