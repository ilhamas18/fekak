'use client';
import React from "react";
import { useState } from "react";
import { CommonModal } from "@/components/common/common-modal/modal";
import TextInput from "@/components/common/text-input/input";
import { GrClose } from "react-icons/gr";

interface PropTypes {
  openAddIndikator: boolean;
  setOpenAddIndikator: any;
  handleChange: any;
  values: any;
}

const XAddIndikator = ({
  openAddIndikator,
  setOpenAddIndikator,
  handleChange,
  values
}: PropTypes) => {

  const [indikator, setIndikator] = useState<string>('');
  const [rumus, setRumus] = useState<string>('');
  const [sumberData, setSumberData] = useState<string>('');
  const [tempTahun, setTempTahun] = useState<any>([
    {
      tahun: '2020',
      target: '',
      satuan: ''
    },
    {
      tahun: '2021',
      target: '',
      satuan: ''
    },
    {
      tahun: '2022',
      target: '',
      satuan: ''
    },
    {
      tahun: '2023',
      target: '',
      satuan: ''
    },
    {
      tahun: '2024',
      target: '',
      satuan: ''
    }
  ]);

  const handleChangeTahun = (type: string, value: string, index: number) => {
    const temp = [...tempTahun];

    switch (type) {
      case 'tahun':
        temp[index].tahun = value;
        break;
      case 'target':
        temp[index].target = value;
        break;
      case 'satuan':
        temp[index].satuan = value;
        break;
      default:
        break;
    }
    setTempTahun(temp);
  }

  const handleSaveData = () => {
    let temp: any = values.indikator;
    temp.push({
      indikator: indikator,
      rumus_perhitungan: rumus,
      sumber_data: sumberData,
      tahun: tempTahun
    })
    handleChange({
      target: { name: 'indikator', value: temp }
    });
    setIndikator('');
    setRumus('');
    setSumberData('');
    setOpenAddIndikator(false);
    setTempTahun([
      {
        tahun: '2020',
        target: '',
        satuan: ''
      },
      {
        tahun: '2021',
        target: '',
        satuan: ''
      },
      {
        tahun: '2022',
        target: '',
        satuan: ''
      },
      {
        tahun: '2023',
        target: '',
        satuan: ''
      },
      {
        tahun: '2024',
        target: '',
        satuan: ''
      }
    ])
  }

  const onClose = () => setOpenAddIndikator(false);

  return (
    <CommonModal isOpen={openAddIndikator} onClose={setOpenAddIndikator}>
      <div className="container">
        <div className="relative items-center pt-2">
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
                  id="rumus"
                  name="rumus"
                  label="Rumus / Definisi Operasional"
                  change={(e: any) => setRumus(e.target.value)}
                  value={rumus}
                />
              </div>
            </div>
            <div className="relative flex w-full items-center">
              <div className="w-full">
                <TextInput
                  type="text"
                  id="sumberData"
                  name="sumberData"
                  label="Sumber Data"
                  change={(e: any) => setSumberData(e.target.value)}
                  value={sumberData}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 mt-8 items-center justify-center w-full">
            {tempTahun.map((el: any, i: number) => (
              <div key={i} className="flex flex-col gap-2 items-center justify-center">
                <div className="relative flex w-full items-center">
                  <div>
                    <TextInput
                      type="tel"
                      id="tahun"
                      name="tahun"
                      label="Tahun"
                      max={4}
                      disabled
                      change={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTahun('tahun', e.target.value, i)}
                      value={tempTahun[i].tahun}
                    />
                  </div>
                </div>
                <div className="relative flex w-full items-center">
                  <div>
                    <TextInput
                      type="text"
                      id="target"
                      name="target"
                      label="Target"
                      change={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTahun('target', e.target.value, i)}
                      value={tempTahun[i].target}
                    />
                  </div>
                </div>
                <div className="relative flex w-full items-center">
                  <div>
                    <TextInput
                      type="text"
                      id="satuan"
                      name="satuan"
                      label="Satuan"
                      change={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeTahun('satuan', e.target.value, i)}
                      value={tempTahun[i].satuan}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              className="w-full bg-xl-base rounded-lg text-center text-title-ss text-white py-2 hover:bg-[#1d4ed8]"
              onClick={handleSaveData}
              disabled={
                indikator === '' ||
                rumus === '' ||
                sumberData === '' ||
                tempTahun.length == 0
              }
            >
              SIMPAN
            </button>
            <div className="w-full border border-danger bg-white text-danger rounded-lg text-center text-title-ss py-2">
              BATAL
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}

export default XAddIndikator;