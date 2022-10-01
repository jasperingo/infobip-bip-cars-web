import React, { HTMLInputTypeAttribute, useEffect, useRef } from 'react';

export const defaultValidity = {
  valid: false, 
  valueMissing: true, 
  typeMismatch: false, 
  patternMismatch: false, 
  tooLong: false, 
  tooShort: false, 
  rangeUnderflow: false, 
  rangeOverflow: false, 
  stepMismatch: false, 
  badInput: false, 
  customError: false
};

export const InputField = (
  { label, id, value, type = 'text', required = true, min, step, error, setValue, setValidity }:
  { 
    label: string; 
    id: string; 
    value: string; 
    type?: HTMLInputTypeAttribute; 
    required?: boolean; 
    min?: number; 
    step?: string;
    error?: string;
    setValue(value: string): void; 
    setValidity(validity: ValidityState): void;
  }
) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <input 
        ref={inputRef}
        id={id} 
        type={type}
        value={value}
        min={min}
        step={step}
        required={required}
        onInput={inputChanged}
        className="block w-full bg-white p-2 rounded-lg border border-orange-500 outline-none disabled:bg-gray-100" 
      />
      <div className="text-red-500 text-sm">{ error }</div>
    </div>
  );
}
