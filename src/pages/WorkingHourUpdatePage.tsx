import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WorkingHourApi } from '../api/working-hour-api';
import { ErrorContent } from '../components/ErrorContent';
import { Form } from '../components/Form';
import { FormButton } from '../components/FormButton';
import { defaultValidity, InputField } from '../components/InputField';
import { Loading } from '../components/Loading';
import { PageHeader } from '../components/PageHeader';
import { SelectField } from '../components/SelectField';
import { BadRequestError } from '../models/bad-request-error';
import { DAYS, DaysOfWeekType, WorkingHour } from '../models/working-hour';

export const WorkingHourUpdatePage = () => {
  const { id } = useParams();

  const { isLoading, error, data, isSuccess } = useQuery(['working-hour', id], () => WorkingHourApi.getOne(Number(id)));

  const { 
    mutate, 
    isError: isMutationError, 
    isLoading: isMutationLoading, 
    error: mutationError, 
    isSuccess: isMutationSuccess 
  } = useMutation((workingHour: Omit<WorkingHour, 'id'>) => WorkingHourApi.update(Number(id), workingHour));

  const [day, setDay] = useState<DaysOfWeekType>('MONDAY');
  
  const [dayError, setDayError] = useState('');

  const [dayValidity, setDayValidity] = useState(defaultValidity);

  const [open, setOpen] = useState('');
  
  const [openError, setOpenError] = useState('');

  const [openValidity, setOpenValidity] = useState(defaultValidity);

  const [close, setClose] = useState('');
  
  const [closeError, setCloseError] = useState('');

  const [closeValidity, setCloseValidity] = useState(defaultValidity);

  useEffect(() => {
    if (isSuccess) {
      setDay(data.day);
      setOpen(data.open);
      setClose(data.close);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isMutationSuccess) {
      toast.success('Working hour updated');
    }
  }, [isMutationSuccess]);

  useEffect(() => {
    if (isMutationError) {
      if (mutationError instanceof Error) {
        toast.error(mutationError.message);
      } else if (Array.isArray(mutationError)) {
        (mutationError as BadRequestError[]).forEach(err => {
          switch(err.name) {
            case 'day': return setDayError(err.message);
            case 'open': return setOpenError(err.message);
            case 'close': return setCloseError(err.message);
          }
        })
      } else {
        toast.error('An error occured');
      }
    }
  }, [isMutationError, mutationError]);

  const onFormSubmit = () => {
    if (!dayValidity.valid) {
      setDayError('Invalid field');
    }

    if (!openValidity.valid) {
      setOpenError('Invalid field');
    }

    if (!closeValidity.valid) {
      setCloseError('Invalid field');
    }

    if (dayValidity.valid && openValidity.valid && closeValidity.valid) {
      mutate({ day, close, open });
    }
  }

  return (
    <>
      <PageHeader text="Edit Working Hour" />

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
            <SelectField 
              id="day-input"
              label="Day"
              options={DAYS.map(day => ({ text: day, value: day }))}
              value={day}
              error={dayError}
              setValue={(v) => setDay(v as DaysOfWeekType)}
              setValidity={setDayValidity}
            />

            <InputField 
              id="open-input" 
              label="Opening hour" 
              type="time"
              value={open} 
              error={openError}
              setValue={setOpen} 
              setValidity={setOpenValidity} 
            />

            <InputField 
              id="close-input" 
              label="Closing hour" 
              type="time"
              value={close} 
              error={closeError}
              setValue={setClose} 
              setValidity={setCloseValidity} 
            />

            <FormButton disabled={isMutationLoading} />
          </Form>
        )
      }

    </>
  );
}
