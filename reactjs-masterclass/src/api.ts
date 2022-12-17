//react query를 쓸 때, api fetcher function을 모아서 관리할 수 있는 ts 파일을 먼저 만들어줌

export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}

/* useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false); //async 함수 내에서 정의된 변수를 외부에서 쓰면 정의되지 않았다고 에러남
    })();
  }, []); */
