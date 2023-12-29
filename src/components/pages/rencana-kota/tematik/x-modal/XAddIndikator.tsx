'use client';
import React from "react";
import { useState } from "react";
import { CommonModal } from "@/components/common/common-modal/modal";
import TextInput from "@/components/common/text-input/input";
import { GrClose } from "react-icons/gr";
import years from "@/components/helpers/year";

interface PropTypes {
  openAddIndikator: boolean;
  setOpenAddIndikator: any;
  handleChange: any;
  values: any;
}

const XAddIndikatorTematik = ({
  openAddIndikator,
  setOpenAddIndikator,
  handleChange,
  values
}: PropTypes) => {

  const [tahun, setTahun] = useState<string>('');
  const [indikator, setIndikator] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [satuan, setSatuan] = useState<string>('');

  const handleSaveData = () => {
    const temp: any = values.indikator;
    temp.push({
      indikator: indikator,
      target: target,
      satuan: satuan,
      tahun: tahun
    })
    handleChange({
      target: { name: 'indikator', value: temp }
    });
    setIndikator('');
    setTarget('');
    setSatuan('');
    setTahun('');
    onClose();
  }

  const onClose = () => setOpenAddIndikator(false);

  return (
    <CommonModal isOpen={openAddIndikator} onClose={setOpenAddIndikator}>
      <div className="container">
        <div className="relative items-center pt-2">
          <div className="flex flex-col justify-between">
            <div className='w-[100%] flex flex-col justify-between space-y-2 gap-2'>
              <div className='flex items-center justify-between bg-meta-6 mb-6'>
                <div></div>
                <div className='text-center font-medium md:text-xsm text-xsm2 py-2'>Form Tambah Indikator</div>
                <div className='mr-2 p-1 bg-white' onClick={onClose}>
                  <GrClose size={17} />
                </div>
              </div>
              <div className="relative flex w-full items-center">
                <div className="w-full">
                  <TextInput
                    type="dropdown"
                    id="tahun"
                    name="tahun"
                    label="Tahun"
                    placeholder="Pilih Tahun"
                    options={years}
                    change={(e: any) => setTahun(e.value)}
                  />
                </div>
              </div>
              <div className="relative flex w-full items-center">
                <div className="w-full">
                  <TextInput
                    type="text"
                    id="indikator"
                    name="indikator"
                    label="Indikator"
                    change={(e: any) => setIndikator(e.target.value)}
                    value={indikator}
                  />
                </div>
              </div>
              <div className="relative flex w-full items-center">
                <div className="w-full">
                  <TextInput
                    type="text"
                    id="target"
                    name="target"
                    label="Target"
                    change={(e: any) => setTarget(e.target.value)}
                    value={target}
                  />
                </div>
              </div>
              <div className="relative flex w-full items-center">
                <div className="w-full">
                  <TextInput
                    type="text"
                    id="satuan"
                    name="satuan"
                    label="Satuan"
                    change={(e: any) => setSatuan(e.target.value)}
                    value={satuan}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-14">
              <button
                className="w-full bg-xl-base rounded-lg text-center text-title-ss text-white py-2 hover:bg-[#1d4ed8] hover:cursor-pointer"
                onClick={handleSaveData}
                disabled={
                  indikator === '' ||
                  target === '' ||
                  satuan === '' ||
                  tahun == ''
                }
              >
                SIMPAN
              </button>
              <button
                className="w-full border border-danger bg-white text-danger rounded-lg text-center text-title-ss py-2 hover:shadow-md"
                onClick={onClose}
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}

export default XAddIndikatorTematik;