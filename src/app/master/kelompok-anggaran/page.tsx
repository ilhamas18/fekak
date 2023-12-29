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
import DataMusrenbang from '@/components/pages/master/master-usulan/musrenbang/list';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';
import DataKelompokAnggaran from '@/components/pages/master/kelompok-anggaran/list';

const KelompokAnggaran = () => {
  const router = useRouter();
  const [dataKelompokAnggaran, setDataKelompokAnggaran] = useState<any>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchDataKelompokAnggaran();
  }, []);

  const fetchDataKelompokAnggaran = () => {
    let temp: any = [
      {
        id: 1,
        tahun: 2020,
        kelompok: 'Murni',
        kode_kelompok: '2022-murni'
      },
      {
        id: 2,
        tahun: 2020,
        kelompok: 'Perubahan',
        kode_kelompok: '2022-perubahan'
      },
      {
        id: 3,
        tahun: 2021,
        kelompok: 'Murni',
        kode_kelompok: '2023-murni'
      },
      {
        id: 4,
        tahun: 2021,
        kelompok: 'Perubahan',
        kode_kelompok: '2023-perubahan'
      },
    ]
    setDataKelompokAnggaran(temp);
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='tahun-container'>
      <Breadcrumb pageName="Tahun" />

      <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
        <div>Data Tahun</div>
      </div>
      <div className='body relative'>
        <div className='flex justify-between items-center mt-10'>
          <div className='flex'>
          </div>
          <div className='flex gap-3 bg-white items-center border border-light-gray rounded-3xl p-2 mb-3'>
            <BiSearch size={22} className='text-deep-gray' />
            <input
              type="text"
              id="search"
              name="search"
              value={search}
              placeholder='Search . . .'
              onChange={(e) => setSearch(e.target.value)}
              className='focus:outline-none w-full outline-none text-Axiata-Book' />
          </div>
        </div>
        <div style={gradientStyle}>
          <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
            <GiCalendarHalfYear size={20} />
            <div className='text-title-xsm'>Tahun</div>
          </div>
        </div>
        <DataKelompokAnggaran data={dataKelompokAnggaran} />
      </div>
    </div>
  )
}

export default withAuth(KelompokAnggaran);