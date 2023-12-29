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
import DataLaporanKAK from '@/components/pages/laporan/kak/list';

const RencanaKinerja = () => {
  const router = useRouter();
  const [dataRencanaKinerja, setDataRencanaKinerja] = useState<any>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchTujuanOPD();
  }, []);

  const fetchTujuanOPD = () => {
    let temp: any = [
      {
        sub_kegiatan: 'Subkegiatan: Koordinasi Penyusunan Dokumen Perencanaan Pembangunan Daerah Bidang Pemerintahan (RPJPD, RPJMD dan RKPD)',
        indikator: '-',
        target: '-',
        satuan: '-',
        anggaran: 'Rp. 72,000,000',
        pemilik_rencana: [
          {
            nama: 'MAYA FALIA',
            rencana_kinerja: 'Terverifikasinya Pohon Kinerja yang disusun OPD Mitra Perencanaan Pemerintahan',
            indikator: 'persentase OPD Mitra Perencanaan Pemerintahan yang Pohon Kinerja nya terverifikasi',
            target: '100',
            satuan: 'Persen',
            anggaran: 'Rp. 0',
            renaksi: [
              {
                renaksi: 'Mengumpulkan data dari OPD mitra perencanaan pemerintahan',
                anggaran: 'Rp 0'
              },
              {
                renaksi: 'Mengolah data yang masuk',
                anggaran: 'Rp 0'
              },
              {
                renaksi: 'Melaksanakan desk dengan OPD mitra perencanaan pemerintahan',
                anggaran: 'Rp 0'
              },
              {
                renaksi: 'Finalisasi pohon kinerja OPD mitra perencanaan pemerintahan',
                anggaran: 'Rp 0'
              }
            ]
          },
          {
            nama: 'LUKMAN HAKIM',
            rencana_kinerja: 'Terverifikasinya Pohon Kinerja yang disusun OPD Mitra Perencanaan Pemerintahan',
            indikator: 'persentase OPD Mitra Perencanaan Pemerintahan yang Pohon Kinerja nya terverifikasi',
            target: '100',
            satuan: 'Persen',
            anggaran: 'Rp. 0',
            renaksi: [
              {
                renaksi: 'Mengumpulkan data dari OPD mitra perencanaan pemerintahan',
                anggaran: 'Rp 0'
              },
              {
                renaksi: 'Mengolah data yang masuk',
                anggaran: 'Rp 0'
              },
            ]
          }
        ]
      },
      {
        sub_kegiatan: 'Subkegiatan: Koordinasi Penyusunan Dokumen Perencanaan Pembangunan Daerah Bidang Pemerintahan (RPJPD, RPJMD dan RKPD)',
        indikator: '-',
        target: '-',
        satuan: '-',
        anggaran: 'Rp. 72,000,000',
        pemilik_rencana: []
      }
    ]
    setDataRencanaKinerja(temp);
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='container'>
      <Breadcrumb pageName="Tujuan OPD" />

      <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
        <div>Laporan KAK Tahun 2023_perubahan</div>
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
            <GiCalendarHalfYear size={20} />
            <div className='text-title-xsm'>Laporan KAK</div>
          </div>
        </div>
        <DataLaporanKAK data={dataRencanaKinerja} />
      </div>
    </div>
  )
}

export default withAuth(RencanaKinerja);