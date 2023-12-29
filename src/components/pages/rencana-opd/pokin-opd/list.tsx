import * as React from 'react';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaRegClone } from 'react-icons/fa';
import StrategicProps from './children/strategic';
import usePreventBodyScroll from '@/components/hooks/usePreventBodyScroll';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { BiSolidAddToQueue } from 'react-icons/bi';
import AddPohonForm from './add';
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
  tahun: string;
  getPokinOPD: any;
}

const DataPokinOPD = ({
  data,
  tahun,
  getPokinOPD,
}: PropTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [openAddStrategic, setOpenAddStrategic] = React.useState(false);

  const handleOpenAddForm = () => {
    setOpenAddStrategic(true);
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
                    <div className='text-black font-medium text-medium'>POHON KINERJA OPD</div> <button className='mt-4 w-full bg-black text-white flex gap-2 items-center justify-center rounded-md'>
                      <div><FaRegClone size={16} /></div>
                      <div>CLONE</div>
                    </button>
                  </div>
                  <table className='mt-6 w-full'>
                    <tbody className='text-title-ss text-black'>
                      <tr className='flex'>
                        <td className='w-[30%] border border-light-gray py-2'>NAMA OPD</td>
                        <td className='w-[70%] border border-light-gray py-2'>{data.nama_sub_unit}</td>
                      </tr>
                      {data.tujuan?.map((item: any, i: number) => (
                        <>
                          <tr className='flex' key={i}>
                            <td className='w-[30%] border border-light-gray py-2'>TUJUAN</td>
                            <td className='w-[70%] border border-light-gray py-2'>{item.tujuan}</td>
                          </tr>
                          {item.indikator_tujuan?.map((el: any, i2: number) => (
                            <tr className='flex' key={i2}>
                              <td className='w-[30%] border border-light-gray py-2'>INDIKATOR</td>
                              <td className='w-[70%] border border-light-gray py-2'>{el.indikator}</td>
                            </tr>
                          ))}
                        </>
                      ))}
                      <tr className='flex'>
                        <td className='w-[30%] border border-light-gray py-2'>TAHUN</td>
                        <td className='w-[70%] border border-light-gray py-2'>{tahun}</td>
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
                      Strategi
                    </button>
                  </div>
                </div>
                <ul>
                  {data.length != 0 && data?.tujuan[0]?.strategic?.
                    sort((a: any, b: any) => a.id - b.id)?.
                    map((el: any, index: number) => (
                      <StrategicProps
                        data={data}
                        strategic={el}
                        key={index}
                        showAll={showAll}
                        getPokinOPD={getPokinOPD}
                      />
                    ))}
                  {openAddStrategic && (
                    <li>
                      <div id={'addForm'} ref={ref}>
                        <AddPohonForm
                          formType='Strategic'
                          idTujuanOPD={data.tujuan[0]?.id}
                          setOpenAddStrategic={setOpenAddStrategic}
                          getPokinOPD={getPokinOPD}
                        />
                      </div>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>

      </ScrollMenu>
    </div>
  )
}

export default DataPokinOPD;