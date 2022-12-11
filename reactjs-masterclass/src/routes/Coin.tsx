//URL에 파리미터를 쓰기 위해서는 useParams hook을 써야 한다.
//useParams 설정은 호출되는 tsx 파일 내에서 함
import { useParams, useLocation, useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin-top: 100px;
  border-radius: 36px;
  box-shadow: -2px -2px 24px rgba(135, 218, 251, 0.6),
    2px 2px 24px rgba(135, 218, 251, 0.6);
  img {
    background-color: ${(props) => props.theme.bgColor};
    width: 75px;
    height: 75px;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.primaryColor};
  padding: 20px;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 32px;
  margin-top: 16px;
`;

const Loader = styled.div`
  font-size: 12px;
`;

const BoxContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(55, 55, 55, 1);
  padding: 10px 20px;
  width: 360px;
  height: 84px;
  border-radius: 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 20px;

  span {
    color: ${(props) => props.theme.infoColor};
    margin-bottom: 16px;
  }
  div {
    color: ${(props) => props.theme.primaryColor};
    font-size: 20px;
    font-weight: 600;
  }
`;

const Dec = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 72px;
  width: 400px;
  color: ${(props) => props.theme.infoColor};
`;

//prop을 사용할 때는 항상 타입 선언이 필요
//boolean 타입의 props도 어색할 뿐이지 익숙해지면 아무것도 아니야!
const Tab = styled.div<{ isActive: boolean }>`
  padding: 4px 48px;
  font-size: 18px;
  a {
    color: ${(props) =>
      props.isActive ? props.theme.primaryColor : props.theme.infoColor};
  }
`;

const TabContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(55, 55, 55, 1);
  padding: 10px 32px;
  width: 320px;
  height: 84px;
  border-radius: 10px;
`;

const Price = styled.div``;

const Chart = styled.div``;

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
  const [loading, setLoading] = useState<boolean>(true);
  //useRouteMatch는 특정 URL에 있는지 아닌지 판별해 boolean을 도출하는 hook
  const priceMatch = useRouteMatch("/:coinid/price");
  const chartMatch = useRouteMatch("/:coinid/chart");
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinid}
      `)
      ).json();
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinid}
      `)
      ).json();
      console.log(priceData);
      setcoinInfo(infoData);
      setcoinPrice(priceData);
      setLoading(false);
    })();
  }, [coinid]);

  return (
    <>
      <Loader>{loading ? "Loading..." : null}</Loader>
      <Header>
        <ImgContainer>
          <img src={`${coinInfo?.logo}`} />
        </ImgContainer>
        <Title>{state?.name || coinInfo?.name}</Title>
      </Header>
      <BoxContainer>
        <Box>
          <span>{`Price (1 ${coinInfo?.symbol})`}</span>
          <div>$ {coinPrice?.quotes.USD.price.toFixed(3)}</div>
        </Box>
        <hr
          style={{
            border: "1px solid #808080",
            width: "1",
            height: "72px",
          }}
        />
        <Box>
          <span>Price ($1)</span>
          <div>
            {coinPrice?.quotes.USD.price.toFixed(3)}
            &nbsp;
            {coinInfo?.symbol}
          </div>
        </Box>
      </BoxContainer>
      <TabContainer>
        {/* boolean 타입은 true or false를 판별할 수 있는 연산자와 함께 사용됨! */}
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinInfo?.id}/price`}>price</Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinInfo?.id}/chart`}>chart</Link>
        </Tab>
      </TabContainer>
      <Switch>
        <Route path="/:coinid/price">
          <Price />
        </Route>
        <Route path="/:coinid/chart">
          <Chart />
        </Route>
      </Switch>
    </>
  ); //콜론을 붙이면 굳이 변수 표식을 안붙여도 인식함
}
export default Coin;
