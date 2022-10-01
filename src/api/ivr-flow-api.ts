import { IVRFlow, IVRFlowUpdateDto } from '../models/ivr-flow';

export const IVRFLowApi = {
  async update(ivrFlow: IVRFlowUpdateDto): Promise<IVRFlow> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}ivr/flow`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(ivrFlow),
    });

    if (!res.ok) {
      if (res.status === 400) {
        throw await res.json();
      } else {
        throw new Error(`${res.status} error occured`);
      }
    }

    return res.json();
  },

  async getOne(): Promise<IVRFlow> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}ivr/flow`);

    if (!res.ok) {
      throw new Error(`${res.status} error occured`);
    }

    return res.json();
  },
};
