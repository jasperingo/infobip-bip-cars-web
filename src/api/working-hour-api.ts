import { WorkingHour } from "../models/working-hour";

export const WorkingHourApi = {
  async create(workingHour: Omit<WorkingHour, 'id'>): Promise<WorkingHour> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}working-hours`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(workingHour),
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

  async update(id: number, workingHour: Omit<WorkingHour, 'id'>): Promise<WorkingHour> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}working-hours/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(workingHour),
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

  async delete(id: number): Promise<boolean> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}working-hours/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`${res.status} error occured`);
    }

    return true;
  },

  async getOne(id: number): Promise<WorkingHour> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}working-hours/${id}`);

    if (!res.ok) {
      throw new Error(`${res.status} error occured`);
    }

    return res.json();
  },

  async getMany(): Promise<WorkingHour[]> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}working-hours`);

    if (!res.ok) {
      throw new Error(`${res.status} error occured`);
    }

    return res.json();
  }
};
