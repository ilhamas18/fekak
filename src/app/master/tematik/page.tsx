'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { FaBarsStaggered } from "react-icons/fa6";
import withAuth from '@/components/utils/withAuth';
import DataMusrenbang from '@/components/pages/master/master-usulan/musrenbang/list';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';
import DataTematik from '@/components/pages/master/tematik/list';

const Tematik = () => {
  const router = useRouter();
  const [dataTematik, setDataTematik] = useState<any>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchDataInovasi();
  }, []);

  const fetchDataInovasi = () => {
    let temp: any = [
      {
        id: 1,
        kode_tematik: 'pprg',
        nama_tematik: 'PPRG',
        tahun: 2023
      },
      {
        id: 2,
        kode_tematik: 'smart-city',
        nama_tematik: 'SMART CITY',
        tahun: 2023
      },
    ]
    setDataTematik(temp);
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='tematik-container'>
      <Breadcrumb pageName="Tematik" />

      <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
        <div>Daftar Tematik</div>
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
            <FaBarsStaggered size={20} />
            <div className='text-title-xsm'>Tematik</div>
          </div>
        </div>
        <DataTematik data={dataTematik} />
      </div>
    </div>
  )
}

export default withAuth(Tematik);