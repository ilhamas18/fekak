'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import { fetchApi } from '@/pages/api/request';
import Swal from 'sweetalert2';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import { BsPeopleFill } from "react-icons/bs";
import { FaSync } from 'react-icons/fa';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { GiSpikesInit } from 'react-icons/gi';
import withAuth from '@/components/utils/withAuth';
import DataMusrenbang from '@/components/pages/master/master-usulan/musrenbang/list';
import { BiSearch } from 'react-icons/bi';
import Loading from '@/components/global/Loading/loading';
import DataInovasi from '@/components/pages/master/master-usulan/inovasi/list';

const Inovasi = () => {
	const [dataInovasi, setDataInovasi] = useState<any>([]);
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		fetchDataInovasi();
	}, []);

	const fetchDataInovasi = () => {
		let temp: any = [
			{
				id: 1,
				tahun: 2023,
				usulan: 'Bahwa dalam mendukung kinerja, perlu adanya dukungan sarana dan prasarana kantor yang memadai',
				manfaat: 'perlindungan ciptaan dan kreasi masyarakat',
				uraian: 'fasilitasi pendaftaran HKI Hak Cipta melalui laman layanan HKI-HC DJKI Kementerian Hukum dan HAM sebagai upaya melindungi hak ekonomi, hak eksklusif dan hak moral pencipta atas karya ciptaan para pencipta',
				pengusul: 'ALI YOGA UTAMA',
				opd: 'Badan Perencanaan, Penelitian dan Pengembangan Daerah',
				status: '-'
			},
		]
		setDataInovasi(temp);
	}

	const gradientStyle = {
		width: '100%',
		background: 'linear-gradient(to right, #00bcd4, #2196f3)',
	};

	return (
		<div className='inisiatif-container'>
			<Breadcrumb pageName="Inisiatif" />

			<div className="bg-white dark:bg-meta-4 dark:text-white shadow-card flex flex-col gap-2 py-6 text-center font-bold text-title-sm rounded rounded-lg border-none">
				<div>Usulan Inisiatif</div>
			</div>
			<div className='body relative'>
				<div className='flex justify-between items-center mt-10'>
					<div className='flex'></div>
					<div className='flex gap-3 bg-white items-center border border-light-gray rounded-3xl p-2 mb-3'>
						<BiSearch size={22} className='text-deep-gray' />
						<input
							type="text"
							id="search"
							name="search"
							value={search}
							placeholder='Search . . .'
							onChange={(e) => setSearch(e.target.value)}
							className='focus:outline-none w-full outline-none text-Axiata-Book' />
					</div>
				</div>
				<div style={gradientStyle}>
					<div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
						<GiSpikesInit size={20} />
						<div className='text-title-xsm'>Inisiatif</div>
					</div>
				</div>
				<DataInovasi data={dataInovasi} />
			</div>
		</div>
	)
}

export default withAuth(Inovasi);