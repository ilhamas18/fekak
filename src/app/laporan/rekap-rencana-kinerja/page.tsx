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
import DataRekapRencanaKinerja from '@/components/pages/laporan/rekap-rencana-kinerja/list';

const LaporanPenetapan = () => {
  const router = useRouter();
  const [dataRekapRencanaKinerja, setDataRekapRencanaKinerja] = useState<any>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchLaporanPenetapan();
  }, []);

  const fetchLaporanPenetapan = () => {
    let temp: any = [
      {
        sub_kegiatan: 'Belum diisi',
        rencana: [
          {
            pemilik_rencana: 'Nama Pegawai 1',
            strategi: '-',
            rencana_kinerja: '-',
            tahun: 2024,
            indikator_kinerja: 'jumlah diklat yang sesuai kebutuhan',
            target: 100,
            satuan: '%'
          },
          {
            pemilik_rencana: 'Nama Pegawai 2',
            strategi: '-',
            rencana_kinerja: '-',
            tahun: 2024,
            indikator_kinerja: 'persentase kebutuhan pegawai yang terpenuhi',
            target: 100,
            satuan: '%'
          },
          {
            pemilik_rencana: 'Nama Pegawai',
            strategi: '-',
            rencana_kinerja: '-',
            tahun: 2024,
            indikator_kinerja: 'persentase kebutuhan pegawai yang tercukupi',
            target: 100,
            satuan: '%'
          }
        ]
      }
    ]
    setDataRekapRencanaKinerja(temp);
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='container'>
      <Breadcrumb pageName="Laporan Rekap Rencana Kinerja" />

      <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
        <div>Laporan Rekap Rencana Kinerja</div>
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
            <div className='text-title-xsm'>Laporan Rekap Rencana Kinerja</div>
          </div>
        </div>
        <DataRekapRencanaKinerja data={dataRekapRencanaKinerja} />
      </div>
    </div>
  )
}

export default withAuth(LaporanPenetapan);