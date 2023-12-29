'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { GiCalendarHalfYear } from "react-icons/gi";
import withAuth from '@/components/utils/withAuth';
import dynamic from 'next/dynamic';
import Loading from '@/components/global/Loading/loading';
import { AiFillFolderAdd } from 'react-icons/ai';
import { fetchApi } from '@/pages/api/request';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DataTujuanOPD = dynamic(() => import('@/components/pages/rencana-opd/tujuan-opd/list'), {
  ssr: false,
  loading: () => <Loading />
})

const TujuanOPD = () => {
  const router = useRouter();
  const [dataTujuanOPD, setDataTujuanOPD] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { storeKodeOPD } = useSelector((state: State) => ({
    storeKodeOPD: state.filter.storeKodeOPD
  }), shallowEqual);

  useEffect(() => {
    if (storeKodeOPD.length != 0) getTujuanOPD();
  }, [storeKodeOPD]);

  const getTujuanOPD = async () => {
    setLoading(true);
    const response = await fetchApi({
      url: `/tujuan_opd/getAllTujuanOPD/${storeKodeOPD.value}`,
      method: 'get',
      type: 'auth'
    })

    if (!response.success) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    } else {
      const { data } = response.data;
      setDataTujuanOPD(data);
      setLoading(false);
    }
  }

  const handleAddData = () => router.push('/rencana-opd/tujuan-opd/tambah');

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='tujuan-opd-container'>
      <Breadcrumb pageName="Tujuan OPD" />

      {loading ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : (
        storeKodeOPD.length != 0 ? (
          <>
            <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
              <div>Tujuan {storeKodeOPD.label}</div>
            </div>
            <div className='body relative'>
              <div className='flex justify-between items-center mt-10 mb-3'>
                <div className='flex'>
                  <button
                    className='bg-xl-base px-4 py-[4px] text-white rounded rounded-md hover:shadow-lg flex gap-2 items-center justify-center'
                    onClick={handleAddData}
                  >
                    <AiFillFolderAdd size={18} />
                    Tambah
                  </button>
                </div>
              </div>
              <div style={gradientStyle}>
                <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
                  <GiCalendarHalfYear size={20} />
                  <div className='text-title-xsm'>Tujuan OPD</div>
                </div>
              </div>
              <DataTujuanOPD data={dataTujuanOPD} />
            </div>
          </>
        ) : (
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="warning">Silakan Pilih OPD dan Tahun terlebih dahulu !</Alert>
          </Stack>
        )
      )}
    </div>
  )
}

export default withAuth(TujuanOPD);