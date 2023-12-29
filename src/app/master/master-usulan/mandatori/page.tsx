'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { BsPeopleFill } from "react-icons/bs";
import { FaSync } from 'react-icons/fa';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { BsFillBookmarksFill } from 'react-icons/bs';
import withAuth from '@/components/utils/withAuth';
import DataMusrenbang from '@/components/pages/master/master-usulan/musrenbang/list';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';
import { fetchMandatori } from './api';
import dynamic from 'next/dynamic';

const DataMandatori = dynamic(() => import('@/components/pages/master/master-usulan/mandatori/list'), {
  ssr: false,
  loading: () => <Loading />
})

const Mandatori = () => {
  const [dataMandatori, setDataMandatori] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { storeKodeOPD, storeYear } = useSelector((state: State) => ({
    storeKodeOPD: state.filter.storeKodeOPD,
    storeYear: state.filter.storeYear
  }), shallowEqual);

  useEffect(() => {
    if (storeKodeOPD.length != 0 && storeYear.length != 0) getMandatori();
  }, [storeKodeOPD, storeYear]);

  const getMandatori = async () => {
    try {
      setLoading(true);
      const response = await fetchMandatori(storeKodeOPD.value);

      if (response.status == 200) {
        setDataMandatori(response.data.results);
        setLoading(false);
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Koneksi bermasalah!",
        });
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const filtered = dataMandatori.filter((item: any) =>
      Object.values(item).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const displayedData = searchQuery ? filteredData : dataMandatori;

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='mandatori-container'>
      <Breadcrumb pageName="Mandatori" />

      {loading ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : (
        storeYear.length != 0 && storeKodeOPD.length != 0 ? (
          <>
            <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
              <div>Usulan Mandatori</div>
            </div>
            <div className='body relative'>
              <div className='flex justify-between items-center mt-10'>
                <div className='flex'></div>
                <div className='flex gap-3 bg-white items-center border border-light-gray rounded-3xl p-2 mb-3'>
                  <BiSearch size={22} className='text-deep-gray' />
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={searchQuery}
                    placeholder='Search . . .'
                    onChange={(e) => handleSearchChange(e)}
                    className='focus:outline-none w-full outline-none text-Axiata-Book' />
                </div>
              </div>
              <div style={gradientStyle}>
                <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
                  <BsFillBookmarksFill size={20} />
                  <div className='text-title-xsm'>Mandatori</div>
                </div>
              </div>
              <DataMandatori data={displayedData} />
            </div>
          </>
        ) : (
          <div className='w-full bg-white p-4 rounded-lg flex items-center justify-center text-title-xsm font-medium'>Silakan Pilih OPD dan Tahun !</div>
        )
      )}
    </div>
  )
}

export default withAuth(Mandatori);