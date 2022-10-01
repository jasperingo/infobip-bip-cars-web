import React from 'react';
import { useQuery } from 'react-query';
import { WorkingHourApi } from '../api/working-hour-api';
import { ErrorContent } from '../components/ErrorContent';
import { Loading } from '../components/Loading';
import { PageHeader } from '../components/PageHeader';
import { Table } from '../components/Table';
import { WorkingHourItem } from '../components/WorkingHourItem';

const HEADINGS = ['ID', 'Day', 'Opening hour', 'Closing hour', 'Actions'];

export const WorkingHoursPage = () => {
  const { isLoading, error, data, isSuccess } = useQuery('working-hours', WorkingHourApi.getMany);

  return (
    <>
      <PageHeader text="Working Hours" link={{ path: "create", text: "Add working hour" }} />
      
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
          <Table 
            items={data} 
            headings={HEADINGS}
            emptyText="No working hours"
            render={(item) => <WorkingHourItem key={item.id} workingHour={item} />} 
          />
        )
      }
    </>
  );
}
