import * as React from 'react';
import { useState, useEffect } from 'react';
import DataTable from '@/components/common/table/dataTable';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';

interface PropTypes {
  data: any;
}

const DataUser = ({ data }: PropTypes) => {
  const columns = [
    {
      id: 'id',
      label: 'No',
      width: 20,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'nama',
      label: 'NAMA/NIP',
      width: 260,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'jabatan',
      label: 'JABATAN',
      width: 260,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'opd',
      label: 'OPD',
      width: 260,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      id: 'role',
      label: 'ROLE',
      width: 260,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center'
    },

  ];

  const handleEdit = (e: any, id: number) => {
    e.preventDefault()
    console.log(id)
  }

  const opt = {
    row: [
      {
        icon: <BiEdit size={20} />
      },
    ],
    name: 'Aksi'
  }

  return (
    <div className='bg-white dark:bg-meta-4 dark:text-white'>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>

      <DataTable
        columns={columns}
        data={data}
        onClick={handleEdit}
        opt={[
          {
            icon: <BiEdit size={20} />,
          },
        ]}
      />
    </div>
  )
}

export default DataUser;