import * as React from 'react';
import { useState, useRef } from 'react';
// import TacticalProps from './tactical';
import { TbBrandTorchain } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { DummyData } from '../dummy';
import AddPohonForm from '../add';
import TacticalTematikProps from './tacticalTematik';
import SubSubTematikProps from './subSubTematik';

interface PropTypes {
  subTematik: any;
  key: number;
  showAll: boolean;
  trigger: boolean;
  getPokinOPD: any;
}

const SubTematikProps = ({ subTematik, showAll, trigger, key, getPokinOPD }: PropTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const [idStrategic, setIdStrategic] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [showSubSubTematik, setShowSubSubTematik] = useState<boolean>(showAll || false);
  const [openAddTactical, setOpenAddTactical] = useState<boolean>(false);

  const handleOpenAddForm = (id: number) => {
    setIdStrategic(id);
    setOpenAddTactical(true);
    setTimeout(() => {
      document.getElementById("addForm")!.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 600);
  }

  return (
    <li>
      <div className='tree-child bg-white w-[30em] flex flex-col gap-4 border' key={key}>
        <div className={`${!openEdit ? 'show' : 'hidden'}`}>
          <div className='border w-full'>
            <div className='font-medium text-medium'>SUB TEMATIK</div>
          </div>
          <table className='flex flex-col border bg-white mt-4'>
            <tbody>
              <tr className='flex items-center border p-2'>
                <td className='w-[30%] text-left'>SUB TEMATIK</td>
                <td className='w-[5%]'>:</td>
                <td className='w-[65%] text-left'>{subTematik.sub_tematik}</td>
              </tr>
              {subTematik.indikator?.map((el2: any, i2: number) => (
                <>
                  <tr className='flex items-center border p-2' key={i2}>
                    <td className='w-[30%] text-left text-title-ss2'>INDIKATOR {i2 + 1}</td>
                    <td className='w-[5%]'>:</td>
                    <td className='w-[65%] text-left'>{el2.indikator}</td>
                  </tr>
                  <tr className='flex items-center border p-2'>
                    <td className='w-[30%] text-left text-title-ss2'>TARGET / SATUAN</td>
                    <td className='w-[5%]'>:</td>
                    <td className='w-[65%] text-left'>{el2.target} {el2.satuan}</td>
                  </tr>
                </>
              ))}
              <tr className='flex items-center border p-2'>
                <td className='w-[30%] text-left text-title-ss2'>KETERANGAN</td>
                <td className='w-[5%]'>:</td>
                <td className='w-[65%] text-left'>{subTematik.keterangan}</td>
              </tr>
            </tbody>
          </table>
          <div className='flex flex-col space-y-3 w-full'>
            {/* <button className='px-4 py-1 rounded rounded-md border hover:bg-xl-base duration-500 mt-4 w-full' onClick={() => setShowDetail(!showDetail)}>
              {!showDetail ? 'Detail' : 'Tutup'}
            </button> */}
            <div className='bg-white w-full flex flex-row justify-between items-center px-2 py-1'>
              <div>
                <button
                  className='px-2 py-1 rounded rounded-md border border-[#f59e0b] text-[#f59e0b] duration-500 flex items-center justify-center hover:shadow-2xl gap-2'
                  onClick={() => setOpenEdit(!openEdit)}
                >
                  <FaEdit size={16} />
                  <span>Edit</span>
                </button>
              </div>
              <div>
                <button className='px-2 py-1 rounded rounded-md border border-[#dc2626] text-[#dc2626] duration-500 flex items-center justify-center hover:shadow-2xl gap-2'>
                  <AiFillDelete size={16} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
            {!showSubSubTematik ? (
              <button className='px-4 py-1 rounded rounded-md border w-full hover:bg-xl-base duration-500' onClick={() => setShowSubSubTematik(true)}>
                Show
              </button>
            ) : (
              <div className='flex gap-2'>
                <button className='px-4 py-1 rounded rounded-md border w-full hover:bg-xl-base duration-500' onClick={() => setShowSubSubTematik(false)}>
                  Hidden
                </button>
                <button
                  className='px-4 py-1 rounded rounded-md bg-xl-base w-full hover:shadow-lg duration-500 flex gap-2 items-center justify-center'
                  onClick={() => handleOpenAddForm(subTematik.id)}
                >
                  <BiSolidAddToQueue size={18} />
                  Tactical
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={`${openEdit ? 'show duration-500' : 'hidden'} duration-500`}>
          {/* <EditPohonForm type="strategic" data={strategic} setOpenEdit={setOpenEdit} /> */}
        </div>
      </div>
      {showSubSubTematik && (
        <ul>
          <SubSubTematikProps
            // data={data}
            // tactical={el}
            // key={index}
            showAll={showAll}
            getPokinOPD={getPokinOPD}
          />
          {/* {openAddTactical && (
            <li>
              <div id={'addForm'}>
                <AddPohonForm
                  formType='Tactical'
                  setOpenAddTactical={setOpenAddTactical}
                  idStrategic={idStrategic}
                  getPokinOPD={getPokinOPD}
                />
              </div>
            </li>
          )} */}
        </ul>
      )}
    </li>
  )
}

export default SubTematikProps

