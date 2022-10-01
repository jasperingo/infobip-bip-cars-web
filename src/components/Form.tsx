import React, { FormEvent, ReactNode } from 'react';

export const Form = (
  { children, disabled, method = 'POST', fullWidth = false, onSubmit }: 
  { children?: ReactNode; disabled: boolean; method?: 'GET' | 'POST'; fullWidth?: boolean; onSubmit(e: FormEvent<HTMLFormElement>): void; }
) => {
  const formSubmitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form method={method} onSubmit={formSubmitted} noValidate className={`bg-white mx-auto p-4 rounded-lg ${fullWidth ? '' : 'lg:w-96'}`}>
      <fieldset disabled={disabled}>
        { children }
      </fieldset>
    </form>
  );
}
