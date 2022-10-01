import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductApi } from '../api/product-api';
import { ErrorContent } from '../components/ErrorContent';
import { Form } from '../components/Form';
import { FormButton } from '../components/FormButton';
import { Loading } from '../components/Loading';
import { PageHeader } from '../components/PageHeader';

export const ProductDeletePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { isLoading, error, data, isSuccess } = useQuery(['product', id], () => ProductApi.getOne(Number(id)));

  const { 
    mutate, 
    isError: isMutationError, 
    isLoading: isMutationLoading, 
    error: mutationError, 
    isSuccess: isMutationSuccess 
  } = useMutation(ProductApi.delete);

  useEffect(() => {
    if (isMutationSuccess) {
      navigate('/products');
      toast.success('Product deleted');
    }
  }, [isMutationSuccess, navigate]);

  useEffect(() => {
    if (isMutationError) {
      if (mutationError instanceof Error) {
        toast.error(mutationError.message);
      } else {
        toast.error('An error occured');
      }
    }
  }, [isMutationError, mutationError]);

  const onFormSubmit = () => {
    mutate(Number(id));
  }

  return (
    <>
      <PageHeader text="Delete Product" />

      {
        isLoading && <Loading />
      }

      {
        error && (
          <ErrorContent error={error} />
        )
      }

      {
        isSuccess && (
          <Form disabled={isMutationLoading} onSubmit={onFormSubmit}>
            <div>
              <div className="font-bold">{ data.name } - NGN { data.price }</div>
              <div>Are you sure you want to delete this product?</div>
            </div>
            <FormButton disabled={isMutationLoading} text="Delete" />
          </Form>
        )
      }
    </>
  );
}
