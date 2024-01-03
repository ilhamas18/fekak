'use client';
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from '@/components/common/text-input/input';
import { Button } from '@/components/common/button/button';
import Swal from 'sweetalert2'
import { withFormik, FormikProps, FormikBag } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from "@/pages/api/request";
import { IoIosAddCircle } from "react-icons/io";
import { shallowEqual, useSelector } from "react-redux";
import { State } from "@/store/reducer";
import axios from "axios";

interface FormValues {
  instansi: string;
  kodeOPD: string;
  nip: string;
  email: string;
  password: string;
  role: string;
}

interface OtherProps {
  title?: string;
  ref?: any;
  listOpd?: any;
  loading?: boolean;
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
    ref,
    listOpd,
    loading
  } = props;
  const router = useRouter();

  return (
    <div className="form-container relative bg-white">
      <div className="form-wrapper-general">
        <div className="px-8 flex flex-col gap-2 space-y-4 pt-6 pb-2">
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm2 w-[12%] lg:block hidden">OPD</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="dropdown"
                id="opd"
                name="opd"
                label="Perangkat Daerah"
                value={values.kodeOPD}
                placeholder="Perangkat Daerah"
                options={listOpd}
                change={(selectedOption: any) => {
                  handleChange({
                    target: { name: 'kodeOPD', value: selectedOption.value }
                  })
                }}
              />
            </div>
          </div>
        </div>
        <div className="px-8 flex flex-col gap-2 space-y-4 pt-6 pb-2">
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm2 w-[12%] lg:block hidden">NIP</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="tel"
                id="nip"
                name="nip"
                label="NIP"
                max={18}
                touched={touched.nip}
                change={handleChange}
                value={values.nip}
                errors={errors.nip}
                handleBlur={handleBlur}
              />
            </div>
          </div>
        </div>
        <div className="px-8 flex flex-col gap-2 space-y-4 pt-6 pb-2">
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm2 w-[12%] lg:block hidden">Email</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="text"
                id="email"
                name="email"
                label="Email"
                touched={touched.email}
                change={handleChange}
                value={values.email}
                errors={errors.email}
                handleBlur={handleBlur}
              />
            </div>
          </div>
        </div>
        <div className="px-8 flex flex-col gap-2 space-y-4 pt-6 pb-2">
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm2 w-[12%] lg:block hidden">Password</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="password"
                id="password"
                name="password"
                label="Password"
                touched={touched.password}
                change={handleChange}
                value={values.password}
                errors={errors.password}
                handleBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between mt-10 mb-4 pb-4 px-8">
        <div>
          <Button
            type="secondary"
            variant="xl"
            className="button-container px-10"
            rounded
          // onClick={handleBack}
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
            loading={loading}
            onClick={handleSubmit}
          >
            <div className="flex justify-center items-center text-white font-Nunito">
              <span className="button-text">Tambah</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

function CreateForm({ handleSubmit, ...otherProps }: MyFormProps) {
  const FormWithFormik = withFormik({
    mapPropsToValues: () => ({
      instansi: "",
      kodeOPD: "",
      nip: "",
      email: "",
      password: "",
      role: ""
    }),
    validationSchema: Yup.object().shape({
      nip: Yup.string()
        .required('Bagian dibutuhkan')
        .min(18, 'NIP harus 18 angka')
        .max(18, 'NIP harus 18 angka'),
      email: Yup.string()
        .email('Format email salah')
        .required('Bagian dibutuhkan'),
      password: Yup.string()
        .required("Bagian dibutuhkan")
        .min(8, "Kata sandi terlalu pendek - minimal harus 8 karakter")
    }),
    handleSubmit
  })(FormField)

  return <FormWithFormik {...otherProps} />
}

interface PropTypes {
  listOpd: any
}

const AddPegawaiForm = ({ listOpd }: PropTypes) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    const payload = {
      user: {
        nip: values.nip,
        email: values.email,
        password: values.password
      }
    }

    const response = await fetchApi({
      url: '/users',
      method: 'post',
      type: 'auth',
      body: payload
    })

    if (response.status == 201) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil menambahkan User",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push('/');
    } else if (response.status == 422) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "NIP / Email telah terdaftar",
      });
      setLoading(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Koneksi bermasalah!",
      });
      setLoading(false);
    }
  }

  return (
    <CreateForm handleSubmit={handleSubmit} listOpd={listOpd} loading={loading} />
  )
}

export default AddPegawaiForm;


// NOTE :
// nama, nip, nama opd, kode opd, role