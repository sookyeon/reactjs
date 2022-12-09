//URL에 파리미터를 쓰기 위해서는 useParams hook을 써야 한다.
import { useParams } from "react-router-dom";
//useParams 설정은 호출되는 tsx 파일 내에서 함

interface RouteParams {
  coinid: string;
}

function Coin() {
  const { coinid } = useParams<RouteParams>();
  console.log({ coinid });
  return <h1>{coinid} Entered</h1>;
}

export default Coin;
