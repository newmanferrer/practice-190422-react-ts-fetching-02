import { useSearchFormContext } from '../../contexts';
import { user } from '../../models';
import { UserItem } from '../';
import { UlStyled } from './StyledComponents';

interface UserListProps {
  users: user[];
  setUserToEdit: React.Dispatch<React.SetStateAction<null | user>>;
  setIsUpdatePut: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteUser: (id: string) => void;
}

export const UsersList = ({ users, setUserToEdit, setIsUpdatePut, handleDeleteUser }: UserListProps) => {
  const { search } = useSearchFormContext();

  return (
    <UlStyled>
      {users
        .filter(
          user =>
            user.id.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
        .map(user => (
          <UserItem
            key={user.id}
            user={user}
            setUserToEdit={setUserToEdit}
            setIsUpdatePut={setIsUpdatePut}
            handleDeleteUser={handleDeleteUser}
          />
        ))}
    </UlStyled>
  );
};
