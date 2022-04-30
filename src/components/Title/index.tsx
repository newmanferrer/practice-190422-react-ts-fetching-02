import { TitleStyled } from './StyledComponents';

interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return <TitleStyled>{text}</TitleStyled>;
};
