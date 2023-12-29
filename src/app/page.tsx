'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Inter } from '@next/font/google'
import withAuth from '@/components/utils/withAuth'

const inter = Inter({ subsets: ['latin'] })

function Home() {
  return (
    <div></div>
  )
}

export default withAuth(Home);
