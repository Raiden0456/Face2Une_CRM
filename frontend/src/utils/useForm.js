import { useState } from 'react';

export default function useForm(initial) {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // Subscribe to some data
  /* const initialValues = Object.values(initial).join('');
  useEffect(() => {
    Runs when things we are watching change
    setInputs(initial);
  }, [initialValues]); */

  // Pass to 'onChange'
  function handleChange(e) {
    let { value, name, type } = e.target;

    // Prevent changin number to string
    if (type === 'number') {
      value = parseInt(value);
    }
    // For files
    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      // dynamic var + override the existing property
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // Returm the output from custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
