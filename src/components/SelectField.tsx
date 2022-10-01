import React, { useEffect, useRef } from 'react';

export const SelectField = (
  { label, id, value, options, required = true, error, setValue, setValidity }:
  { 
    label: string; 
    id: string; 
    value: string; 
    required?: boolean;
    error?: string;
    options: { value: string; text: string; }[];
    setValue(value: string): void; 
    setValidity(validity: ValidityState): void;
  }
) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setValidity(inputRef.current.validity);
    }
  }, [setValidity]);

  const inputChanged = () => {
    if (inputRef.current) {
      setValue(inputRef.current.value);
      setValidity(inputRef.current.validity);
    }
  }

  return (
    <div className="mb-4">
    <label htmlFor="input" className="inline-block mb-1">{ label }</label>
    <select 
      ref={inputRef}
      id={id} 
      value={value}
      required={required}
      onChange={inputChanged}
      className="block w-full bg-white p-2 rounded-lg border border-orange-500 outline-none disabled:bg-gray-100" 
    >
      <option value="">Choose one</option>
      {
        options.map((opt) => <option key={opt.value} value={opt.value}>{ opt.text }</option>)
      }
    </select>
    <div className="text-red-500 text-sm">{ error }</div>
  </div>
  );
}
