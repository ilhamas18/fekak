'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { FaMoneyBills } from "react-icons/fa6";
import { BiSolidAddToQueue } from 'react-icons/bi';
import withAuth from '@/components/utils/withAuth';
import DataMusrenbang from '@/components/pages/master/master-usulan/musrenbang/list';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';
import DataRekapStrategi from '@/components/pages/laporan/rekap-strategi/list';

const LaporanPenetapan = () => {
  const router = useRouter();
  const [dataRekapStrategi, setDataRekapStrategi] = useState<any>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchLaporanPenetapan();
  }, []);

  const fetchLaporanPenetapan = () => {
    let temp: any = [

    ]
    setDataRekapStrategi(temp);
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='container'>
      <Breadcrumb pageName="Laporan Rekap Strategi" />

      <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
        <div>Laporan Rekap Strategi</div>
      </div>
      <div className='body relative'>
        <div className='flex justify-between items-center mt-10'>
          <div></div>
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
            <FaMoneyBills size={20} />
            <div className='text-title-xsm'>Laporan Rekap Strategi</div>
          </div>
        </div>
        <DataRekapStrategi data={dataRekapStrategi} />
      </div>
    </div>
  )
}

export default withAuth(LaporanPenetapan);