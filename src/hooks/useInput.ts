import { useState, ChangeEvent, useMemo } from 'react';

interface PatternInterface {
  email: RegExp;
  phone: RegExp;
  password: RegExp;
}

const PATTERN: PatternInterface = {
  email: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  phone: new RegExp(/[0-9]{1,11}/),
  password: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!_%*?&]{8,30}$/)
};

interface StateUseInputInterface {
  value: any;
  required: boolean;
  type: 'text' | 'email' | 'phone' | 'password' | 'checkbox' | 'number';
  pattern?: string;
}

export default function useInput({ value, required, type, pattern = '' }: StateUseInputInterface) {
  const setPattern: RegExp | string = useMemo(() => pattern && new RegExp(pattern), [pattern]);
  
  const [stateValue, setStateValue] = useState(value);
  const [errorState, setErrorState] = useState(false);
  const [errorText, setErrorText] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement> | string) => {
    if (type === 'phone') {
      setStateValue(event);
    } else if (typeof event === 'object') {
      const { type: eventType, checked: eventChecked, value: eventValue } = event.target;
      const setValue = eventType === 'checkbox' ? eventChecked : eventValue;

      setStateValue(setValue);
    }
    if (errorState) {
      setErrorState(false);
    }
  };

  const validator = (): boolean => {
    switch (type) {
      case 'text':
        if (required && !(stateValue as string).trim()) {
          return false;
        }

        return true;

      case 'email':
        if (
          (required || !(stateValue as string).trim()) &&
          !((setPattern as RegExp) || PATTERN[type]).test((stateValue as string).trim())
        ) {
          return false;
        }

        return true;

      case 'phone':
        if ((required || !(stateValue as string).trim()) && !((setPattern as RegExp) || PATTERN[type]).test(stateValue as string)) {
          return false;
        }

        return true;

      case 'password':
        return !((required || !(stateValue as string).trim()) && !((setPattern as RegExp) || PATTERN[type]).test(stateValue as string));

      case 'checkbox':
        if (required && !stateValue) {
          return false;
        }

        return true;

      default:
        return true;
    }
  };

  const resetError = () => {
    setErrorState(false);
  };

  const setError = () => {
    setErrorState(true);
  };

  return {
    bind: { value: stateValue, onChange },
    bindError: { error: errorState, errorText },
    bindStateAndError: { error: errorState, errorText, value: stateValue, onChange },
    value: stateValue,
    onChange,
    resetError,
    validator,
    setError,
    error: errorState,
    errorText,
    setErrorText,
    setValue: setStateValue
  };
}
