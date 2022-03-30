import React, { useState, useCallback, useMemo } from 'react'

type FormProps<FormType> = FormType

export const useForm = <FormType>(initialValues: FormProps<FormType>) => {
  const [formValues, setFormValues] = useState<FormType>(initialValues);

  const updateFormValues = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target
      setFormValues((prevState: FormType) => ({ ...prevState, [name]: value }))
    },
    []
  )

  const clearFormValues = useCallback(() => {
    setFormValues(initialValues)
  }, [])

  return useMemo(() => ({ formValues, updateFormValues, clearFormValues }), [formValues]);
}