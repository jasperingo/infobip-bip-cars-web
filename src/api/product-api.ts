import { Product } from "../models/product";

export const ProductApi = {
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}products`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product),
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

  async update(id: number, product: Omit<Product, 'id'>): Promise<Product> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}products/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product),
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
    const res = await fetch(`${process.env.REACT_APP_API_URL}products/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`${res.status} error occured`);
    }

    return true;
  },

  async getOne(id: number): Promise<Product> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}products/${id}`);

    if (!res.ok) {
      throw new Error(`${res.status} error occured`);
    }

    return res.json();
  },

  async getMany(): Promise<Product[]> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}products`);

    if (!res.ok) {
      throw new Error(`${res.status} error occured`);
    }

    return res.json();
  }
};
