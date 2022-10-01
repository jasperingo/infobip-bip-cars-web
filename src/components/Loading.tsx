import React from 'react';

export const Loading = () => {
  return (
    <div className="bg-white rounded-lg my-4 p-8">
      <div className="animate-spin mx-auto h-12 w-12 border-4 border-orange-500 border-r-orange-200 rounded-full"></div>
    </div>
  );
}
