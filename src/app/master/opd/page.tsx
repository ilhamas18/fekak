'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaSync } from 'react-icons/fa';
import { BiSolidAddToQueue } from 'react-icons/bi';
import withAuth from '@/components/utils/withAuth';
import DataMusrenbang from '@/components/pages/master/master-usulan/musrenbang/list';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';

const DataOPD = dynamic(() => import('@/components/pages/master/opd/list'), {
  ssr: false,
  loading: () => <Loading />
});

const OPD = () => {
  const router = useRouter();
  const [dataOPD, setDataOPD] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<any>([]);

  useEffect(() => {
    getOpd();
  }, []);

  const getOpd = async () => {
    setLoading(true);
    const response = await fetchApi({
      url: '/api/v1/opds',
      method: 'get',
      type: 'auth'
    })

    if (response.status == 200) {
      setDataOPD(response.data);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    setSearchQuery(keyword);

    const filteredResults = dataOPD.filter((item: any) =>
      Object.values(item).some((value: any) =>
        typeof value === 'string' && value.toLowerCase().includes(keyword)
      ))

    setFilteredData(filteredResults);
  }

  const displayedData = searchQuery ? filteredData : dataOPD;

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  const handleAddOpd = () => router.push('/master/opd/tambah');

  return (
    <div className='opd-container'>
      <Breadcrumb pageName="Perangkat Daerah" />

      <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
        <div>Daftar Satuan Kerja Perangkat Daerah</div>
        <div>Kabupaten Madiun</div>
      </div>
      <div className='body relative'>
        <div className='flex justify-between items-center mt-10'>
          <div className='flex'>
            <button
              className='bg-xl-base px-4 py-1 text-white rounded rounded-md hover:shadow-lg'
              onClick={handleAddOpd}
            >
              Tambah
            </button>
          </div>
          <div className='flex gap-3 bg-white items-center border border-light-gray rounded-3xl p-2 mb-3'>
            <BiSearch size={22} className='text-deep-gray' />
            <input
              type="text"
              id="search"
              name="search"
              value={searchQuery}
              placeholder='Search . . .'
              onChange={handleSearch}
              className='focus:outline-none w-full outline-none text-Axiata-Book' />
          </div>
        </div>
        <div style={gradientStyle}>
          <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
            <HiBuildingOffice2 size={20} />
            <div className='text-title-xsm'>Perangkat Daerah</div>
          </div>
        </div>
        <DataOPD data={displayedData} />
      </div>
    </div>
  )
}

export default withAuth(OPD);