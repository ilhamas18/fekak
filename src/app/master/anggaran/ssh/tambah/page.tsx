'use client'
import { useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";
import { State } from "@/store/reducer";
import { useEffect } from "react";
import AddAnggaranSSHForm from "@/components/pages/master/anggaran/ssh/add";
import { FaWpforms } from "react-icons/fa";
import withAuth from "@/components/utils/withAuth";

const AddAnggaranSSH = () => {
  const router = useRouter();

  const { profile } = useSelector((state: State) => ({
    profile: state.profile.profile
  }), shallowEqual);

  useEffect(() => {
    if (profile.role != 3 && profile.role != 4) {
      router.push('/unauthorized')
    }
  }, [])

  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
  };

  return (
    <div className="form-notulen-container">
      <div style={gradientStyle} className='mt-8'>
        <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
          <FaWpforms size={20} />
          <div className='text-title-xsm'>Form Tambah Anggaran SSH</div>
        </div>
      </div>
      <AddAnggaranSSHForm />
    </div>
  )
}

export default withAuth(AddAnggaranSSH)