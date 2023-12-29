'use client';
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from '@/components/common/text-input/input';
import { Button } from '@/components/common/button/button';
import Swal from 'sweetalert2'
import Loading from "@/components/global/Loading/loading";
import { withFormik, FormikProps, FormikBag } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector } from "react-redux";
import { State } from "@/store/reducer";
import { fetchApi } from "@/pages/api/request";
import Select from 'react-select';
import { IoIosAddCircle } from "react-icons/io";
import XAddIndikator from "./x-modal/XAddIndikator";

interface FormValues {
  kodeOPD: any;
  bidangUrusan: any;
  tujuan: string;
  indikator: any;
}

interface OtherProps {
  title?: string;
  ref?: any;
  opd?: any;
  profile?: any;
}

interface MyFormProps extends OtherProps {
  handleSubmit: (
    values: FormValues,
    formikBag: FormikBag<object, FormValues>
  ) => void;
}

const FormField = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    ref
  } = props;
  const router = useRouter();
  const [dataTahun, setDataTahun] = useState<any>([]);
  const [dataOPD, setDataOPD] = useState<any>([]);
  const [dataBidangUrusan, setDataBidangUrusan] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openAddIndikator, setOpenAddIndikator] = useState<boolean>(false);

  const { profile, storeKodeOPD } = useSelector((state: State) => ({
    profile: state.profile.profile,
    storeKodeOPD: state.filter.storeKodeOPD
  }), shallowEqual);

  useEffect(() => {
    let hasAdminRole = profile.role.some((role: any) => role.nama_role === "Admin Kota");
    if (hasAdminRole) {
      getOPD();
    } else {
      getBidangUrusan(storeKodeOPD);
    }
  }, [storeKodeOPD]);

  const getOPD = async () => {
    setLoading(true);
    const response = await fetchApi({
      url: '/urusan/getAllUrusan',
      method: 'get',
      type: 'auth'
    })

    if (!response.success) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
    } else {
      const { data } = response.data;

      let temp: any = [];
      data.forEach((el: any) => {
        temp.push({
          label: el.nama_sub_unit,
          value: el.kode_sub_unit,
          urusan: el.Urusans
        })
      })
      setDataOPD(temp);
      setLoading(false);
    }
  }

  const getBidangUrusan = (opd: any) => {
    let temp: any = [];
    opd[0]?.urusan.forEach((urusan: any) => {
      urusan.Bidang_Urusans.map((el: any) => {
        temp.push({
          label: `(${el.kode_bidang_urusan})` + ' ' + el.nama_bidang_urusan,
          value: el.kode_bidang_urusan,
        })
      })
    })
    handleChange({
      target: { name: 'kodeOPD', value: opd[0]?.value }
    })
    setDataBidangUrusan(temp);
  }

  const handleGetBidangUrusan = (val: any) => {
    handleChange({
      target: { name: 'bidangUrusan', value: [] }
    })
    handleChange({
      target: { name: 'kodeOPD', value: val.value }
    })
    let temp: any = [];
    val.urusan.forEach((urusan: any) => {
      urusan.Bidang_Urusans.map((el: any) => {
        temp.push({
          label: `(${el.kode_bidang_urusan})` + ' ' + el.nama_bidang_urusan,
          value: el.kode_bidang_urusan,
        })
      })
    })
    setDataBidangUrusan(temp);
  }

  const handleAddIndikator = (e: any) => {
    e.preventDefault();
    setOpenAddIndikator(true);
  }

  const handleDeleteIndikator = (e: any, indikator: string) => {
    e.preventDefault();
    const newArray = values.indikator.filter(
      (item: any) => item.indikator !== indikator
    );
    handleChange({
      target: { name: "indikator", value: newArray },
    });
  }

  const handleBack = () => router.push('/rencana-opd/tujuan-opd');

  return (
    <div className="form-container relative bg-white">
      <div className="form-wrapper-general">
        <div className="px-8 flex flex-col gap-2 space-y-4 py-6">
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm2 w-[12%] lg:block hidden">OPD</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="dropdown"
                id="opd"
                name="opd"
                label="Nama OPD"
                placeholder="Ketik dan Pilih OPD"
                options={dataOPD}
                value={storeKodeOPD}
                handleBlur={handleBlur}
                setValueSelected={handleChange}
                change={(selectedOption: any) => handleGetBidangUrusan(selectedOption)}
              />
            </div>
          </div>
          <div className={`relative flex w-full items-center ${dataBidangUrusan.length != 0 ? 'block' : 'hidden'}`}>
            <div className="text-title-xsm2 w-[12%] lg:block hidden">Bidang Urusan</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <Select
                isMulti
                name="bidangUrusan"
                options={dataBidangUrusan}
                value={values.bidangUrusan}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOption: any) => {
                  handleChange({
                    target: { name: 'bidangUrusan', value: selectedOption }
                  })
                }}
              />
            </div>
          </div>
          {values.bidangUrusan.length != 0 && (
            <>
              <div className="relative flex w-full items-center">
                <div className="text-title-xsm2 w-[12%] lg:block hidden">Tujuan</div>
                <div className="w-[3%] lg:block hidden">:</div>
                <div className="lg:w-[85%] w-full">
                  <TextInput
                    type="text"
                    id="tujuan"
                    name="tujuan"
                    label="Tujuan"
                    touched={touched.tujuan}
                    change={handleChange}
                    value={values.tujuan}
                    errors={errors.tujuan}
                    handleBlur={handleBlur}
                  />
                </div>
              </div>
              <button
                className="flex gap-3 items-center justify-center"
                onClick={(e: any) => handleAddIndikator(e)}
              >
                <div><IoIosAddCircle size={24} /></div>
                <div className="text-title-xsm2">Tambah Indikator</div>
              </button>
            </>
          )}
        </div>
        <div className={`${dataBidangUrusan.length != 0 ? 'block' : 'hidden'} flex flex-col gap-2 border-t-6 border-light-gray`}>
          {values.indikator.length != 0 && values.indikator.map((el: any, i: number) => (
            <div key={i} className="shadow-xl py-6 border border-[#cbd5e1] w-full px-8 flex flex-col gap-4 mt-6">
              <div className="relative flex w-full items-center">
                <div className="text-title-xsm2 w-[12%] lg:block hidden">Indikator</div>
                <div className="w-[3%] lg:block hidden">:</div>
                <div className="flex flex-col gap-1 w-full lg:w-[85%]">
                  <TextInput
                    type="text"
                    id={`indikator-${i}`}
                    name={`indikator-${i}`}
                    label="Indikator"
                    change={(e: any) => {
                      const temp = [...values.indikator];
                      temp[i].indikator = e.target.value;
                      handleChange({
                        target: { name: 'indikator', value: temp }
                      })
                    }}
                    errors={el.indikator === ''}
                    value={el.indikator}
                    handleBlur={handleBlur}
                  />
                  {el.indikator === '' && <div className="text-danger text-title-ss">Indikator tidak boleh kosong !</div>}
                </div>
              </div>
              <div className="relative flex w-full items-center">
                <div className="text-title-xsm2 w-[12%] lg:block hidden">Rumus Perhitungan</div>
                <div className="w-[3%] lg:block hidden">:</div>
                <div className="lg:w-[85%] w-full flex flex-col gap-1">
                  <TextInput
                    type="text"
                    id={`rumus-${i}`}
                    name={`rumus-${i}`}
                    label="Rumus Perhitungan"
                    change={(e: any) => {
                      const temp = [...values.indikator];
                      temp[i].rumus_perhitungan = e.target.value;
                      handleChange({
                        target: { name: 'rumus_perhitungan', value: temp }
                      })
                    }}
                    errors={el.rumus_perhitungan === ''}
                    value={el.rumus_perhitungan}
                    handleBlur={handleBlur}
                  />
                  {el.rumus_perhitungan === '' && <div className="text-danger text-title-ss">Rumus tidak boleh kosong !</div>}
                </div>
              </div>
              <div className="relative flex w-full items-center">
                <div className="text-title-xsm2 w-[12%] lg:block hidden">Sumber Data</div>
                <div className="w-[3%] lg:block hidden">:</div>
                <div className="lg:w-[85%] w-full flex flex-col gap-1">
                  <TextInput
                    type="text"
                    id={`sumberData-${i}`}
                    name={`sumberData-${i}`}
                    label="Sumber Data"
                    change={(e: any) => {
                      const temp = [...values.indikator];
                      temp[i].sumber_data = e.target.value;
                      handleChange({
                        target: { name: 'sumber_data', value: temp }
                      })
                    }}
                    errors={el.sumber_data === ''}
                    value={el.sumber_data}
                    handleBlur={handleBlur}
                  />
                  {el.sumber_data === '' && <div className="text-danger text-title-ss">Sumber data tidak boleh kosong !</div>}
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-8 items-center justify-center w-full">
                {el.tahun?.map((item: any, i2: number) => (
                  <div key={i2} className="flex flex-col gap-4 items-center justify-center w-full">
                    <div className="relative flex w-full flex flex-col gap-1 items-center">
                      <div>
                        <TextInput
                          type="tel"
                          id="tahun"
                          name="tahun"
                          label="Tahun"
                          max={4}
                          change={(e: any) => {
                            const temp = [...values.indikator];
                            temp[i].tahun[i2].tahun = e.target.value;
                            handleChange({
                              target: { name: 'tahun', temp }
                            })
                          }}
                          errors={item.tahun === ''}
                          value={item.tahun}
                        />
                        {item.tahun === '' && <div className="text-danger text-title-ss">Tahun tidak boleh kosong !</div>}
                      </div>
                    </div>
                    <div className="relative flex w-full flex flex-col gap-1 items-center">
                      <div>
                        <TextInput
                          type="text"
                          id="target"
                          name="target"
                          label="Target"
                          change={(e: any) => {
                            const temp = [...values.indikator];
                            temp[i].tahun[i2].target = e.target.value;
                            handleChange({
                              target: { name: 'target', temp }
                            })
                          }}
                          errors={item.target === ''}
                          value={item.target}
                        />
                        {item.target === '' && <div className="text-danger text-title-ss">Target tidak boleh kosong !</div>}
                      </div>
                    </div>
                    <div className="relative flex w-full flex flex-col gap-1 items-center">
                      <div>
                        <TextInput
                          type="text"
                          id="satuan"
                          name="satuan"
                          label="Satuan"
                          change={(e: any) => {
                            const temp = [...values.indikator];
                            temp[i].tahun[i2].satuan = e.target.value;
                            handleChange({
                              target: { name: 'satuan', temp }
                            })
                          }}
                          errors={item.satuan === ''}
                          value={item.satuan}
                        />
                        {item.satuan === '' && <div className="text-danger text-title-ss">Satuan tidak boleh kosong !</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 text-white text-title-xsm2 text-center text-medium font-medium bg-danger py-1"
                onClick={(e) => handleDeleteIndikator(e, el.indikator)}
              >HAPUS
              </button>
            </div>
          ))}
        </div>
        <div className={`flex w-full justify-between mt-6 px-6 pb-8 ${values.bidangUrusan.length != 0 ? 'block' : 'hidden'}`}>
          <div>
            <Button
              type="secondary"
              variant="xl"
              className="button-container px-10"
              rounded
              onClick={handleBack}
            >
              <div className="flex justify-center items-center text-xl-base font-Nunito">
                <span className="button-text">Batal</span>
              </div>
            </Button>
          </div>
          <div>
            <Button
              type="button"
              variant="xl"
              className="button-container px-10"
              rounded
              disabled={values.indikator.length == 0 ? true : false}
              onClick={handleSubmit}
            >
              <div className="flex justify-center items-center text-white font-Nunito">
                <span className="button-text">Tambah</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <XAddIndikator
        openAddIndikator={openAddIndikator}
        setOpenAddIndikator={setOpenAddIndikator}
        handleChange={handleChange}
        values={values}
      />
    </div>
  )
}

function CreateForm({ handleSubmit }: MyFormProps) {
  const FormWithFormik = withFormik({
    mapPropsToValues: () => ({
      kodeOPD: '',
      bidangUrusan: [],
      tujuan: "",
      indikator: []
    }),
    validationSchema: Yup.object().shape({
      bidangUrusan: Yup.array().of(
        Yup.object().shape({
          label: Yup.string().required('Label is required'),
          value: Yup.string().required('Value is required'),
        }).nullable(),
      ),
      tujuan: Yup.string()
        .required("Field tidak boleh kosong !"),
      indikator: Yup.array().of(
        Yup.object().shape({
          indikator: Yup.string().required('Indikator is required'),
          rumus_perhitungan: Yup.string().required('Rumus perhitungan is required'),
          sumber_data: Yup.string().required('Sumber data is required'),
          tahun: Yup.array().of(
            Yup.object().shape({
              tahun: Yup.number(),
              target: Yup.string().required('Target is required'),
              satuan: Yup.string().required('Satuan is required'),
            })
          ),
        })
      )
    }),
    handleSubmit
  })(FormField)

  return <FormWithFormik />
}

const AddTujuanOPDForm: any = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    let temp: any = [];
    values.bidangUrusan.forEach((el: any) => {
      temp.push({ kode_bidang_urusan: el.value })
    })

    const payload = {
      tujuan: values.tujuan,
      kode_sub_unit: values.kodeOPD,
      indikator: values.indikator,
      kode_bidang_urusan: temp
    }

    const response = await fetchApi({
      url: '/tujuan_opd/addTujuanOPD',
      method: 'post',
      type: 'auth',
      body: payload
    });

    if (!response.success) {
      if (response.data.code == 400) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Periksa kembali data Tujuan!",
        });
      } else if (response.data.code == 500) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Koneksi bermasalah!",
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil menambahkan Tujuan OPD",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/rencana-opd/tujuan-opd/");
    }
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading loading={Loading} setLoading={setLoading} />
      ) : (
        <CreateForm handleSubmit={handleSubmit} />
      )}
    </React.Fragment>
  )
}

export default AddTujuanOPDForm;