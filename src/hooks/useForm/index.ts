import { useCallback, useReducer } from 'react';
import { action } from './models';

const formReducer = (state: any, action: action) => {
  switch (action.type) {
    case 'changeValue': {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value
      };
    }
    case 'setForm': {
      return action.payload;
    }
    case 'clearForm':
      return action.payload;
    default:
      return state;
  }
};

export const useForm = <Type extends Object>(initialStateForm: Type) => {
  const [form, dispatch] = useReducer(formReducer, initialStateForm);
  const setForm = useCallback((a: any) => dispatch({ type: 'setForm', payload: a }), []);
  const clearForm = useCallback(() => dispatch({ type: 'clearForm', payload: initialStateForm }), [initialStateForm]);
  const changeForm = useCallback(
    (name: string, value: string) => dispatch({ type: 'changeValue', payload: { name, value } }),
    []
  );
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    changeForm(name, value);
  };

  return {
    form,
    setForm,
    clearForm,
    handleChange
  };
};
