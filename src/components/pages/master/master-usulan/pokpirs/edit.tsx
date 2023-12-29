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
import { useDispatch } from "react-redux";
import { setStorePayload } from "@/store/payload/action";

interface FormValues {
  usulan: string;
  alamat: string;
  permasalahan: string;
  tahun: string;
}

interface OtherProps {
  title?: string;
  ref?: any;
  data?: any;
  tahun?: any;
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
  const dispatch = useDispatch();
  const [dataTahun, setDataTahun] = useState<any>([]);

  useEffect(() => {
    getTahun();
  }, []);

  const getTahun = () => {
    let temp: any = [];
    temp.push(
      {
        label: 2020,
        value: 2020
      },
      {
        label: 2021,
        value: 2020
      },
      {
        label: 2022,
        value: 2020
      },
      {
        label: 2023,
        value: 2020
      },
      {
        label: 2024,
        value: 2020
      }
    )
    setDataTahun(temp);
  }

  const handleBack = () => {
    dispatch(setStorePayload([]));
    router.push('/master/master-usulan/pokpirs');
  };

  return (
    <div className="form-container relative bg-white">
      <div className="form-wrapper-general">
        <div className="px-8 flex flex-col space-y-7 py-6">
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm w-[12%] lg:block hidden">Usulan</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="text"
                id="usulan"
                name="usulan"
                label="Usulan"
                touched={touched.usulan}
                errors={errors.usulan}
                value={values.usulan}
                change={handleChange}
              />
            </div>
          </div>
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm w-[12%] lg:block hidden">Alamat</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="text"
                id="alamat"
                name="alamat"
                label="Alamat"
                touched={touched.alamat}
                errors={errors.alamat}
                value={values.alamat}
                change={handleChange}
              />
            </div>
          </div>
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm w-[12%] lg:block hidden">Permasalahan</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="text-area"
                id="permasalahan"
                name="permasalahan"
                label="Permasalahan"
                touched={touched.permasalahan}
                errors={errors.permasalahan}
                value={values.permasalahan}
                change={handleChange}
              />
            </div>
          </div>
          <div className="relative flex w-full items-center">
            <div className="text-title-xsm w-[12%] lg:block hidden">Tahun</div>
            <div className="w-[3%] lg:block hidden">:</div>
            <div className="lg:w-[85%] w-full">
              <TextInput
                type="dropdown"
                id="tahun"
                name="tahun"
                label="Tahun"
                touched={touched.tahun}
                errors={errors.tahun}
                value={values.tahun}
                placeholder="Ketik dan pilih tahun"
                options={dataTahun}
                handleBlur={handleBlur}
                setValueSelected={handleChange}
                change={(selectedOption: any) => {
                  handleChange({
                    target: { name: "tahun", value: selectedOption },
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between mt-6 px-6 pb-8">
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
              onClick={handleSubmit}
            >
              <div className="flex justify-center items-center text-white font-Nunito">
                <span className="button-text">Tambah</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreateForm({ handleSubmit, data, tahun }: MyFormProps) {
  const FormWithFormik = withFormik({
    mapPropsToValues: () => ({
      usulan: data?.usulan !== null ? data.usulan : "",
      alamat: data?.alamat !== null ? data.alamat : "",
      permasalahan: data?.permasalahan !== null ? data.permasalahan : "",
      tahun: data?.tahun !== null ? tahun : ""
    }),
    validationSchema: Yup.object().shape({
      usulan: Yup.string()
        .required("Bagian dibutuhkan"),
      alamat: Yup.string()
        .required("Bagian dibutuhkan"),
      permasalahan: Yup.string()
        .required("Bagian dibutuhkan"),
      tahun: Yup.object()
        .required("Bagian dibutuhkan")
        .nullable(),
    }),
    handleSubmit
  })(FormField)

  return <FormWithFormik />
}

interface PropTypes {
  data: any;
}

const EditPokokPikiranForm: any = ({ data }: PropTypes) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tahun, setTahun] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTahun({
      label: data.tahun,
      value: data.tahun
    })
  }, []);

  const handleSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading loading={Loading} setLoading={setLoading} />
      ) : (
        <CreateForm handleSubmit={handleSubmit} data={data} tahun={tahun} />
      )}
    </React.Fragment>
  )
}

export default EditPokokPikiranForm;