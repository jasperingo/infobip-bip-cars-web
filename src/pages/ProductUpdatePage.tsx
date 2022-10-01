import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductApi } from '../api/product-api';
import { ErrorContent } from '../components/ErrorContent';
import { Form } from '../components/Form';
import { FormButton } from '../components/FormButton';
import { defaultValidity, InputField } from '../components/InputField';
import { Loading } from '../components/Loading';
import { PageHeader } from '../components/PageHeader';
import { BadRequestError } from '../models/bad-request-error';
import { Product } from '../models/product';

export const ProductUpdatePage = () => {
  const { id } = useParams();

  const { isLoading, error, data, isSuccess } = useQuery(['product', id], () => ProductApi.getOne(Number(id)));

  const { 
    mutate, 
    isError: isMutationError, 
    isLoading: isMutationLoading, 
    error: mutationError, 
    isSuccess: isMutationSuccess 
  } = useMutation((product: Omit<Product, 'id'>) => ProductApi.update(Number(id), product));

  const [name, setName] = useState('');
  
  const [nameError, setNameError] = useState('');

  const [nameValidity, setNameValidity] = useState(defaultValidity);

  const [price, setPrice] = useState(0);

  const [priceError, setPriceError] = useState('');

  const [priceValidity, setPriceValidity] = useState(defaultValidity);

  useEffect(() => {
    if (isSuccess) {
      setName(data.name);
      setPrice(data.price);
    }
  }, [isSuccess, data]);
  
  useEffect(() => {
    if (isMutationSuccess) {
      toast.success('Product updated');
    }
  }, [isMutationSuccess]);

  useEffect(() => {
    if (isMutationError) {
      if (mutationError instanceof Error) {
        toast.error(mutationError.message);
      } else if (Array.isArray(mutationError)) {
        (mutationError as BadRequestError[]).forEach(err => {
          switch(err.name) {
            case 'name': return setNameError(err.message);
            case 'price': return setPriceError(err.message);
          }
        })
      } else {
        toast.error('An error occured');
      }
    }
  }, [isMutationError, mutationError]);

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
      <PageHeader text="Edit Product" />

      {
        isLoading && <Loading />
      }

      {
        error && (
          <ErrorContent error={error} />
        )
      }

      {
        data && (
          <Form disabled={isMutationLoading} onSubmit={onFormSubmit}>
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

            <FormButton disabled={isMutationLoading} />
          </Form>
        )
      }
    </>
  );
}
