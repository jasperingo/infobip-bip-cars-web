import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductApi } from '../api/product-api';
import { Form } from '../components/Form';
import { FormButton } from '../components/FormButton';
import { defaultValidity, InputField } from '../components/InputField';
import { PageHeader } from '../components/PageHeader';
import { BadRequestError } from '../models/bad-request-error';

export const ProductCreatePage = () => {
  const [name, setName] = useState('');
  
  const [nameError, setNameError] = useState('');

  const [nameValidity, setNameValidity] = useState(defaultValidity);

  const [price, setPrice] = useState(0);

  const [priceError, setPriceError] = useState('');

  const [priceValidity, setPriceValidity] = useState(defaultValidity);

  const navigate = useNavigate();

  const { mutate, isLoading, error, isError, isSuccess } = useMutation(ProductApi.create);

  useEffect(() => {
    if (isSuccess) {
      navigate('/products');
      toast.success('Product added');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (Array.isArray(error)) {
        (error as BadRequestError[]).forEach(err => {
          switch(err.name) {
            case 'name': return setNameError(err.message);
            case 'price': return setPriceError(err.message);
          }
        })
      } else {
        toast.error('An error occured');
      }
    }
  }, [isError, error]);

  const onFormSubmit = () => {
    if (!nameValidity.valid) {
      setNameError('Invalid field');
    }

    if (!priceValidity.valid) {
      setPriceError('Invalid field');
    }

    if (nameValidity.valid && priceValidity.valid) {
      mutate({ name, price });
    }
  }

  return (
    <>
      <PageHeader text="Add Product" />
      
      <Form disabled={isLoading} onSubmit={onFormSubmit}>
        <InputField 
          id="name-input" 
          label="Name" 
          value={name} 
          error={nameError}
          setValue={setName} 
          setValidity={setNameValidity} 
        />

        <InputField 
          id="price-input" 
          label="Price (NGN)" 
          type="number" 
          min={0}
          step="0.01"
          error={priceError}
          value={String(price)} 
          setValue={(v) => setPrice(Number(v))} 
          setValidity={setPriceValidity} 
        />

        <FormButton disabled={isLoading} />
      </Form>
    </>
  );
}
