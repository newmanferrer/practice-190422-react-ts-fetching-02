import { ChangeEvent, useEffect } from 'react';
import { useSearchFormContext } from '../../contexts';
import { useForm } from '../../hooks';
import { FormStyled, InputStyled } from './StyledComponents';

const formInitialState = {
  search: ''
};

export const SearchForm = () => {
  const { form, handleChange } = useForm(formInitialState);
  const { setSearch } = useSearchFormContext();

  useEffect(() => {
    setSearch(form.search);
  }, [form.search, setSearch]);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled type='text' name='search' value={form.search} placeholder='search user...' onChange={handleChange} />
    </FormStyled>
  );
};
