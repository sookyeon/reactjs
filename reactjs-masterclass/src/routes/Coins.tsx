import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;
//여기에 쓰인 css 참고
const Coin = styled.li`
  background-color: white;
  margin-bottom: 12px;
  padding: 16px 56px 16px 56px;
  border-radius: 12px;
  a {
    color: ${(props) => props.theme.bgColor};
    display: block;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  font-size: 24px;
`;

interface CoinInterface {
  //Typescript라면 API를 fetch하기 전에 불러오는 각 데이터의 타입을 지정해줘야함
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  //useState hook에서 state의 type을 지정해줌. 배열 state이기 때문에 []도 붙음
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
    })();
  }, []);

  return (
    //&rarr은 html 특수문자를 입력하는 단축키임
    //Link는 형태적으로 a 태그와 같음.
    <Container>
      <Header>
        <Title>Coins</Title>
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinList>
      </Header>
    </Container>
  );
}

export default Coins;
