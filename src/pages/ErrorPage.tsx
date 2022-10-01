import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error: any = useRouteError();

  console.error(error);

  return (
    <div className="container h-screen flex justify-center items-center flex-col">
      <h1 className="font-bold text-4xl text-orange-500">Oops!</h1>
      <p className="my-4 text-2xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="block w-fit bg-orange-500 text-white p-4 rounded-lg my-4">Home page</Link>
    </div>
  );
}
