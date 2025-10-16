"use client";

import React from 'react'
import Header2 from '../components/App_Header/Header2'
import dynamic from 'next/dynamic';

const GetHelp = dynamic(() => import("@/app/components/support_component/GetHelp"));

export default function page() {
  return (
    <div>
        <Header2 />
        <GetHelp/>
    </div>
  )
}
