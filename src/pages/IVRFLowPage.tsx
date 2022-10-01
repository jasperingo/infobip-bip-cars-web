import React, { ReactNode, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { IVRFLowApi } from '../api/ivr-flow-api';
import { ErrorContent } from '../components/ErrorContent';
import { Form } from '../components/Form';
import { FormButton } from '../components/FormButton';
import { defaultValidity, InputField } from '../components/InputField';
import { Loading } from '../components/Loading';
import { PageHeader } from '../components/PageHeader';
import { BadRequestError } from '../models/bad-request-error';

const IVRFlowOptionItem = ({ text, children }: { text: string; children: ReactNode; }) => {
  return (
    <li>
      <div className="font-bold mb-2">{ text }</div>
      <div className="pl-4">
        { children }
      </div>
    </li>
  );
}

export const IVRFLowPage = () => {
  const { isLoading, error, data, isSuccess } = useQuery('ivr-flow', IVRFLowApi.getOne);

  const { 
    mutate, 
    isError: isMutationError, 
    isLoading: isMutationLoading, 
    error: mutationError, 
    isSuccess: isMutationSuccess 
  } = useMutation(IVRFLowApi.update);

  const [welcomeMessage, setWelcomeMessage] = useState('');
  
  const [welcomeMessageError, setWelcomeMessageError] = useState('');

  const [welcomeMessageValidity, setWelcomeMessageValidity] = useState(defaultValidity);

  const [productsUrl, setProductsUrl] = useState('');
  
  const [productsUrlError, setProductsUrlError] = useState('');

  const [productsUrlValidity, setProductsUrlValidity] = useState(defaultValidity);

  const [workingHoursUrl, setWorkingHoursUrl] = useState('');
  
  const [workingHoursUrlError, setWorkingHoursUrlError] = useState('');

  const [workingHoursUrlValidity, setWorkingHoursUrlValidity] = useState(defaultValidity);

  const [customerCarePhoneNumber, setCustomerCarePhoneNumber] = useState('');
  
  const [customerCarePhoneNumberError, setCustomerCarePhoneNumberError] = useState('');

  const [customerCarePhoneNumberValidity, setCustomerCarePhoneNumberValidity] = useState(defaultValidity);

  useEffect(() => {
    if (isSuccess) {
      setWelcomeMessage(data.script[0].say);
      setProductsUrl(data.script[3].case[1][0].request);
      setWorkingHoursUrl(data.script[3].case[2][0].request);
      setCustomerCarePhoneNumber(data.script[3].case[3][1].dial);
    }
  }, [isSuccess, data]);

  
  useEffect(() => {
  if (isMutationSuccess) {
      toast.success('IVR flow updated');
    }
  }, [isMutationSuccess]);

  useEffect(() => {
    if (isMutationError) {
      if (mutationError instanceof Error) {
        toast.error(mutationError.message);
      } else if (Array.isArray(mutationError)) {
        (mutationError as BadRequestError[]).forEach(err => {
          switch(err.name) {
            case 'welcomeMessage': return setWelcomeMessageError(err.message);
            case 'productsUrl': return setProductsUrlError(err.message);
            case 'workingHoursUrl': return setWorkingHoursUrlError(err.message);
            case 'customerCarePhoneNumber': return setCustomerCarePhoneNumberError(err.message);
          }
        })
      } else {
        toast.error('An error occured');
      }
    }
  }, [isMutationError, mutationError]);
  
  const onFormSubmit = () => {
    if (!welcomeMessageValidity.valid) {
      setWelcomeMessageError('Invalid field');
    }

    if (!productsUrlValidity.valid) {
      setProductsUrlError('Invalid field');
    }

    if (!workingHoursUrlValidity.valid) {
      setWorkingHoursUrlError('Invalid field');
    }

    if (!customerCarePhoneNumberValidity.valid) {
      setCustomerCarePhoneNumberError('Invalid field');
    }

    if (welcomeMessageValidity.valid && productsUrlValidity.valid && workingHoursUrlValidity.valid && customerCarePhoneNumberValidity.valid) {
      mutate({ welcomeMessage, productsUrl, workingHoursUrl, customerCarePhoneNumber });
    }
  }

  return (
    <>
      <PageHeader text="IVR Flow" />

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
          <Form disabled={isMutationLoading} onSubmit={onFormSubmit} fullWidth>
            <InputField 
              id="welcome-message-input" 
              label="Welcome message" 
              value={welcomeMessage} 
              error={welcomeMessageError}
              setValue={setWelcomeMessage} 
              setValidity={setWelcomeMessageValidity} 
            />

            <ul>
              <IVRFlowOptionItem text="1. For product list">
                <InputField 
                  type="url"
                  id="products-url-input" 
                  label="Products URL" 
                  value={productsUrl} 
                  error={productsUrlError}
                  setValue={setProductsUrl} 
                  setValidity={setProductsUrlValidity} 
                />
              </IVRFlowOptionItem>

              <IVRFlowOptionItem text="2. For working hours">
                <InputField 
                  type="url"
                  id="working-hours-url-input" 
                  label="Working hours URL" 
                  value={workingHoursUrl} 
                  error={workingHoursUrlError}
                  setValue={setWorkingHoursUrl} 
                  setValidity={setWorkingHoursUrlValidity} 
                />
              </IVRFlowOptionItem>

              <IVRFlowOptionItem text="3. To speak to a customer care agent">
                <InputField 
                  type="tel"
                  id="customer-care-phone-number-input" 
                  label="Customer care phone number" 
                  value={customerCarePhoneNumber} 
                  error={customerCarePhoneNumberError}
                  setValue={setCustomerCarePhoneNumber} 
                  setValidity={setCustomerCarePhoneNumberValidity} 
                />
              </IVRFlowOptionItem>
            </ul>

            <FormButton disabled={isMutationLoading} />
          </Form>
        )
      }

    </>
  );
}
