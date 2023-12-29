'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { GiCalendarHalfYear } from "react-icons/gi";
import { BiSolidAddToQueue } from 'react-icons/bi';
import withAuth from '@/components/utils/withAuth';
import Loading from '@/components/global/Loading/loading';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DataProgramKegiatan = dynamic(() => import('@/components/pages/rencana-opd/program-kegiatan/list'), {
  ssr: false,
  loading: () => <Loading />
});

const ProgramKegiatan = () => {
  const router = useRouter();
  const [dataProgram, setDataProgram] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { storeKodeOPD, storeYear } = useSelector((state: State) => ({
    storeKodeOPD: state.filter.storeKodeOPD,
    storeYear: state.filter.storeYear
  }), shallowEqual);

  useEffect(() => {
    if (storeKodeOPD.length != 0 && storeYear.length != 0) getProgram();
  }, [storeKodeOPD, storeYear]);

  const getProgram = async () => {
    setLoading(true);
    const response = await fetchApi({
      url: `/program/getAllProgram/${storeKodeOPD.value}/${storeYear.value}`,
      method: "get",
      type: "auth",
    })

    if (!response.success) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Koneksi bermasalah!',
      })
      setLoading(false);
    } else {
      const { data } = response.data;
      setDataProgram(data);
      setLoading(false);
    }
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='program-opd-container'>
      <Breadcrumb pageName="Program, Kegiatan, & Sub Kegiatan" />

      {loading ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : (
        storeYear.length != 0 && storeKodeOPD.length != 0 ? (
          <>
            <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
              <div>Program, Kegiatan, & Sub Kegiatan</div>
              <div>{storeKodeOPD.label} Tahun {storeYear.label}</div>
            </div>
            <div className='body relative'>
              <div style={gradientStyle} className='mt-10'>
                <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
                  <GiCalendarHalfYear size={20} />
                  <div className='text-title-xsm'>Program, Kegiatan, & Sub Kegiatan</div>
                </div>
              </div>
              <DataProgramKegiatan data={dataProgram} tahun={storeYear.value} />
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

export default withAuth(ProgramKegiatan);