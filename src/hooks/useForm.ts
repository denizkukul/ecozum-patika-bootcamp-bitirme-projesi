import React, { useState, useCallback, useMemo } from "react"

type FormProps<FormType> = {
  defaultValues: FormType;
  initialValues?: FormType;
}

export const useForm = <FormType>(props: FormProps<FormType>) => {
  const [formValues, setFormValues] = useState<FormType>(props.initialValues ? props.initialValues : props.defaultValues);

  const updateFormValues = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target
      setFormValues((prevState: FormType) => ({ ...prevState, [name]: value }))
    },
    []
  )

  const clearFormValues = useCallback(() => {
    setFormValues(props.defaultValues)
  }, [])

  return useMemo(() => ({ formValues, updateFormValues, clearFormValues }), [formValues]);
}