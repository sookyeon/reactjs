//react query를 쓸 때, api fetcher function을 모아서 관리할 수 있는 ts 파일을 먼저 만들어줌
const BASE_URL = "https://api.coinpaprika.com/v1";
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
/* useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const jso n = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false); //async 함수 내에서 정의된 변수를 외부에서 쓰면 정의되지 않았다고 에러남
    })();
  }, []); */

//coinid를 argument에 입력한다고 parameter의 coinid가 되나?
export function fetchCoinInfo(coinid: string) {
  return fetch(`${BASE_URL}/coins/${coinid}`).then((response) =>
    response.json()
  );
}

export function fetchCoinPrice(coinid: string) {
  return fetch(`${BASE_URL}/tickers/${coinid}`).then((response) =>
    response.json()
  );
}
