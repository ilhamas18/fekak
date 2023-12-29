import * as React from 'react';
import { useState, useEffect } from 'react';
import DataTable from '@/components/common/table/dataTable';

interface PropTypes {
  data: any;
}

const DataRekening = ({ data }: PropTypes) => {
  const columns = [
    {
      id: 'kode_rekening',
      label: 'Kode Rekening',
      width: 220,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'jenis_rekening',
      label: 'Jenis Rekening',
      width: 220,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
  ];

  return (
    <div className='bg-white dark:bg-meta-4 dark:text-white'>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  )
}

export default DataRekening;