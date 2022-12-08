import styled from "styled-components";

const Container = styled.div<CircleProps>`
  background-color: ${(props) => props.bgColor};
  width: 200px;
  height: 200px;
`; //circle은 태그가 아니라 스타일임

//const x = (a:number, b:numver) => a+b 대신 interface를 통해 object shape을 알려줌
//App.tsx에 이어 Circle에서도 prop을 보내고(styled-component의 prop과 component의 prop은 대개 다름), 동일하게 shape을 알려줘야 함

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;
