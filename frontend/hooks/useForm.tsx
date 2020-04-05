import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({})

  const handleSubmit = event => {
    event.preventDefault();
    callback();
    setValues({});
  }

  const handleChange = event => {
    const { name, type, value } = event.target;
    const val = type === 'number' ? parseFloat(value) : value;
    event.persist();
    setValues(prevValues => ({
      ...prevValues,
      [name]: val
    }));
  }

  return {
    values,
    handleSubmit,
    handleChange,
  };
};

export default useForm;
