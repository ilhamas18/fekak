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
  lembaga: string
}