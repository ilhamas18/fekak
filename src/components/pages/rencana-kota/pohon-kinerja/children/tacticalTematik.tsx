import * as React from 'react';
import { useState, useEffect } from 'react';
import useScrollAnim from '@/components/hooks/useScrollAnim';
import { TbBrandTorchain } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
// import OperationalProps from './operational';
import { BiSolidAddToQueue } from 'react-icons/bi';
import AddPohonForm from '../add';

interface PropTypes {
  data?: any;
  tactical?: any;
  key?: number;
  showAll?: boolean;
  getPokinOPD: boolean;
}

const TacticalTematikProps = ({ data, tactical, key, showAll, getPokinOPD }: PropTypes) => {
  const [trigger, anim] = useScrollAnim();
  const [idTactical, setIdTactical] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showOperational, setShowOperational] = useState<boolean>(showAll || false);
  const [openAddOperational, setOpenAddOperational] = useState<boolean>(false);

  const handleShowDetail = (val: boolean) => {
    setShowDetail(!val);
  }

  const handleOpenAddForm = (id: number) => {
    setIdTactical(id);
    setOpenAddOperational(true);
    setTimeout(() => {
      document.getElementById("addForm")!.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 600);
  }

  return (
    <li ref={trigger}>
      <div className={`bg-[#0284c7] tree-child w-[30em] flex flex-col gap-4 border border-white ${anim(
        1
      )}`} key={key}>
        <div className='border border-white'>
          <div className='text-white font-medium text-medium'>TACTICAL</div>
        </div>
        <table className='flex flex-col border border-black text-black bg-white mt-4'>
          <tbody>
            <tr className='flex items-center border border-light-gray p-2'>
              <td className='w-[30%] text-left'>TACTICAL</td>
              <td className='w-[5%]'>:</td>
              {/* <td className='w-[65%] text-left'>{tactical.tactical}</td> */}
              <td className='w-[65%] text-left'>Contoh Tactical</td>
            </tr>
            {/* {showDetail && (
              <>
                {tactical.indikator?.map((el2: any, i2: number) => (
                  <>
                    <tr className='flex items-center border border-light-gray p-2' key={i2}>
                      <td className='w-[30%] text-left text-title-ss2'>INDIKATOR {i2 + 1}</td>
                      <td className='w-[5%]'>:</td>
                      <td className='w-[65%] text-left'>{el2.indikator}</td>
                    </tr>
                    <tr className='flex items-center border border-light-gray p-2'>
                      <td className='w-[30%] text-left text-title-ss2'>TARGET / SATUAN</td>
                      <td className='w-[5%]'>:</td>
                      <td className='w-[65%] text-left'>{el2.target} {el2.satuan}</td>
                    </tr>
                  </>
                ))}
              </>
            )} */}
          </tbody>
        </table>
        <div className='flex flex-col space-y-3 w-full'>
          <button className='px-4 py-1 rounded rounded-md border border-white text-white hover:bg-xl-base duration-500 mt-4 w-full' onClick={() => handleShowDetail(showDetail)}>
            {!showDetail ? 'Detail' : 'Tutup'}
          </button>
          <div className='bg-white w-full flex flex-row justify-between items-center px-2 py-1'>
            <div>
              <button className='px-2 py-1 rounded rounded-md border border-[#059669] text-[#059669] duration-500 flex items-center justify-center gap-2'>
                <TbBrandTorchain size={16} />
                <span>Crosscutting</span>
              </button>
            </div>
            <div>
              <button className='px-2 py-1 rounded rounded-md border border-[#f59e0b] text-[#f59e0b] duration-500 flex items-center justify-center gap-2'>
                <FaEdit size={16} />
                <span>Edit</span>
              </button>
            </div>
            <div>
              <button className='px-2 py-1 rounded rounded-md border border-[#dc2626] text-[#dc2626] duration-500 flex items-center justify-center gap-2'>
                <AiFillDelete size={16} />
                <span>Hapus</span>
              </button>
            </div>
          </div>
          {!showOperational ? (
            <button className='px-4 py-1 rounded rounded-md border border-white text-white w-full hover:bg-xl-base duration-500' onClick={() => setShowOperational(true)}>
              Show
            </button>
          ) : (
            <div className='flex gap-2'>
              <button className='px-4 py-1 rounded rounded-md border border-white text-white w-full hover:bg-xl-base duration-500' onClick={() => setShowOperational(false)}>
                Hidden
              </button>
              <button
                className='px-4 py-1 rounded rounded-md bg-xl-base text-white w-full hover:shadow-lg duration-500 flex gap-2 items-center justify-center'
                onClick={() => handleOpenAddForm(tactical.id)}
              >
                <BiSolidAddToQueue size={18} />
                Operational
              </button>
            </div>
          )}
        </div>
      </div>
      {/* {showOperational && (
        <ul>
          {tactical.operational?.map((el: any, index: number) => (
            <OperationalProps
              data={data}
              operational={el}
              key={index}
              showAll={showAll}
              getPokinOPD={getPokinOPD}
            />
          ))}
          {openAddOperational && (
            <li>
              <div id={'addForm'}>
                <AddPohonForm
                  formType='Operational'
                  setOpenAddOperational={setOpenAddOperational}
                  idTactical={idTactical}
                  getPokinOPD={getPokinOPD}
                />
              </div>
            </li>
          )}
        </ul>
      )} */}
    </li>
  )
}

export default TacticalTematikProps

