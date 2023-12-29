'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { BsPeopleFill } from "react-icons/bs";
import { FaSync } from 'react-icons/fa';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import withAuth from '@/components/utils/withAuth';
import DataMusrenbang from '@/components/pages/master/master-usulan/musrenbang/list';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';
import DataAnggaranHSPK from '@/components/pages/master/anggaran/hspk/list';

const AnggaranHSPK = () => {
  const router = useRouter();
  const [dataAnggaranHSPK, setDataAnggaranHSPK] = useState<any>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchDataAnggaranHSPK();
  }, []);

  const fetchDataAnggaranHSPK = () => {
    let temp: any = [
      {
        id: 1,
        tahun: 2023,
        kode_barang: '1.1.7.01.01.01.003.00058',
        uraian_barang: 'Kaca',
        spesifikasi: 'Painting| 5 mm (terpasang)',
        satuan: 'M2',
        harga_satuan: '657400',
      },
    ]
    setDataAnggaranHSPK(temp);
  };

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='inisiatif-container'>
      <Breadcrumb pageName="Anggaran HSPK" />

      <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
        <div>Daftar Anggaran HSPK</div>
      </div>
      <div className='body relative'>
        <div className='flex justify-between items-center mt-10'>
          <div className='flex'>
            <button
              className='bg-xl-base px-4 py-1 text-white rounded rounded-md hover:shadow-lg'
            // onClick={handleAddData}
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
              value={search}
              placeholder='Search . . .'
              onChange={(e) => setSearch(e.target.value)}
              className='focus:outline-none w-full outline-none text-Axiata-Book' />
          </div>
        </div>
        <div style={gradientStyle}>
          <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
            <FaMoneyBill1Wave size={20} />
            <div className='text-title-xsm'>Anggaran HSPK</div>
          </div>
        </div>
        <DataAnggaranHSPK data={dataAnggaranHSPK} />
      </div>
    </div>
  )
}

export default withAuth(AnggaranHSPK);