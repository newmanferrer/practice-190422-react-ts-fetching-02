import { useEffect, useState } from 'react';
import { SearchFormProvider } from './contexts';
import { ApiEndPoints } from './services';
import { user, userPartial, usersArray } from './models';
import { GlobalStyles, Title, UsersList, UserForm, Loader, Message, SearchForm } from './components';

const usersInitialState: usersArray | [] = [];
const errorInitialState: null | string = null;

export const App = () => {
  const [users, setUsers] = useState<usersArray | []>(usersInitialState);
  const [userToEdit, setUserToEdit] = useState<null | user>(null);
  const [isUpdatePut, setIsUpdatePut] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(errorInitialState);

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    ApiEndPoints.getAllUsers()
      .then(response => {
        const { data, reason } = response;
        if (reason.message) throw new Error(reason.message);
        else setUsers(data!);
      })
      .catch(error => {
        if (error.message === 'Failed to fetch') error.message = 'ERROR: Server Connection Refuse, try again later';
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateUser = (newUser: user) => {
    setIsLoading(true);
    setError(null);
    ApiEndPoints.createUser(newUser)
      .then(user => setUsers([...users, user]))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUserPut = (userUpdatePut: user) => {
    setIsLoading(true);
    setError(null);
    ApiEndPoints.updateUserPut(userUpdatePut)
      .then(response => {
        const newUsers = users.map(user => (user.id === response.id ? response : user));
        setUsers(newUsers);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUserPatch = (userUpdatePatch: userPartial) => {
    setIsLoading(true);
    setError(null);
    ApiEndPoints.updateUserPatch(userUpdatePatch)
      .then(response => {
        const newUsers = users.map(user => (user.id === response.id ? response : user));
        setUsers(newUsers);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteUser = (id: string) => {
    setIsLoading(true);
    setError(null);
    const isConfirm = confirm(`The user with id: "${id}", will be deleted`);
    if (isConfirm) {
      try {
        ApiEndPoints.deleteUser(id);
        const newUsers = users.filter(user => user.id !== id);
        setUsers(newUsers);
      } catch (error) {
        console.error(`ERROR: handleDeleteUser -> ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <GlobalStyles />
      <Title text='Fetching of Data: Fetch Api (Async/ Await)' />
      <SearchFormProvider>
        <UserForm
          userToEdit={userToEdit}
          setUserToEdit={setUserToEdit}
          isUpdatePut={isUpdatePut}
          handleCreateUser={handleCreateUser}
          handleUpdateUserPut={handleUpdateUserPut}
          handleUpdateUserPatch={handleUpdateUserPatch}
        />
        {isLoading && <Loader />}
        {error && <Message text={error} />}
        {!error && <SearchForm />}
        {!error && users && users.length > 0 && (
          <UsersList
            users={users}
            setUserToEdit={setUserToEdit}
            setIsUpdatePut={setIsUpdatePut}
            handleDeleteUser={handleDeleteUser}
          />
        )}
      </SearchFormProvider>
    </>
  );
};
