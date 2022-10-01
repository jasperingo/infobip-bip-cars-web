import React from 'react';

export const ErrorContent = ({ error, onRetryClicked }: { error: any; onRetryClicked?(): void; }) => {
  return (
    <div className="bg-white rounded-lg my-4 p-8 text-center">
      <div className="font-bold text-4xl text-orange-500">Error!</div>
      <div className="my-4">{ error?.message }</div>
      { 
        onRetryClicked && (
          <button 
            onClick={onRetryClicked} 
            className="block w-fit bg-orange-500 text-white p-4 rounded-lg mx-auto"
          >
            Retry
          </button>
        )
      }
    </div>
  );
}
