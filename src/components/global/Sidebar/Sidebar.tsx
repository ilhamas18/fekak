'use client';
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLinkGroup from "./SiderbarLinkGroup";
import { RxDashboard } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineDatabase } from "react-icons/ai";
import { GiPapers } from "react-icons/gi";
import { GiSevenPointedStar } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
import { HiBuildingOffice } from 'react-icons/hi2'
import { shallowEqual, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { State } from "@/store/reducer";
import Typography from '@mui/material/Typography';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const { profile } = useSelector((state: State) => ({
    profile: state.profile.profile,
  }), shallowEqual);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-[17em] flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center">
        <div className="font-bold text-meta-6 text-lg lg:py-6.5 py-4">{ }</div>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scrollbar relative flex flex-col overflow-y-auto duration-300 ease-linear">
        <Stack direction="row" className="py-4 px-4 lg:px-6 flex gap-4 -mt-4">
          <Avatar {...stringAvatar(profile.nama)} sx={{ width: 47, height: 47 }} />
          <Typography
            noWrap
            style={{ color: '#FFBA00', fontSize: '18px', fontWeight: 'bold' }}
          >{profile.nama}</Typography>
        </Stack>
        <div className="text-title-ss text-white absolute top-7 left-22">{profile.nip}</div>

        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">

              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                          ${pathname === "/" && "bg-graydark dark:bg-meta-4"}`}
                >
                  <RxDashboard size={20} />
                  Dashboard
                </Link>
              </li>

              {/* <!-- Menu Item Master --> */}
              <div>
                <SidebarLinkGroup
                  activeCondition={
                    pathname?.includes("master")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                          ${pathname?.includes("master") || pathname === "/auth/registrasi" && "bg-graydark dark:bg-meta-4"}`
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true)
                          }}
                        >
                          <AiOutlineDatabase size={20} />
                          Master
                          <IoIosArrowDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"}`} />
                        </Link>
                        <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            <li>
                              <SidebarLinkGroup
                                activeCondition={
                                  pathname?.includes("master-usulan")
                                }
                              >
                                {(handleClick, open) => {
                                  return (
                                    <>
                                      <Link
                                        href="#"
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-1 px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                                          ${pathname?.includes("/master/master-usulan") && 'text-white'}`
                                        }
                                        onClick={(e) => {
                                          e.preventDefault();
                                          sidebarExpanded
                                            ? handleClick()
                                            : setSidebarExpanded(true)
                                        }}
                                      >
                                        Master Usulan
                                        <IoIosArrowDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"}`} />
                                      </Link>
                                      <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                                        <ul className="mt-2 mb-5.5 flex flex-col gap-2.5 pl-6">
                                          <li>
                                            <Link
                                              href="/master/master-usulan/musrenbang"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname?.includes('/master/master-usulan/musrenbang') && 'text-white bg-graydark py-1'}`}
                                            >Musrenbang</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/master-usulan/pokpirs"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname?.includes('/master/master-usulan/pokpirs') && 'text-white bg-graydark py-1'}`}
                                            >Pokok Pikiran</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/master-usulan/mandatori"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/master-usulan/mandatori" && 'text-white bg-graydark py-1'}`}
                                            >Mandatori</Link>
                                          </li>
                                          {/* <li>
                                            <Link
                                              href="/master/master-usulan/mandatori/spbe"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/master-usulan/mandatori/spbe" && 'text-white bg-graydark py-1'}`}
                                            >Peta Rencana SPBE</Link>
                                          </li> */}
                                          <li>
                                            <Link
                                              href="/master/master-usulan/inovasi"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/master-usulan/inovasi" && 'text-white bg-graydark py-1'}`}
                                            >Inisiatif Kepala Daerah</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/master-usulan/lppd"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/master-usulan/inovasi" && 'text-white bg-graydark py-1'}`}
                                            >LPPD</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/master-usulan/spm"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/master-usulan/inovasi" && 'text-white bg-graydark py-1'}`}
                                            >SPM</Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </>
                                  )
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <SidebarLinkGroup
                                activeCondition={
                                  pathname?.includes("anggaran")
                                }
                              >
                                {(handleClick, open) => {
                                  return (
                                    <>
                                      <Link
                                        href="#"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-1 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                                          ${pathname?.includes("/master/anggaran") && 'text-white'}`
                                        }
                                        onClick={(e) => {
                                          e.preventDefault();
                                          sidebarExpanded
                                            ? handleClick()
                                            : setSidebarExpanded(true)
                                        }}
                                      >
                                        Master Anggaran
                                        <IoIosArrowDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"}`} />
                                      </Link>
                                      <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                                        <ul className="mt-2 mb-5.5 flex flex-col gap-2.5 pl-6">
                                          <li>
                                            <Link
                                              href="/master/anggaran/ssh"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/anggaran/ssh" && 'text-white bg-graydark py-1'}`}
                                            >SSH</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/anggaran/sbu"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/anggaran/sbu" && 'text-white bg-graydark py-1'}`}
                                            >SBU</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/anggaran/hspk"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/anggaran/hspk" && 'text-white bg-graydark py-1'}`}
                                            >HSPK</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/anggaran/rekening"
                                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/master/anggaran/rekening" && 'text-white bg-graydark py-1'}`}
                                            >Kode Rekening</Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </>
                                  )
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <SidebarLinkGroup
                                activeCondition={
                                  pathname?.includes("pegawai")
                                }
                              >
                                {(handleClick, open) => {
                                  return (
                                    <>
                                      <Link
                                        href="#"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-1 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                                          ${pathname?.includes("/master/pegawai") && 'text-white'}`
                                        }
                                        onClick={(e) => {
                                          e.preventDefault();
                                          sidebarExpanded
                                            ? handleClick()
                                            : setSidebarExpanded(true)
                                        }}
                                      >
                                        Master Pegawai
                                        <IoIosArrowDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"}`} />
                                      </Link>
                                      <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                                        <ul className="mt-2 mb-5.5 flex flex-col gap-2.5 pl-6">
                                          <li>
                                            <Link
                                              href="/master/pegawai/pns"
                                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                                ${pathname === "/master/pegawai/pns" && "text-white bg-graydark py-1"}`}
                                            >PNS</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/pegawai/pppk"
                                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                                ${pathname === "/master/pegawai/pppk" && "text-white bg-graydark py-1"}`}
                                            >P3K</Link>
                                          </li>
                                          <li>
                                            <Link
                                              href="/master/pegawai/non-asn"
                                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                                ${pathname === "/master/pegawai/non-asn" && "text-white bg-graydark py-1"}`}
                                            >Non ASN</Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </>
                                  )
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <Link
                                href="/master/user/khusus"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                  ${pathname === "/master/user/khusus" && "text-white bg-graydark py-1"}`}
                              >User Khusus</Link>
                            </li>
                            <li>
                              <Link
                                href="/master/opd"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                  ${pathname === "/master/opd" && "text-white bg-graydark py-1"}`}
                              >Master OPD / Urusan</Link>
                            </li>
                            {/* <li>
                              <Link
                                href="/master/tematik"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                  ${pathname === "/master/tematik" && "text-white"}`}
                              >Master Bidang</Link>
                            </li>
                            <li>
                              <Link
                                href="/master/rencana-kinerja"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                  ${pathname === "/master/rencana-kinerja" && "text-white bg-graydark py-1"}`}
                              >Master Rencana Kinerja</Link>
                            </li> */}
                            <li>
                              <Link
                                href="/master/tematik"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                  ${pathname === "/master/tematik" && "text-white bg-graydark py-1"}`}
                              >Tematik</Link>
                            </li>
                            <li>
                              <Link
                                href="/master/periode"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                  ${pathname === "/master/periode" && "text-white bg-graydark py-1"}`}
                              >Periode</Link>
                            </li>
                            <li>
                              <Link
                                href="/master/tahun"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                  ${pathname === "/master/tahun" && "text-white bg-graydark py-1"}`}
                              >Tahun</Link>
                            </li>
                            <li>
                              <Link
                                href="/master/kelompok-anggaran"
                                className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                  ${pathname === "/master/kelompok-anggaran" && "text-white bg-graydark py-1"}`}
                              >Kelompok Anggaran</Link>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    )
                  }}
                </SidebarLinkGroup>
              </div>

              {/* {profile.role == 3 || profile.role == 4 && ( */}
              <SidebarLinkGroup
                activeCondition={
                  pathname?.includes("rencana-kota")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                          ${pathname?.includes("rencana-kota") && "bg-graydark dark:bg-meta-4"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <GiPapers size={20} />
                        <div className="text-title-">Perencanaan Kota / Kabupaten</div>
                        <IoIosArrowDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"}`} />
                      </Link>
                      <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/rencana-kota/tujuan-kota"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === '/rencana-kota/tujuan-kota' && 'text-white bg-graydark py-1'}`}
                            >
                              Tujuan
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-kota/isu-strategis"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === '/rencana-kota/isu-strategis' && 'text-white bg-graydark py-1'}`}
                            >
                              Isu Strategis
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-kota/strategi"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === '/rencana-kota/strategi' && 'text-white bg-graydark py-1'}`}
                            >
                              Strategi
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-kota/isu-strategis&arah-kebijakan"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white 
                              ${pathname === '/rencana-kota/isu-strategis&arah-kebijakan' && 'text-white bg-graydark py-1'}`}
                            >
                              Strategi & Arah Kebijakan
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-kota/sasaran"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === '/rencana-kota/sasaran' && 'text-white bg-graydark py-1'}`}
                            >
                              Sasaran
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-kota/tematik"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === '/rencana-kota/tematik' && 'text-white bg-graydark py-1'}`}
                            >
                              Tematik
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-kota/pohon-kinerja"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === '/rencana-kota/pohon-kinerja' && 'text-white bg-graydark py-1'}`}
                            >
                              Pohon Kinerja
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname?.includes("rencana-opd")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                          ${pathname?.includes("rencana-opd") && "bg-graydark dark:bg-meta-4"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <HiBuildingOffice size={20} />
                        <div className="text-title-">Perencanaan OPD</div>
                        <IoIosArrowDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"}`} />
                      </Link>
                      <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/notulen/laporan"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white`}
                            >
                              Master Usulan
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-opd/tujuan-opd"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white 
                              ${pathname?.includes('/rencana-opd/tujuan-opd') && 'text-white bg-graydark py-1'}`}
                            >
                              Tujuan OPD
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-opd/isu-strategis&permasalahan"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white 
                              ${pathname === '/rencana-opd/isu-strategis&permasalahan' && 'text-white bg-graydark py-1'}`}
                            >
                              Isu Strategis & Permasalahan
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-opd/pokin-opd"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === '/rencana-opd/pokin-opd' && 'text-white bg-graydark py-1'}`}
                            >
                              Pohon Kinerja OPD
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-opd/isu-strategis&arah-kebijakan"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white 
                              ${pathname === '/rencana-opd/isu-strategis&arah-kebijakan' && 'text-white bg-graydark py-1'}`}
                            >
                              Strategi & Arah Kebijakan
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white`}
                            >
                              Rencana Kinerja OPD
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/rencana-opd/program-kegiatan"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === '/rencana-opd/program-kegiatann' && 'text-white bg-graydark py-1'}`}
                            >
                              Program / Kegiatan
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white`}
                            >
                              Pohon Kinerja Kota
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname?.includes("laporan")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                          ${pathname?.includes("laporan") && "bg-graydark dark:bg-meta-4"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <HiDocumentReport size={20} />
                        <div className="text-title-">Laporan</div>
                        <IoIosArrowDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"}`} />
                      </Link>
                      <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/laporan/kak"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === "/laporan/kak" && 'text-white bg-graydark py-1'}`}
                            >
                              Rencana Kinerja (KAK)
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/laporan/rka"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === "/laporan/rka" && 'text-white bg-graydark py-1'}`}
                            >
                              Rincian Belanja
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/laporan/renstra"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === "/laporan/renstra" && 'text-white bg-graydark py-1'}`}
                            >
                              Renstra
                            </Link>
                          </li>
                          <li>
                            <SidebarLinkGroup
                              activeCondition={
                                pathname?.includes("/laporan/renja")
                              }
                            >
                              {(handleClick, open) => {
                                return (
                                  <>
                                    <Link
                                      href="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-1 font-medium text-bodydark2 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                                          ${pathname?.includes("/laporan/renja") && 'text-white'}`
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true)
                                      }}
                                    >
                                      Renja
                                      <IoIosArrowDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"}`} />
                                    </Link>
                                    <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                                      <ul className="mt-2 mb-5.5 flex flex-col gap-2.5 pl-6">
                                        <li>
                                          <Link
                                            href="/laporan/renja/ranwal"
                                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/laporan/renja/ranwal" && 'text-white bg-graydark py-1'}`}
                                          >Ranwal</Link>
                                        </li>
                                        <li>
                                          <Link
                                            href="/laporan/renja/rankir1"
                                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/laporan/renja/rankir1" && 'text-white bg-graydark py-1'}`}
                                          >Rankir-1</Link>
                                        </li>
                                        <li>
                                          <Link
                                            href="/laporan/renja/rankir2"
                                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/laporan/renja/rankir2" && 'text-white bg-graydark py-1'}`}
                                          >Rankir-2</Link>
                                        </li>
                                        <li>
                                          <Link
                                            href="/laporan/renja/penetapan"
                                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                                              ${pathname === "/laporan/renja/penetapan" && 'text-white bg-graydark py-1'}`}
                                          >Penetapan</Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </>
                                )
                              }}
                            </SidebarLinkGroup>
                          </li>
                          <li>
                            <Link
                              href="/laporan/renja/perubahan"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === "/laporan/renja/perubahan" && 'text-white bg-graydark py-1'}`}
                            >
                              Renja Perubahan
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/laporan/rekap-rencana-kinerja"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === "/laporan/rekap-rencana-kinerja" && 'text-white bg-graydark py-1'}`}
                            >
                              Rekap Rencana Kinerja
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/laporan/rekap-strategi"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === "/laporan/rekap-strategi" && 'text-white bg-graydark py-1'}`}
                            >
                              Rekap Strategi
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/laporan/rekap-cascading"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white
                              ${pathname === "/laporan/rekap-cascading" && 'text-white bg-graydark py-1'}`}
                            >
                              Rekap Cascading
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
