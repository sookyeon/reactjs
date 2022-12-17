import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api"; //리액트쿼리를 이용해 데이터를 받아오기 위해 필요한 import

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
      color: ${(props) => props.theme.secondaryColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.primaryColor};
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
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);

  return (
    //&rarr은 html 특수문자를 입력하는 단축키임
    <Container>
      <Header>
        <Title>Coins</Title>
        {isLoading ? (
          "Loading..."
        ) : (
          <CoinList>
            {data?.slice(0, 100).map(
              (
                coin //undefined일 수 있다 : ?로 해결, useQuery에서 데이터 타입 명시 필요
              ) => (
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
              )
            )}
          </CoinList>
        )}
      </Header>
    </Container>
  );
}

export default Coins;
