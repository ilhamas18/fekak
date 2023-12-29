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

const DataPohonKinerjaKota = dynamic(() => import('@/components/pages/rencana-kota/pohon-kinerja/list'), {
  ssr: false,
  loading: () => <Loading />
})

const PohonKinerjaKota = () => {
  const router = useRouter();
  const [dataPokinKota, setDataPokinKota] = useState<any>([]);
  const [dataTematik, setDataTematik] = useState<any>([]);
  const [idTematik, setIdTematik] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { storeKodeOPD, storeYear } = useSelector((state: State) => ({
    storeKodeOPD: state.filter.storeKodeOPD,
    storeYear: state.filter.storeYear
  }), shallowEqual);

  useEffect(() => {
    getTematik();
    handleGetTematik();
  }, [storeKodeOPD, storeYear, idTematik]);

  const getTematik = async () => {
    setLoading(true);
    const response = await fetchApi({
      url: `/tematik/getAllTematik/${storeYear.value}`,
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
      let temp: any = [];
      data.forEach((el: any) => {
        temp.push({
          label: el.tematik,
          value: el.id
        })
      })
      setDataTematik(temp);
      setLoading(false);
    }
  }

  const handleGetTematik = async () => {
    const response = await fetchApi({
      url: `/pokinKota/getPokinKota/${idTematik}`,
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
      setDataPokinKota(data)
    }
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='Pohon-kinerja-kota-container'>
      <Breadcrumb pageName="Pohon Kinerja Kota" />

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
              change={(selectedOption: any) => setIdTematik(selectedOption.value)}
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
    </div>
  )
}

export default withAuth(PohonKinerjaKota);