import React from 'react';
import { Link } from 'react-router-dom';

export const ItemActions = ({ editPath, deletePath }: { editPath: string; deletePath: string; }) => {
  return (
    <td className="p-4 flex gap-x-4">
      <Link to={editPath} className="py-1 px-2 rounded-lg hover:bg-gray-200">Edit</Link>
      <Link to={deletePath} className="p-1 px-2 rounded-lg text-red-500 hover:bg-gray-200">Delete</Link> 
    </td>
  );
}
