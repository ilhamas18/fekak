'use client';
import * as React from 'react';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import withAuth from '@/components/utils/withAuth';
import AddTematikForm from '@/components/pages/rencana-kota/tematik/add';
import { FaWpforms } from "react-icons/fa";
import { State } from '@/store/reducer';
import { shallowEqual, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TambahTematik = () => {
  const { storeYear } = useSelector((state: State) => ({
    storeYear: state.filter.storeYear
  }), shallowEqual);

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #22c1c3, #fdbb2d)',
  };

  return (
    <div className='tambah-tematik-container'>
      {storeYear.length != 0 ? (
        <>
          <Breadcrumb pageName="Tematik / Tambah" />
          <div style={gradientStyle} className='mt-8'>
            <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
              <FaWpforms size={20} />
              <div className='text-title-xsm'>Form Tambah Tematik</div>
            </div>
          </div>
          <AddTematikForm year={storeYear} />
        </>
      ) : (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert severity="warning">Silakan Tahun terlebih dahulu !</Alert>
        </Stack>
      )}
    </div>
  )
}

export default withAuth(TambahTematik);
