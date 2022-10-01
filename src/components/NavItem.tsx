import React from 'react';
import { Link } from 'react-router-dom';

export const NavItem = ({ text, path }: { text: string; path: string; }) => {
  return (
    <li>
      <Link to={path} className="block font-bold mb-8 p-4 shadow rounded-lg hover:shadow-orange-300">{ text }</Link>
    </li>
  );
}
