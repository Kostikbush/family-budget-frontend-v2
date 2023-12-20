import { ApolloCache, DefaultContext, FetchResult, MutationFunctionOptions, OperationVariables } from '@apollo/client';
import { ChangeEventHandler, useRef, useState } from 'react';
import * as Yup from 'yup';
import { AnyObject, Maybe, ObjectSchema } from 'yup';

interface ValueType {
  [value: string]: undefined | string | null;
}

type UseForm = <T extends Maybe<AnyObject>>(
  values: ValueType,
  options?: { validateShema: ObjectSchema<T> },
) => [
  { [key: string]: string | null | undefined },
  ChangeEventHandler<HTMLInputElement>,
  (
    callback: (
      args: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined,
    ) => Promise<FetchResult<any>>,
  ) => void,
  ValueType | undefined | null,
  (data: { [key: string]: undefined | string | null }) => void,
];

export const useForm: UseForm = (values, options) => {
  const value = useRef<ValueType>(values);
  const [error, setError] = useState<ValueType | null>(null);

  const setAllValue = (data: ValueType) => {
    value.current = data;
    if (!error) return;

    let copyError = { ...error };
    Object.keys(data).map((key) => {
      copyError[key] = null;
    });

    setError(copyError);
  };

  const handleValue: ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    value.current[event.target.id] = event.target.value;
    if (!error) return;

    let copyError = { ...error };
    copyError[event.target.id] = null;

    setError(copyError);
  };

  const handleSubmit = async (
    callback: (
      options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined,
    ) => Promise<FetchResult<any>>,
  ) => {
    try {
      options?.validateShema.validateSync(value.current, { abortEarly: false });
      await callback();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: ValueType = {};
        error.inner.forEach((e) => {
          if (!e.path) return;

          errors[e.path] = e.message;
        });
        setError(errors);
      }
    }
  };

  return [value.current, handleValue, handleSubmit, error, setAllValue];
};
