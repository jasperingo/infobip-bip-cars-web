import React from 'react';
import { Link } from 'react-router-dom';

export const PageHeader = ({ text, link }: { text: string; link?: { path: string; text: string; }; }) => {
  return (
    <div className="my-4 p-4 bg-white rounded-lg flex">
      <h2 className="font-bold text-2xl flex-grow">{ text }</h2>
      { 
        link && (
          <Link to={link.path} className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-300">{ link.text }</Link>
        ) 
      }
    </div>
  );
}
