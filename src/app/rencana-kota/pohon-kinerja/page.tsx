'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { PiTreeStructure } from "react-icons/pi";
import { BiSolidAddToQueue } from 'react-icons/bi';
import withAuth from '@/components/utils/withAuth';
import Loading from '@/components/global/Loading/loading';
import TextInput from '@/components/common/text-input/input';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DataPohonKinerjaKota = dynamic(() => import('@/components/pages/rencana-kota/pohon-kinerja/list'), {
  ssr: false,
  loading: () => <Loading />
})

const PohonKinerjaKota = () => {
  const router = useRouter();
  const [dataPokinKota, setDataPokinKota] = useState<any>([]);
  const [dataTematik, setDataTematik] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { storeKodeOPD, storeYear } = useSelector((state: State) => ({
    storeKodeOPD: state.filter.storeKodeOPD,
    storeYear: state.filter.storeYear
  }), shallowEqual);

  useEffect(() => {
    getTematik();
  }, [storeKodeOPD, storeYear]);

  const getTematik = async () => {
    setLoading(true);
    const response = await fetchApi({
      url: `/api/v1/tematiks`,
      method: 'get',
      type: 'auth'
    })

    if (response.status == 200) {
      let temp: any = [];
      response.data.forEach((el: any) => {
        temp.push({
          label: el.tematik,
          value: el.id
        })
      })
      setDataTematik(temp);
      setLoading(false);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    }
  }

  const handleGetTematik = async (id: number) => {
    // setLoading(true);
    const response = await fetchApi({
      url: `/api/v1/tematiks/${id}`,
      method: 'get',
      type: 'auth'
    })
    console.log(response);

    if (response.status == 200) {
      setDataPokinKota(response.data);
      setLoading(false);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    }
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='Pohon-kinerja-kota-container'>
      <Breadcrumb pageName="Pohon Kinerja Kota" />

      {loading ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : (
        storeYear.length != 0 ? (
          <>
            <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
              <div>Pohon Kinerja Kota {storeYear.label}</div>
            </div>
            <div className='body relative'>
              <div className='flex justify-between items-center mt-10'>
                <div></div>
                <div className='w-[40%]'>
                  <TextInput
                    type="dropdown"
                    id="tematik"
                    name="tematik"
                    label="Nama Tematik"
                    placeholder="Ketik dan Pilih Tematik"
                    options={dataTematik}
                    change={(selectedOption: any) => handleGetTematik(selectedOption.value)}
                  />
                </div>
              </div>
              <div style={gradientStyle} className='mt-4'>
                <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
                  <PiTreeStructure size={20} />
                  <div className='text-title-xsm'>Pohon Kinerja Kota</div>
                </div>
              </div>
              {dataPokinKota !== null && (
                <DataPohonKinerjaKota data={dataPokinKota} handleGetTematik={handleGetTematik} />
              )}
            </div>
          </>
        ) : (
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="warning">Silakan Tahun terlebih dahulu !</Alert>
          </Stack>
        )
      )}
    </div>
  )
}

export default withAuth(PohonKinerjaKota);