'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import Loading from '@/components/global/Loading/loading';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { FcIdea } from 'react-icons/fc';
import withAuth from '@/components/utils/withAuth';
import { BiSearch } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { fetchPokpirs } from './api';
import dynamic from 'next/dynamic';

const DataPokokPikiran = dynamic(() => import('@/components/pages/master/master-usulan/pokpirs/list'), {
  ssr: false,
  loading: () => <Loading />
})

const PokokPikiran = () => {
  const router = useRouter();
  const [dataPokpirs, setDataPokpirs] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { storeKodeOPD, storeYear } = useSelector((state: State) => ({
    storeKodeOPD: state.filter.storeKodeOPD,
    storeYear: state.filter.storeYear
  }), shallowEqual);

  useEffect(() => {
    if (storeKodeOPD.length != 0 && storeYear.length != 0) getDataPokpirs();
  }, [storeKodeOPD, storeYear]);

  const getDataPokpirs = async () => {
    try {
      setLoading(true);
      const response = await fetchPokpirs(storeYear.value);

      if (response.status == 200) {
        setDataPokpirs(response.data.results);
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
    const filtered = dataPokpirs.filter((item: any) =>
      Object.values(item).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }

  const displayedData = searchQuery ? filteredData : dataPokpirs;

  const handleAddData = () => router.push('/master/master-usulan/pokpirs/tambah');

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='pokok-pikiran-container'>
      <Breadcrumb pageName="Pokok Pikiran" />

      {loading ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : (
        storeKodeOPD.length != 0 && storeYear.length != 0 ? (
          <>
            <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
              <div>Usulan Pokok Pikiran DPRD</div>
            </div>
            <div className='body relative'>
              <div className='flex justify-between items-center mt-10'>
                <div className='flex gap-2'>
                  <div>
                    <button
                      className='bg-xl-base flex gap-3 px-4 py-2 items-center justify-center rounded-md text-center text-white mb-2 hover:bg-dark-xl'
                      onClick={handleAddData}
                    >
                      <div><BiSolidAddToQueue size={16} /></div>
                      <div>Tambah Usulan</div>
                    </button>
                  </div>
                </div>
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
                  <FcIdea size={24} />
                  <div className='text-title-xsm'>Pokok Pikiran</div>
                </div>
              </div>
              <DataPokokPikiran data={displayedData} />
            </div>
          </>
        ) : (
          <div className='w-full bg-white p-4 rounded-lg flex items-center justify-center text-title-xsm font-medium'>Silakan Pilih OPD dan Tahun !</div>
        )
      )}
    </div>
  )
}

export default withAuth(PokokPikiran);