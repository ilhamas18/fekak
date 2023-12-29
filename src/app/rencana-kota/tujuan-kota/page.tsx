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
import DataTujuanKota from '@/components/pages/rencana-kota/tujuan-kota/list';

const TujuanKota = () => {
  const router = useRouter();
  const [dataTujuanKota, setDataTujuanKota] = useState<any>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchTujuanKota();
  }, []);

  const fetchTujuanKota = () => {
    let temp: any = [
      {
        id: 1,
        tujuan_kota: '1. Terwujudnya tata kelola pemerintahan yang baik, bersih, dan profesional yang berorientasi pada pelayanan publik berbasis smart cities	2021 - 2024',
        periode: 'Nilai Indeks RB',
        indikator: [
          {
            text: 'Indeks Reformasi Birokrasi',
            target: '66',
            satuan: 'SKOR',
            tahun: '2023'
          },
          {
            text: 'Indeks Reformasi Birokrasi',
            target: '67',
            satuan: 'SKOR',
            tahun: '2023'
          },
          {
            text: 'Indeks Reformasi Birokrasi',
            target: '68',
            satuan: 'SKOR',
            tahun: '2023'
          },
          {
            text: 'Indeks Reformasi Birokrasi',
            target: '69',
            satuan: 'SKOR',
            tahun: '2023'
          },
          {
            text: 'Indeks Pembangunan Manusia',
            target: '70,71',
            satuan: 'SKOR',
            tahun: '2023'
          }
        ],
      },
      {
        id: 2,
        tujuan_kota: '2.1. Terwujudnya Infrastruktur Kota yang Berwawasan Lingkungan',
        periode: 'Nilai Indeks RB',
        indikator: [
          {
            text: 'Indeks Reformasi Birokrasi',
            target: '66',
            satuan: 'SKOR',
            tahun: '2023'
          },
          {
            text: 'Indeks Reformasi Birokrasi',
            target: '68',
            satuan: 'SKOR',
            tahun: '2023'
          },
          {
            text: 'Indeks Reformasi Birokrasi',
            target: '69',
            satuan: 'SKOR',
            tahun: '2023'
          },
        ],
      },
    ]
    setDataTujuanKota(temp);
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='tujuan-kota-container'>
      <Breadcrumb pageName="Tujuan Kota" />

      <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
        <div>Data Tujuan Kota</div>
      </div>
      <div className='body relative'>
        <div className='flex justify-between items-center mt-10'>
          <div className='flex'>
            <button
              className='bg-xl-base px-4 py-1 text-white rounded rounded-md hover:shadow-lg'
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
            <GiCalendarHalfYear size={20} />
            <div className='text-title-xsm'>Tujuan Kota</div>
          </div>
        </div>
        <DataTujuanKota data={dataTujuanKota} />
      </div>
    </div>
  )
}

export default withAuth(TujuanKota);