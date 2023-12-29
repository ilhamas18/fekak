'use client'
import React from "react";
import LoginForm from "@/components/pages/auth/login";
import withoutAuth from '../../../components/utils/withoutAuth'

import { getCookie } from "cookies-next";

const Page = () => {
  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center text-center">
      <div className="h-full flex flex-col items-center justify-center text-center">
        <LoginForm />
      </div>
    </section>
  )
}

export default withoutAuth(Page);