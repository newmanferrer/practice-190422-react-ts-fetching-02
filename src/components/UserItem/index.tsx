import { user } from '../../models';
import { LiStyled, H3Styled, H4Styled, ButtonsWrapper, ButtonStyled } from './StyledComponents';
import { COLORS } from '../../colors';

interface UserItemProps {
  user: user;
  setUserToEdit: React.Dispatch<React.SetStateAction<null | user>>;
  setIsUpdatePut: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteUser: (id: string) => void;
}

export const UserItem = ({ user, setUserToEdit, setIsUpdatePut, handleDeleteUser }: UserItemProps) => {
  const { id, name, username, email } = user;

  return (
    <LiStyled>
      <H3Styled>{name}</H3Styled>
      <H4Styled>{id}</H4Styled>
      <H4Styled>{username}</H4Styled>
      <H4Styled>{email}</H4Styled>

      <ButtonsWrapper>
        <ButtonStyled
          onClick={() => {
            setUserToEdit(user);
            setIsUpdatePut(true);
          }}
        >
          Update Put
        </ButtonStyled>
        <ButtonStyled
          onClick={() => {
            setUserToEdit(user);
            setIsUpdatePut(false);
          }}
        >
          Update Patch
        </ButtonStyled>
        <ButtonStyled colorHover={COLORS.white} bgHover={COLORS.error} onClick={() => handleDeleteUser(id)}>
          Delete
        </ButtonStyled>
      </ButtonsWrapper>
    </LiStyled>
  );
};
