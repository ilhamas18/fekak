'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { SiMicrostrategy } from "react-icons/si";
import { BiSolidAddToQueue } from 'react-icons/bi';
import withAuth from '@/components/utils/withAuth';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DataTematikKota = dynamic(() => import('@/components/pages/rencana-kota/tematik/list'), {
  ssr: false,
  loading: () => <Loading />
});

const TematikKota: React.FC = () => {
  const router = useRouter();
  const [dataTematik, setDataTematik] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { storeYear } = useSelector((state: State) => ({
    storeYear: state.filter.storeYear
  }), shallowEqual);

  useEffect(() => {
    getTematik();
  }, []);

  const getTematik = async () => {
    setLoading(true);
    const response = await fetchApi({
      url: `/api/v1/tematiks`,
      method: 'get',
      type: 'auth'
    })

    if (response.status == 200) {
      setDataTematik(response.data);
      setLoading(false);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    }
  }

  const handleAddTematik = () => router.push('/rencana-kota/tematik/tambah');

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    setSearchQuery(keyword);

    const filteredResults = dataTematik.filter((item: any) => {
      if (
        item.tematik.toLowerCase().includes(keyword) ||
        item.keterangan.toLowerCase().includes(keyword)
      ) {
        return true;
      }
      // const hasMatchingIndikator = item.indikator.some((indikator: any) =>
      //   Object.values(indikator).some((value: any) =>
      //     typeof value === 'string' && value.toLowerCase().includes(keyword)
      //   )
      // );
      // return hasMatchingIndikator;
    });

    setFilteredData(filteredResults);
  };

  const displayedData = searchQuery ? filteredData : dataTematik;

  return (
    <div className='tematik-kota-container'>
      <Breadcrumb pageName="Tematik Kota" />

      {loading ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : (
        storeYear.length != 0 ? (
          <>
            <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
              <div>Data Tematik Kota</div>
            </div>
            <div className='body relative'>
              <div className='flex justify-between items-center mt-10'>
                <div className='flex'>
                  <button
                    className='bg-xl-base px-4 py-1 text-white rounded rounded-md hover:shadow-lg'
                    onClick={handleAddTematik}
                  >
                    Tambah Tematik
                  </button>
                </div>
                <div className='flex gap-3 bg-white items-center border border-light-gray rounded-3xl p-2 mb-3'>
                  <BiSearch size={22} className='text-deep-gray' />
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={searchQuery}
                    placeholder='Search . . .'
                    onChange={handleSearch}
                    className='focus:outline-none w-full outline-none text-Axiata-Book'
                  />
                </div>
              </div>
              <div style={gradientStyle}>
                <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
                  <SiMicrostrategy size={20} />
                  <div className='text-title-xsm'>Tematik Kota</div>
                </div>
              </div>
              <DataTematikKota data={displayedData} getTematik={getTematik} setLoading={setLoading} />
            </div>
          </>
        ) : (
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="warning">Silakan Tahun terlebih dahulu !</Alert>
          </Stack>
        )
      )}
    </div>
  )
}

export default withAuth(TematikKota);