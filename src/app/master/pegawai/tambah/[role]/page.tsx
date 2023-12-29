'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/utils/withAuth';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { FaWpforms } from "react-icons/fa";
import AddPegawaiForm from '@/components/pages/master/pegawai/add';
import { fetchApi } from '@/pages/api/request';
import axios from 'axios';

const TambahPegawai = ({ params }: { params: { role: string } }) => {
  const { role } = params;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getDataOPD();
  }, []);

  const getDataOPD = async () => {
    setLoading(true);
    const response = await axios({
      url: 'http://localhost:3000/api/v1/opds.json',
      method: 'get'
    })
    console.log(response, '????');

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
      <AddPegawaiForm />
    </div>
  )
}

export default withAuth(TambahPegawai);