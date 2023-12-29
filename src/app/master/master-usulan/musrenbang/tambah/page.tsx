'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { FaWpforms } from "react-icons/fa";
import withAuth from '@/components/utils/withAuth';
import AddMusrenbangForm from '@/components/pages/master/master-usulan/musrenbang/add';

const TambahMusrenbang = () => {
  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #22c1c3, #fdbb2d)',
  };

  return (
    <div className='tambah-tujuan-opd-container'>
      <Breadcrumb pageName="Musrenbang / Tambah" />
      <div style={gradientStyle} className='mt-8'>
        <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
          <FaWpforms size={20} />
          <div className='text-title-xsm'>Form Tambah Musrenbang</div>
        </div>
      </div>
      <AddMusrenbangForm />
    </div>
  )
}

export default withAuth(TambahMusrenbang);