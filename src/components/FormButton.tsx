import React from 'react';

export const FormButton = ({ text = 'Submit', disabled }: { text?: string; disabled: boolean; }) => {
  return (
    <div className="mt-6">
      <button className="block w-full p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-300 disabled:bg-orange-300">
        {
          !disabled ? text : (
            <div className="animate-spin mx-auto h-8 w-8 border-4 border-orange-500 border-r-orange-200 rounded-full"></div>
          )
        }
      </button>
    </div>
  );
}
