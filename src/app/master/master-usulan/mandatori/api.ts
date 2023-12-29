import axios from 'axios';

export const fetchMandatori = async (payload: any) => {
  const resp = await axios({
    method: 'get',
    url: `${process.env.SITE_URL}/master/mandatoris?kode_opd=${payload}`,
    data: {
      kode_opd: payload
    },
    headers: {
      "Content-Type": "application/json"
    }
  })

  return resp;
}