import * as React from 'react';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaRegClone } from 'react-icons/fa';
import AddPokinKotaForm from './add';
import SubTematikProps from './children/subTematik';
import usePreventBodyScroll from '@/components/hooks/usePreventBodyScroll';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { BiSolidAddToQueue } from 'react-icons/bi';
import 'react-horizontal-scrolling-menu/dist/styles.css';
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

interface PropTypes {
  data: any;
  handleGetTematik: any;
}

const DataPohonKinerjaKota = ({ data, handleGetTematik }: PropTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [openAddSubTematik, setOpenSubTematik] = React.useState(false);
  console.log(data);

  const handleOpenAddForm = () => {
    setOpenSubTematik(true);
    setTimeout(() => {
      document.getElementById("addForm")!.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 400);
  }

  return (
    <div className='dark:bg-meta-4 dark:text-white bg-white'>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>

      <ScrollMenu onWheel={onWheel}>
        <div className='container-wrapp bg-white flex-col items-center justify-center relative'>
          <div data-te-infinite-scroll-init
            data-te-infinite-direction="x"
            className="tree bg-white w-max items-center justify-center overflow-x-scroll"
          >
            <ul>
              <li>
                <div className='tree-child bg-white flex w-[30em] flex-col gap-4 border border-black'>
                  <div className='border border-black w-full'>
                    <div className='text-black font-medium text-medium'>TEMATIK KOTA</div> <button className='mt-4 w-full bg-black text-white flex gap-2 items-center justify-center rounded-md'>
                      <div><FaRegClone size={16} /></div>
                      <div>CLONE</div>
                    </button>
                  </div>
                  <table className='mt-6 w-full'>
                    <tbody className='text-title-ss text-black'>
                      <tr className='flex'>
                        <td className='w-[30%] border border-light-gray text-left px-4 py-2'>TEMATIK</td>
                        <td className='w-[70%] border border-light-gray text-left px-4 py-2'>{data.tematik}</td>
                      </tr>
                      {data.indikator?.map((item: any, i: number) => (
                        <>
                          <tr className='flex' key={i}>
                            <td className='w-[30%] border border-light-gray text-left px-4 py-2'>INDIKATOR</td>
                            <td className='w-[70%] border border-light-gray text-left px-4 py-2'>{item.indikator}</td>
                          </tr>
                          <tr className='flex' key={i}>
                            <td className='w-[30%] border border-light-gray text-left px-4 py-2'>TARGET/SATUAN</td>
                            <td className='w-[70%] border border-light-gray text-left px-4 py-2'>{item.target} {item.satuan}</td>
                          </tr>
                        </>
                      ))}
                      <tr className='flex'>
                        <td className='w-[30%] border border-light-gray text-left px-4 py-2'>KETERANGAN</td>
                        <td className='w-[70%] border border-light-gray text-left px-4 py-2'>{data.keterangan}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className='flex justify-between mt-2 gap-3'>
                    <button
                      className='px-4 py-1 rounded rounded-md border border-black text-black w-full hover:bg-xl-base hover:text-white duration-500'
                      onClick={() => setShowAll(!showAll)}
                    >
                      Show All
                    </button>
                    <button
                      className='px-4 py-1 rounded rounded-md bg-xl-base text-white w-full hover:shadow-lg duration-500 flex gap-2 items-center justify-center'
                      onClick={handleOpenAddForm}
                    >
                      <BiSolidAddToQueue size={18} />
                      Sub Tematik
                    </button>
                  </div>
                </div>
                <ul>
                  {/* {data.length != 0 && data?.sub_tematik?.
                    sort((a: any, b: any) => a.id - b.id)?.
                    map((el: any, index: number) => (
                      <SubTematikProps
                        subTematik={el}
                        key={index}
                        showAll={showAll}
                        trigger={handleGetTematik}
                      />
                    ))}
                  {openAddSubTematik && (
                    <li>
                      <div id={'addForm'} ref={ref}>
                        <AddPokinKotaForm
                          formType='Sub Tematik'
                          idParent={data.id}
                          setOpenForm={setOpenSubTematik}
                          trigger={handleGetTematik}
                        />
                      </div>
                    </li>
                  )} */}
                </ul>
              </li>
            </ul>
          </div>
        </div>

      </ScrollMenu>
    </div>
  )
}

export default DataPohonKinerjaKota