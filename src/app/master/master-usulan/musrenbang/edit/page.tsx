'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { FaWpforms } from "react-icons/fa";
import withAuth from '@/components/utils/withAuth';
import AddMusrenbangForm from '@/components/pages/master/master-usulan/musrenbang/add';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import EditMusrenbangForm from '@/components/pages/master/master-usulan/musrenbang/edit';

const EditMusrenbang = () => {
  const { storePayload } = useSelector((state: State) => ({
    storePayload: state.payload.storePayload
  }), shallowEqual);

  return (
    <div className='edit-tujuan-opd-container'>
      <Breadcrumb pageName="Musrenbang / Edit" />
      <div className='mt-8 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899]'>
        <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
          <FaWpforms size={20} />
          <div className='text-title-xsm'>Form Edit Musrenbang</div>
        </div>
      </div>
      <EditMusrenbangForm data={storePayload} />
    </div>
  )
}

export default withAuth(EditMusrenbang);