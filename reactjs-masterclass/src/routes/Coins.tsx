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
  display: flex;
  align-items: center;
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

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
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
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      console.log(json);
      setCoins(json.slice(0, 100));
      setLoading(false); //async 함수 내에서 정의된 변수를 외부에서 쓰면 정의되지 않았다고 에러남
    })();
  }, []);

  return (
    //&rarr은 html 특수문자를 입력하는 단축키임
    //Link는 형태적으로 a 태그와 같음.
    <Container>
      <Header>
        <Title>Coins</Title>
        {loading ? (
          "Loading..."
        ) : (
          <CoinList>
            {coins.map((coin) => (
              <Coin key={coin.id}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name }, //state은 페이지 이동이 이루어질 때 정보를 미리 건네주는 역할을 하므로 실제로 불러와야할 데이터가 로딩 중이더라도 state으로 받아온 것은 빠르게 띄울 수 있다
                  }}
                >
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Header>
    </Container>
  );
}

export default Coins;
