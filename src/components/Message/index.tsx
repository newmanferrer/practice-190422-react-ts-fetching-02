import { MessageWrapper, MessageStyled } from './StyledComponents';

interface MessageProps {
  text: string;
}

export const Message = ({ text }: MessageProps) => {
  return (
    <MessageWrapper>
      <MessageStyled>{text}</MessageStyled>
    </MessageWrapper>
  );
};
