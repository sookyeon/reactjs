//URL에 파리미터를 쓰기 위해서는 useParams hook을 써야 한다.
//useParams 설정은 호출되는 tsx 파일 내에서 함
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  font-size: 24px;
`;

interface RouteParams {
  coinid: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinid } = useParams<RouteParams>(); //URL에 파라미터를 넣기 위해 반드시 필요함
  const { state } = useLocation<RouteState>(); //link state을 쓰기 위해 useLocation hook을 써야함
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
    </Container>
  );
}
export default Coin;
