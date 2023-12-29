'use client';
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from '@/components/common/text-input/input';
import { Button } from '@/components/common/button/button';
import Swal from 'sweetalert2'
import { withFormik, FormikProps, FormikBag } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from "@/pages/api/request";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { State } from "@/store/reducer";
import { AiFillDelete } from 'react-icons/ai';
import { BiSolidBookAdd } from 'react-icons/bi';

interface FormValues {
  pohon: string;
  indikator: any;
  keterangan: string;
}

interface OtherProps {
  title?: string;
  ref?: any;
  handleClose?: any;
  formType?: any;
  loading?: boolean;
}

interface MyFormProps extends OtherProps {
  handleSubmit: (
    values: FormValues,
    formikBag: FormikBag<object, FormValues>
  ) => void;
  handleClose: () => void;
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
    ref,
    handleClose,
    formType,
    loading
  } = props;
  const [indikator, setIndikator] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [satuan, setSatuan] = useState<string>('');
  const [openAddIndikator, setOpenAddIndikator] = useState<boolean>(false);

  const { profile, storeKodeOPD, storeYear } = useSelector((state: State) => ({
    profile: state.profile.profile,
    storeKodeOPD: state.filter.storeKodeOPD,
    storeYear: state.filter.storeYear
  }), shallowEqual);

  const handleOpenAddIndikator = () => {
    if (values.indikator.length == 0) {
      const temp: any = [...values.indikator]
      temp.push({ indikator: indikator, target: target, satuan: satuan });
      handleChange({
        target: { name: "indikator", value: temp },
      });
    }
    setOpenAddIndikator(true);
    setIndikator('');
    setTarget('');
    setSatuan('');
  }

  const handleAddIndikator = () => {
    const temp: any = [...values.indikator]
    temp.push({ indikator: indikator, target: target, satuan: satuan });
    handleChange({
      target: { name: "indikator", value: temp },
    });
    setOpenAddIndikator(false);
    setIndikator('');
    setTarget('');
    setSatuan('');
  }

  const onSubmitHandler = () => {
    if (values.indikator.length == 0) {
      const temp: any = [...values.indikator]
      temp.push({ indikator: indikator, target: target, satuan: satuan });
      handleChange({
        target: { name: "indikator", value: temp },
      });
    }
    handleSubmit();
  }

  return (
    <div>
      <li>
        <div id={'addForm'} className='tree-child bg-[#94a3b8] w-[30em] flex flex-col gap-4 border border-white'>
          <div className='text-black bg-white w-full font-medium text-medium uppercase pt-2'> Form Tambah {formType}</div>
          <div className="bg-white mt-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="w-full flex items-center justify-center">
                <TextInput
                  type="text"
                  id="text"
                  name="pohon"
                  label={formType}
                  touched={touched.pohon}
                  errors={errors.pohon}
                  value={values.pohon}
                  change={handleChange}
                />
              </div>
              <div className="w-full">
                <TextInput
                  type="text"
                  id='tahun'
                  name='tahun'
                  label="Tahun"
                  value={storeYear.value}
                  disabled
                />
              </div>
              {values.indikator.length == 0 ? (
                <>
                  <div className="w-full">
                    <TextInput
                      type="text"
                      id="text"
                      name="indikator"
                      label="Indikator"
                      errors={errors.indikator}
                      value={indikator}
                      change={(e: any) => setIndikator(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      type="text"
                      id="text"
                      name="target"
                      label="Target"
                      errors={errors.indikator}
                      value={target}
                      change={(e: any) => setTarget(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      type="text"
                      id="text"
                      name="satuan"
                      label="Satuan"
                      errors={errors.indikator}
                      value={satuan}
                      change={(e: any) => setSatuan(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                values.indikator.map((el: any, i: number) => (
                  <>
                    <div className="w-full">
                      <TextInput
                        type="text"
                        id="text"
                        name="indikator"
                        label="Indikator"
                        value={el.indikator}
                        change={(e: any) => {
                          const temp = [...values.indikator];
                          temp[i].indikator = e.target.value;
                          handleChange({
                            target: { name: 'indikator', value: temp }
                          })
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <TextInput
                        type="text"
                        id="text"
                        name="target"
                        label="Target"
                        value={el.target}
                        change={(e: any) => {
                          const temp = [...values.indikator];
                          temp[i].target = e.target.value;
                          handleChange({
                            target: { name: 'indikator', value: temp }
                          })
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <TextInput
                        type="text"
                        id="text"
                        name="satuan"
                        label="Satuan"
                        value={el.satuan}
                        change={(e: any) => {
                          const temp = [...values.indikator];
                          temp[i].satuan = e.target.value;
                          handleChange({
                            target: { name: 'indikator', value: temp }
                          })
                        }}
                      />
                    </div>
                    <div className={`${values.indikator.length != 0 ? 'block' : 'hidden'}`}>
                      <button className='px-2 py-1 rounded rounded-md border border-[#dc2626] text-[#dc2626] duration-500 flex items-center justify-center hover:shadow-2xl gap-2'>
                        <AiFillDelete size={16} />
                        <span>Hapus Indikator</span>
                      </button>
                    </div>
                  </>
                ))
              )}
              <div>
                <button
                  className={`${openAddIndikator ? 'hidden' : 'block'} px-2 py-1 rounded rounded-md bg-xl-base text-white duration-500 flex items-center justify-center hover:shadow-2xl gap-2`}
                  onClick={handleOpenAddIndikator}
                >
                  <BiSolidBookAdd size={16} />
                  <span>Tambah Indikator</span>
                </button>
              </div>
              {openAddIndikator && (
                <>
                  <div className="w-full">
                    <TextInput
                      type="text"
                      id="text"
                      name="indikator"
                      label="Indikator"
                      value={indikator}
                      change={(e: any) => setIndikator(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      type="text"
                      id="target"
                      name="target"
                      label="Target"
                      value={target}
                      change={(e: any) => setTarget(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      type="text"
                      id="satuan"
                      name="satuan"
                      label="Satuan"
                      value={satuan}
                      change={(e: any) => setSatuan(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <button
                        className={`${openAddIndikator ? 'block' : 'hidden'} px-2 py-1 rounded rounded-md text-[#dc2626] font-medium duration-500 flex items-center justify-center hover:shadow-2xl gap-2`}
                        onClick={() => setOpenAddIndikator(false)}
                      >
                        <span>Tutup</span>
                      </button>
                    </div>
                    <div>
                      <button
                        className={`${openAddIndikator ? 'block' : 'hidden'} px-2 py-1 rounded rounded-md text-xl-base font-medium duration-500 flex items-center justify-center hover:shadow-2xl gap-2`}
                        onClick={handleAddIndikator}
                      >
                        <span>Tambah</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="w-full">
                <TextInput
                  type="text"
                  id="keterangan"
                  name="keterangan"
                  label="Keterangan"
                  errors={errors.keterangan}
                  touched={touched.keterangan}
                  value={values.keterangan}
                  change={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 w-full flex items-center justify-center gap-2">
            <Button
              type="secondary"
              variant="error"
              className="button-container w-full"
              rounded
              onClick={(e: any) => handleClose(e)}
            >
              <div className="flex justify-center items-center text-white font-Nunito">
                <span className="button-text">Batal</span>
              </div>
            </Button>
            <Button
              type="button"
              variant="xl"
              className="button-container w-full"
              rounded
              loading={loading}
              onClick={onSubmitHandler}
            >
              <div className="flex justify-center items-center text-white font-Nunito">
                <span className="button-text">Simpan</span>
              </div>
            </Button>
          </div>
        </div>
      </li>
    </div>
  )
}

function CreateForm({ handleSubmit, ...otherProps }: MyFormProps) {
  const FormWithFormik = withFormik({
    mapPropsToValues: () => ({
      pohon: "",
      indikator: [],
      keterangan: "",
    }),
    validationSchema: Yup.object().shape({
      pohon: Yup.string().required('Field tidak boleh kosong!'),
      indikator: Yup.array().of(
        Yup.object().shape({
          indikator: Yup.string().required('Indikator is required'),
          target: Yup.string().required('Target is required'),
          satuan: Yup.string().required('Satuan is required'),
        })
      ),
      keterangan: Yup.string().required('Field tidak boleh kosong!')
    }),
    handleSubmit
  })(FormField)

  return <FormWithFormik {...otherProps} />
}

interface PropTypes {
  formType: string;
  idTujuanOPD?: number;
  idStrategic?: number;
  idTactical?: number;
  idOperational?: number;
  setOpenAddStrategic?: any;
  setOpenAddTactical?: any;
  setOpenAddOperational?: any;
  setOperational?: any;
  setOpenAddStaff?: any;
  getPokinOPD: any;
}

const AddPohonForm: React.FC<PropTypes> = ({
  formType,
  idTujuanOPD,
  idStrategic,
  idTactical,
  idOperational,
  setOpenAddStrategic,
  setOpenAddTactical,
  setOpenAddOperational,
  setOpenAddStaff,
  getPokinOPD
}: PropTypes) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    if (formType === "Strategic") {
      const payload = {
        strategi: values.pohon,
        indikator: values.indikator,
        keterangan: values.keterangan,
        id_tujuan_opd: idTujuanOPD
      }
      const response = await fetchApi({
        url: '/pokin/addStrategic',
        method: 'post',
        type: 'auth',
        body: payload
      })

      if (!response.success) {
        if (response.code == 400) {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tujuan OPD belum diisi!",
          });
        } else {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Koneksi bermasalah!",
          });
        }
      } else {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil menambahkan strategi",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenAddStrategic(false);
        getPokinOPD();
      }
    } else if (formType === "Tactical") {
      const payload = {
        tactical: values.pohon,
        indikator: values.indikator,
        keterangan: values.keterangan,
        id_strategic: idStrategic
      }
      const response = await fetchApi({
        url: '/pokin/addTactical',
        method: 'post',
        type: 'auth',
        body: payload
      })

      if (!response.success) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Koneksi bermasalah!",
        });
      } else {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil menambahkan tactical",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenAddTactical(false);
        getPokinOPD();
      }
    } else if (formType === "Operational") {
      const payload = {
        operational: values.pohon,
        indikator: values.indikator,
        keterangan: values.keterangan,
        id_tactical: idTactical
      }
      const response = await fetchApi({
        url: '/pokin/addOperational',
        method: 'post',
        type: 'auth',
        body: payload
      })

      if (!response.success) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Koneksi bermasalah!",
        });
      } else {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil menambahkan operational",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenAddOperational(false);
        getPokinOPD();
      }
    } else if (formType === "Operational 2") {
      const payload = {
        staff: values.pohon,
        indikator: values.indikator,
        keterangan: values.keterangan,
        id_operational: idOperational
      }
      const response = await fetchApi({
        url: '/pokin/addStaff',
        method: 'post',
        type: 'auth',
        body: payload
      })

      if (!response.success) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Koneksi bermasalah!",
        });
      } else {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil menambahkan operational 2",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenAddStaff(false);
        getPokinOPD();
      }
    }
  }

  const handleClose = (e?: any) => {
    e.preventDefault();
    switch (formType) {
      case "Strategic":
        setOpenAddStrategic(false);
        break;
      case "Tactical":
        setOpenAddTactical(false);
        break;
      case "Operational":
        setOpenAddOperational(false);
        break;
      case "Operational 2":
        setOpenAddStaff(false);
        break;
      default:
        break;
    }
  }

  return (
    <CreateForm
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      formType={formType}
      loading={loading}
    />
  )
}

export default AddPohonForm;


// interface PropTypes {
//   type: string;
//   setOpenAdd: any;
// }

// const AddPohonForm = ({ type, setOpenAdd }: PropTypes) => {
//   const router = useRouter();
//   const [indikatorArr, setIndikatorArr] = useState<any>([]);
//   const [indikator, setIndikator] = useState<string>('');
//   const [openAddIndikator, setOpenAddIndikator] = useState<boolean>(false);

//   const { storeYear } = useSelector((state: State) => ({
//     storeYear: state.filter.storeYear
//   }), shallowEqual)

//   useEffect(() => {
//     // setIndikatorArr(data.indikators);
//   }, [])

//   const handleInputChange = (index: any, newValue: any, type: string) => {
//     const updatedIndicators = [...indikatorArr];

//     if (type === 'indikator') {
//       updatedIndicators[index].indikator = {
//         ...updatedIndicators[index].indikator,
//         indikator: newValue,
//       };
//       setIndikatorArr(updatedIndicators);
//     } else if (type === 'target') {
//       updatedIndicators[index].indikator = {
//         ...updatedIndicators[index].indikator,
//         indikator: newValue,
//       };
//     }

//   };

//   const handleClose = () => {
//     // setIndikatorArr(data.indikators);
//     setOpenAdd(false);
//   }

//   return (
//     // <li>
//     <div id={'addForm'} className='tree-child bg-[#94a3b8] w-[30em] flex flex-col gap-4 border border-white'>
//       <div className='text-black bg-white w-full font-medium text-medium uppercase pt-2'> Form Tambah {type}</div>
//       <div className="bg-white mt-4">
//         <div className="flex flex-col gap-2 items-center justify-center">
//           <div className="w-full">
//             <TextInput
//               type="text"
//               id={type}
//               name={type}
//               label={type}
//               max={18}
//             // value={data.strategi}
//             />
//           </div>
//           <div className="w-full">
//             <TextInput
//               type="text"
//               id='tahun'
//               name='tahun'
//               label="Tahun"
//               max={18}
//               value={storeYear.value}
//               disabled
//             />
//           </div>
//           {/* {indikatorArr.length != 0 && data.indikators.map((el: any, i: number) => (
//             <> */}
//           <div className="w-full">
//             <TextInput
//               type="text"
//               id="indikator"
//               name="indikator"
//               label="Indikator"
//             // touched={el.indikator.indikator}
//             // errors={errors.indikator}
//             // value={indikatorArr[i].indikator.indikator}
//             // change={(e: any) => handleInputChange(i, e.target.value, 'indikator')}
//             />
//           </div>
//           <div className="w-full">
//             <TextInput
//               type="text"
//               id='target'
//               name='target'
//               label="Target"
//             // value={indikatorArr[i].target}
//             // change={(e: any) => handleInputChange(i, e.target.value, 'target')}
//             />
//           </div>
//           <div className="w-full">
//             <TextInput
//               type="text"
//               id="satuan"
//               name="satuan"
//               label="Satuan"
//               max={18}
//             // value={el.indikator.satuan}
//             />
//           </div>
//           <div>
//             <button className='px-2 py-1 rounded rounded-md border border-[#dc2626] text-[#dc2626] duration-500 flex items-center justify-center hover:shadow-2xl gap-2'>
//               <AiFillDelete size={16} />
//               <span>Hapus Indikator</span>
//             </button>
//           </div>
//           {/* </>
//           ))} */}
//           <div>
//             <button
//               className={`${openAddIndikator ? 'hidden' : 'block'} px-2 py-1 rounded rounded-md bg-xl-base text-white duration-500 flex items-center justify-center hover:shadow-2xl gap-2`}
//               onClick={() => setOpenAddIndikator(true)}
//             >
//               <BiSolidBookAdd size={16} />
//               <span>Tambah Indikator</span>
//             </button>
//           </div>
//           {openAddIndikator && (
//             <>
//               <div className="w-full">
//                 <TextInput
//                   type="text"
//                   id="indikator"
//                   name="indikator"
//                   label="Indikator"
//                 // value={el.indikator.satuan}
//                 />
//               </div>
//               <div className="w-full">
//                 <TextInput
//                   type="text"
//                   id="target"
//                   name="target"
//                   label="Target"
//                 // value={el.indikator.satuan}
//                 />
//               </div>
//               <div className="w-full">
//                 <TextInput
//                   type="text"
//                   id="satuan"
//                   name="satuan"
//                   label="Satuan"
//                 // value={el.indikator.satuan}
//                 />
//               </div>
//               <div>
//                 <button
//                   className={`${openAddIndikator ? 'block' : 'hidden'} px-2 py-1 rounded rounded-md text-[#dc2626] font-medium duration-500 flex items-center justify-center hover:shadow-2xl gap-2`}
//                   onClick={() => setOpenAddIndikator(false)}
//                 >
//                   <span>Tutup</span>
//                 </button>
//               </div>
//             </>
//           )}
//           <div className="w-full">
//             <TextInput
//               type="text"
//               id="keterangan"
//               name="keterangan"
//               label="Keterangan"
//             // value={el.indikator.satuan}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="mt-3 w-full flex items-center justify-center gap-2">
//         <Button
//           type="secondary"
//           variant="error"
//           className="button-container w-full"
//           // loading={loading}
//           rounded
//           onClick={handleClose}
//         >
//           <div className="flex justify-center items-center text-white font-Nunito">
//             <span className="button-text">Batal</span>
//           </div>
//         </Button>
//         <Button
//           type="button"
//           variant="xl"
//           className="button-container w-full"
//           rounded
//         >
//           <div className="flex justify-center items-center text-white font-Nunito">
//             <span className="button-text">Simpan</span>
//           </div>
//         </Button>
//       </div>
//     </div>
//     // </li>
//   )
// }

// export default AddPohonForm;