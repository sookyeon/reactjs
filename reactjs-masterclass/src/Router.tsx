//Router.tsx에서 모든 route을 설계함
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    //path를 /로 설정하면 해당하는 페이지가 호출되지 않음. 왜?
    //:는 url 내에 파라미터를 쓴다는 의미임
    <BrowserRouter>
      <Switch>
        <Route path="/coins">
          <Coins />
        </Route>
        <Route path="/:coinid">
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
