import React from 'react';
import { Product } from '../models/product';
import { ItemActions } from './ItemActions';

export const ProductItem = ({ product }: { product: Product; }) => {
  return (
    <tr>
      <td className="p-4">{ product.id }</td>
      <td className="p-4">{ product.name }</td>
      <td className="p-4">NGN { product.price }</td>
      <ItemActions editPath={`${product.id}/update`} deletePath={`${product.id}/delete`} />
    </tr>
  );
}
