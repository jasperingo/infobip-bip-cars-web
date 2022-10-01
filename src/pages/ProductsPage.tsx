import React from 'react';
import { useQuery } from 'react-query';
import { ProductApi } from '../api/product-api';
import { ErrorContent } from '../components/ErrorContent';
import { Table } from '../components/Table';
import { Loading } from '../components/Loading';
import { PageHeader } from '../components/PageHeader';
import { ProductItem } from '../components/ProductItem';

const HEADINGS = ['ID', 'Name', 'Price', 'Actions'];

export const ProductsPage = () => {
  const { isLoading, error, data } = useQuery('products', ProductApi.getMany);

  return (
    <>
      <PageHeader text="Products" link={{ path: "create", text: "Add product" }} />

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
          <Table 
            items={data} 
            headings={HEADINGS}
            emptyText="No products"
            render={(item) => <ProductItem key={item.id} product={item} />} 
          />
        )
      }
    </>
  );
}
