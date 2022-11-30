//보고싶은 영화의 위시리스트가 있는 영화 소개 페이지 (css가 부가된))
import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState();
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((prev) => [toDo, ...prev]);
    setToDo("");
    console.log(toDos);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="내가 보고싶은 영화"
          value={toDo}
          onChange={onChange}
        ></input>
        <button>영화 추가하기</button>
      </form>
    </div>
  );
}

export default App;
