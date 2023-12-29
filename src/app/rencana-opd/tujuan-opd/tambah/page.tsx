'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { FaWpforms } from "react-icons/fa";
import AddTujuanOPDForm from '@/components/pages/rencana-opd/tujuan-opd/add';
import withAuth from '@/components/utils/withAuth';

const TambahTujuanOPD = () => {
  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #22c1c3, #fdbb2d)',
  };

  return (
    <div className='tambah-tujuan-opd-container'>
      <Breadcrumb pageName="Tujuan OPD / Tambah" />
      <div style={gradientStyle} className='mt-8'>
        <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
          <FaWpforms size={20} />
          <div className='text-title-xsm'>Form Tambah Tujuan OPD</div>
        </div>
      </div>
      <AddTujuanOPDForm />
    </div>
  )
}

export default withAuth(TambahTujuanOPD);