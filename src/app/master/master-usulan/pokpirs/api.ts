import axios from 'axios';

export const fetchPokpirs = async (payload: any) => {
  const resp = await axios({
    method: 'get',
    url: `${process.env.SITE_URL}/master/pokpirs?tahun=${payload}`,
    data: payload,
    headers: {
      "Content-Type": "application/json"
    }
  })

  return resp;
}