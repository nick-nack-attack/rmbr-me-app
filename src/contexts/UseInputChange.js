// Hook for easy to manage controlled form inputs.
import { useState } from 'react';

export const UseInputChange = (defaults = {}) => {

  // Set input object to store all edited input fields
  const [ input, setInput ] = useState(defaults);

  // Update our state, or create a new input property based on the input's name
  const handleInputChange = (e) => {
    // Checkboxes perform differently than inputs. Added a conditional to treat them differently
    if(e.currentTarget.type === 'checkbox'){
      setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.checked
      });
    } else {
      setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
      });
    }
  };

  return (
    [ input, handleInputChange ]
  );
  
};