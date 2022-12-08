import styled from "styled-components";

const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.bgColor};
  width: 200px;
  height: 200px;
  border-radius: 12px;
  border: 2px solid ${(props) => props.borderColor};
`; //circle은 태그가 아니라 스타일임

//const x = (a:number, b:numver) => a+b 대신 interface를 통해 object shape을 알려줌
//App.tsx에 이어 Circle에서도 prop을 보내고(styled-component의 prop과 component의 prop은 대개 다름), 동일하게 shape을 알려줘야 함

interface CircleProps {
  bgColor: string; //required props
  borderColor?: string; //optional props
  text?: string; //optional props
}

interface ContainerProps {
  bgColor: string; //required props
  borderColor: string; //required props
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container> //CircleProps에서는 optional인데 ContainerProps에서는 required이라면 undefined 상태일 때 밀어줄 기본값이 있어야 함
  );
}

export default Circle;
