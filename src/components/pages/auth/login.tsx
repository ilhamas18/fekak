'use client';
import React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import TextInput from '@/components/common/text-input/input';
import { Button } from '@/components/common/button/button';
import Swal from 'sweetalert2'
import Image from "next/image";
import { useAuth } from "@/components/providers/Auth";
import Loading from "@/components/global/Loading/loading";
import { withFormik, FormikProps, FormikBag } from 'formik';
import * as Yup from 'yup';
import { setCookie, getCookie, getCookies } from "cookies-next";
import { fetchApi } from "@/pages/api/request";
import { useDispatch } from "react-redux";
import { setProfile } from "@/store/profile/action";
import { deleteCookie } from "cookies-next";

interface FormValues {
  nip: string,
  password: string,
}

interface OtherProps {
  title?: string;
  ref?: any;
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

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center">
      <div
        className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image" />
      </div>

      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white w-full rounded rounded-lg">
        <form>
          <div className="flex flex-row space-x-4 py-2 px-8 rounded-tr-md rounded-tl-md" style={gradientStyle}>
            <div>
              <img src="/logo/kab-madiun.gif" className="w-8" alt="Logo Kab Madiun" />
            </div>
            <div
              className="flex flex-row items-center justify-center lg:justify-start">
              <p className="mb-0 mr-4 text-lg font-bold text-white">Halaman Login e-KAK</p>
            </div>
          </div>

          <div className="md:px-14 md:py-8 shadow shadow-lg">
            <div className="relative mb-6 mt-6" data-te-input-wrapper-init>
              <TextInput
                type="text"
                id="nip"
                name="nip"
                label="NIP/NIPPPK"
                // max={18}
                touched={touched.nip}
                errors={errors.nip}
                value={values.nip}
                change={handleChange}
              />
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <TextInput
                type="password"
                id="password"
                name="password"
                label="Password"
                touched={touched.password}
                errors={errors.password}
                value={values.password}
                change={handleChange}
              />
            </div>
            <div className="text-center lg:text-left">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function CreateForm({ handleSubmit }: MyFormProps) {
  const FormWithFormik = withFormik({
    mapPropsToValues: () => ({
      nip: "",
      password: "",
    }),
    validationSchema: Yup.object().shape({
      nip: Yup.string()
        .required('Bagian dibutuhkan'),
      // .min(18, 'NIP harus 18 angka')
      // .max(18, 'NIP harus 18 angka'),
      password: Yup.string()
        .required("Bagian dibutuhkan")
        .min(8, "Kata sandi terlalu pendek - minimal harus 8 karakter"),
    }),
    handleSubmit
  })(FormField)

  return <FormWithFormik />
}

const LoginForm: any = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setAuthenticated } = useAuth();
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie("refreshSession");
    if (typeof token !== "undefined") {
      getProfile();
    }
  }, [active]);

  const getProfile = async () => {
    const token = getCookie("refreshSession");
    if (typeof token !== "undefined") {
      const resUser = await fetchApi({
        url: "/user/getProfile",
        method: "get",
        type: "auth"
      })

      if (!resUser.success) {
        deleteCookie("refreshSession");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Koneksi bermasalah!',
        })
      } else {
        const { data } = resUser.data;
        dispatch(setProfile(data));
        router.push('/');
      }
    } else {
      router.push('/auth/login')
    }
  }

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    const payload = {
      "user": {
        nip: values.nip,
        password: values.password
      }
    }
    console.log(payload, '<< payload');

    const response = await fetchApi({
      url: "/users/sign_in",
      method: "post",
      type: "withoutAuth",
      body: payload
    })
    console.log(response);

    // if (!response.success) {
    //   router.push('/users/sign_in');
    //   if (response.code == 404) {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'NIP / Email tidak ditemukan',
    //     })
    //     setLoading(false);
    //   } else if (response.code == 400) {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Password salah!',
    //     })
    //     setLoading(false);
    //   } else if (response.code == 500) {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Koneksi bermasalah',
    //     })
    //     setLoading(false);
    //   }
    //   return false
    // } else if (response.success) {
    //   setAuthenticated(true);
    //   setActive(true);
    //   setCookie("refreshSession", response.data.data.access_token, {
    //     maxAge: 900000,
    //     path: "/",
    //   });
    //   getProfile();
    //   return true;
    // }
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

export default LoginForm;