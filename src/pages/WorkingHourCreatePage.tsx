import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WorkingHourApi } from '../api/working-hour-api';
import { Form } from '../components/Form';
import { FormButton } from '../components/FormButton';
import { defaultValidity, InputField } from '../components/InputField';
import { PageHeader } from '../components/PageHeader';
import { SelectField } from '../components/SelectField';
import { BadRequestError } from '../models/bad-request-error';
import { DAYS, DaysOfWeekType } from '../models/working-hour';

export const WorkingHourCreatePage = () => {
  const [day, setDay] = useState<DaysOfWeekType>('MONDAY');
  
  const [dayError, setDayError] = useState('');

  const [dayValidity, setDayValidity] = useState(defaultValidity);

  const [open, setOpen] = useState('');
  
  const [openError, setOpenError] = useState('');

  const [openValidity, setOpenValidity] = useState(defaultValidity);

  const [close, setClose] = useState('');
  
  const [closeError, setCloseError] = useState('');

  const [closeValidity, setCloseValidity] = useState(defaultValidity);

  const navigate = useNavigate();

  const { mutate, isLoading, error, isError, isSuccess } = useMutation(WorkingHourApi.create);

  useEffect(() => {
    if (isSuccess) {
      navigate('/working-hours');
      toast.success('Working hour added');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (Array.isArray(error)) {
        (error as BadRequestError[]).forEach(err => {
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
  }, [isError, error]);

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
      <PageHeader text="Add Working Hour" />
      
      <Form disabled={isLoading} onSubmit={onFormSubmit}>
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

        <FormButton disabled={isLoading} />
      </Form>
    </>
  );
}
