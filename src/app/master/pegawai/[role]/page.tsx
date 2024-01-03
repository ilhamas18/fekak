'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { GiCalendarHalfYear } from "react-icons/gi";
import withAuth from '@/components/utils/withAuth';
import dynamic from 'next/dynamic';
import Loading from '@/components/global/Loading/loading';
import { AiFillFolderAdd } from 'react-icons/ai';
import { fetchApi } from '@/pages/api/request';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Pegawai = () => {
  const router = useRouter();

}