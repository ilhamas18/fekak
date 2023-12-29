"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import TextInput from "@/components/common/text-input/input";
import { Button } from "@/components/common/button/button";
import Loading from "@/components/global/Loading/loading";
import { AiOutlineClose } from "react-icons/ai";
import { withFormik, FormikProps, FormikBag } from "formik";
import * as Yup from "yup";
import { shallowEqual, useSelector } from "react-redux";
import { State } from "@/store/reducer";
import { getCookies } from "cookies-next";
import { IoMdClose } from "react-icons/io";

interface FormValues {
  kode_kelompok_barang: string;
  uraian_kelompok_barang: string;
  kode_barang: string;
  uraian_barang: string;
  spesifikasi: string;
  satuan: string;
  harga_satuan: string;
  tahun: string;
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
    ref,
  } = props;

  return (
    <React.Fragment>
      <div className="form-container relative bg-white">
        <div className="form-wrapper-general">
          <div className="px-8 flex flex-col space-y-7 py-8">
            <div className="data flex flex-row">
              <TextInput
                type="text"
                id="kode_kelompok_barang"
                name="kode_kelompok_barang"
                touched={touched.kode_kelompok_barang}
                label="Kode Kelompok Barang"
                change={handleChange}
                value={values.kode_kelompok_barang}
                handleBlur={handleBlur}
                errors={errors.kode_kelompok_barang}
              />
            </div>
            <div className="data flex flex-row">
              <TextInput
                type="text"
                id="uraian_kelompok_barang"
                name="uraian_kelompok_barang"
                touched={touched.uraian_kelompok_barang}
                label="Uraian Kelompok Barang"
                change={handleChange}
                value={values.uraian_kelompok_barang}
                handleBlur={handleBlur}
                errors={errors.uraian_kelompok_barang}
              />
            </div>
            <div className="data flex flex-row">
              <TextInput
                type="text"
                id="kode_barang"
                name="kode_barang"
                touched={touched.kode_barang}
                label="Kode Barang"
                change={handleChange}
                value={values.kode_barang}
                handleBlur={handleBlur}
                errors={errors.kode_barang}
              />
            </div>
            <div className="data flex flex-row">
              <TextInput
                type="text"
                id="uraian_barang"
                name="uraian_barang"
                touched={touched.uraian_barang}
                label="Uraian Barang"
                change={handleChange}
                value={values.uraian_barang}
                handleBlur={handleBlur}
                errors={errors.uraian_barang}
              />
            </div>
            <div className="data flex flex-row">
              <TextInput
                type="text"
                id="spesifikasi"
                name="spesifikasi"
                touched={touched.spesifikasi}
                label="Spesifikasi"
                change={handleChange}
                value={values.spesifikasi}
                handleBlur={handleBlur}
                errors={errors.spesifikasi}
              />
            </div>
            <div className="data flex flex-row">
              <TextInput
                type="text"
                id="satuan"
                name="satuan"
                touched={touched.satuan}
                label="Satuan"
                change={handleChange}
                value={values.satuan}
                handleBlur={handleBlur}
                errors={errors.satuan}
              />
            </div>
            <div className="data flex flex-row">
              <TextInput
                type="text"
                id="harga_satuan"
                name="harga_satuan"
                touched={touched.harga_satuan}
                label="Harga Satuan"
                change={handleChange}
                value={values.harga_satuan}
                handleBlur={handleBlur}
                errors={errors.harga_satuan}
              />
            </div>
            <div className="data flex flex-row">
              <TextInput
                type="text"
                id="tahun"
                name="tahun"
                touched={touched.tahun}
                label="Tahun"
                change={handleChange}
                value={values.tahun}
                handleBlur={handleBlur}
                errors={errors.tahun}
              />
            </div>
            <div className="btn flex justify-between">
              <div className="btn-submit flex flex-row justify-between pb-4 mt-4 space-x-3">
                <div className="w-[8em]">
                  <Button
                    type="secondary"
                    variant="xl"
                    className="button-container"
                    rounded
                  >
                    <div className="flex justify-center items-center text-xl-base font-Nunito">
                      <span className="button-text">Batal</span>
                    </div>
                  </Button>
                </div>
              </div>
              <div className="btn-submit flex flex-row justify-between pb-4 mt-4 space-x-3">
                <div className="w-[8em]">
                  <Button
                    type="button"
                    variant="xl"
                    className="button-container"
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
        </div>
      </div>
    </React.Fragment>
  )
}

function CreateForm({ handleSubmit }: MyFormProps) {
  const FormWithFormik = withFormik({
    mapPropsToValues: () => ({
      kode_kelompok_barang: "",
      uraian_kelompok_barang: "",
      kode_barang: "",
      uraian_barang: "",
      spesifikasi: "",
      satuan: "",
      harga_satuan: "",
      tahun: ""
    }),
    validationSchema: Yup.object().shape({
      kode_kelompok_barang: Yup.string()
        .required("Field tidak boleh kosong !"),
      uraian_kelompok_barang: Yup.string()
        .required("Field tidak boleh kosong !"),
      kode_barang: Yup.string()
        .required("Harap isi nama pimpinan rapat !"),
      uraian_barang: Yup.string()
        .required("Harap isi nama pimpinan rapat !"),
      spesifikasi: Yup.string()
        .required("Harap isi nama pimpinan rapat !"),
      satuan: Yup.string()
        .required("Harap isi nama pimpinan rapat !"),
      harga_satuan: Yup.string()
        .required("Harap isi nama pimpinan rapat !"),
      tahun: Yup.string()
        .required("Harap isi nama pimpinan rapat !"),
    }),
    handleSubmit
  })(FormField);

  return <FormWithFormik />;
}

const AddAnggaranSSHForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return <CreateForm handleSubmit={handleSubmit} />
}

export default AddAnggaranSSHForm;
