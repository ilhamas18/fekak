interface ProfileInterface {
  profile: any;
}

export const initialState: ProfileInterface = {
  profile: {
    nama: 'Salma Fadila',
    nip: '199814122022041002',
    pangkat: 'III/a',
    Perangkat_Daerah: {
      nama_opd: 'Badan Perencanaan, Penelitian, dan Pengembangan Daerah',
    }
  }
}