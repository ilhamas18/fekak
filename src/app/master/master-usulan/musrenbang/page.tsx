'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';
import withAuth from '@/components/utils/withAuth';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';
import { fetchMusrenbang } from './api';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DataMusrenbang = dynamic(() => import('@/components/pages/master/master-usulan/musrenbang/list'), {
  ssr: false,
  loading: () => <Loading />
})

const Musrenbang = () => {
  const router = useRouter();
  const [dataMusrenbang, setDataMusrenbang] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { storeKodeOPD, storeYear } = useSelector((state: State) => ({
    storeKodeOPD: state.filter.storeKodeOPD,
    storeYear: state.filter.storeYear
  }), shallowEqual);

  useEffect(() => {
    if (storeKodeOPD.length != 0 && storeYear.length != 0) getDataMusrenbang();
  }, [storeKodeOPD, storeYear]);

  const getDataMusrenbang = async () => {
    try {
      setLoading(true);
      const response = await fetchMusrenbang(storeYear.value);

      if (response.status == 200) {
        const temp: any = [];
        response.data.results.forEach((el: any, i: number) => {
          temp.push({
            id: el.id,
            tahun: el.tahun,
            usulan: el.usulan,
            alamat: el.alamat,
            permasalahan: '-',
            opd: el.opd,
            pengambilUsulan: el.pengambil_usulan,
            status: el.status
          })
        })
        setDataMusrenbang(temp);
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
    const filtered = dataMusrenbang.filter((item: any) =>
      Object.values(item).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const displayedData = searchQuery ? filteredData : dataMusrenbang;

  const handleAddData = () => router.push('/master/master-usulan/musrenbang/tambah');

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className='musrenbang-container'>
      <Breadcrumb pageName="Musrenbang" />

      {loading ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : (
        storeYear.length != 0 && storeKodeOPD.length != 0 ? (
          <>
            <div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
              <div>Usulan Musrenbang</div>
              <div>{storeKodeOPD.label}</div>
              <div>Tahun {storeYear.label}</div>
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
                    onChange={(e: any) => handleSearchChange(e)}
                    className='focus:outline-none w-full outline-none text-Axiata-Book' />
                </div>
              </div>
              <div style={gradientStyle}>
                <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
                  <VscGitPullRequestGoToChanges size={20} />
                  <div className='text-title-xsm'>Musrenbang</div>
                </div>
              </div>
              <DataMusrenbang data={displayedData} />
            </div>
          </>
        ) : (
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="warning">Silakan Pilih OPD dan Tahun terlebih dahulu !</Alert>
          </Stack>
          // <div className='w-full bg-white p-4 rounded-lg flex items-center justify-center text-title-xsm font-medium'>Silakan Pilih OPD dan Tahun !</div>
        )
      )}
    </div>
  )
}

export default withAuth(Musrenbang);