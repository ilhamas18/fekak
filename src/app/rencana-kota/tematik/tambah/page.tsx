'use client';
import * as React from 'react';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import withAuth from '@/components/utils/withAuth';
import AddTematikForm from '@/components/pages/rencana-kota/tematik/add';
import { FaWpforms } from "react-icons/fa";

const TambahTematik = () => {
  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #22c1c3, #fdbb2d)',
  };

  return (
    <div className='tambah-tematik-container'>
      <Breadcrumb pageName="Tematik / Tambah" />
      <div style={gradientStyle} className='mt-8'>
        <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
          <FaWpforms size={20} />
          <div className='text-title-xsm'>Form Tambah Tematik</div>
        </div>
      </div>
      <AddTematikForm />
    </div>
  )
}

export default withAuth(TambahTematik);
