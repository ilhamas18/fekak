'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/utils/withAuth';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { FaWpforms } from "react-icons/fa";
import AddPegawaiForm from '@/components/pages/master/pegawai/add';
import { fetchApi } from '@/pages/api/request';
import Swal from "sweetalert2";
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';

const TambahPegawai = ({ params }: { params: { role: string } }) => {
  const { role } = params;
  const [listOpd, setListOPD] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getOpd();
  }, [])

  const getOpd = async () => {
    setLoading(true);
    const response = await fetchApi({
      url: '/api/v1/opds',
      method: 'get',
      type: 'auth'
    })

    if (response.status == 200) {
      let temp: any = [];
      response.data.forEach((el: any) => {
        temp.push({
          label: el.nama_opd,
          value: el.kode_opd
        })
      })
      setListOPD(temp);
      setLoading(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Koneksi bermasalah',
      })
      setLoading(false);
    }
  }

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #22c1c3, #fdbb2d)',
  };

  return (
    <div className='tambah-pegawai-container'>
      <Breadcrumb pageName="Pegawai / Tambah" />
      <div style={gradientStyle} className='mt-8'>
        <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
          <FaWpforms size={20} />
          <div className='text-title-xsm'>Form Tambah {role.toUpperCase()}</div>
        </div>
      </div>
      <AddPegawaiForm listOpd={listOpd} />
    </div>
  )
}

export default withAuth(TambahPegawai);