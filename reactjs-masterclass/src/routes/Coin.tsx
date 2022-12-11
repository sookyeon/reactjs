//URL에 파리미터를 쓰기 위해서는 useParams hook을 써야 한다.
//useParams 설정은 호출되는 tsx 파일 내에서 함
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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

interface InfoData {
  //key와 value를 가져오는 방법 : Object.keys()메소드
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    //object 타입의 경우 하위에 데이터가 더 존재하는 것이므로 그 하위 것을 직접적으로 써줘야 함. 데이터를 인터페이스에 뿌려주기 위해서 필요함
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
  const { coinid } = useParams<RouteParams>(); //URL에 파라미터를 넣기 위해 반드시 필요함
  const { state } = useLocation<RouteState>(); //link state을 쓰기 위해 useLocation hook을 써야함
  const [coinInfo, setcoinInfo] = useState<InfoData>(); //Typescript의 경우 fetch로 불러오는 데이터 각각의 type을 지정해주어야 함. {}은 빈 Object로 인식되므로 interface로 데이터 타입을 지정해줘야 함.
  const [coinPrice, setcoinPrice] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinid}
      `)
      ).json();
      console.log(infoData); //데이터가 Object인 것을 알 수 있음
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinid}
      `)
      ).json();
      console.log(priceData);
      setcoinInfo(infoData);
      setcoinPrice(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
        <div>{coinInfo?.description}</div>
        <div>{coinPrice?.quotes.USD.price}</div>
      </Header>
    </Container>
  );
}
export default Coin;
