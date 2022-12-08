//보고싶은 영화의 위시리스트가 있는 영화 소개 페이지 (css가 부가된))
import { useState, useEffect } from "react";
import Movie from "./components/Movie";

function App() {
  const [toDo, setToDo] = useState();
  const [toDos, setToDos] = useState([]);
  //API를 이용해 영화 리스트 가져오기
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return null; //if 조건을 걸고 함수를 kill
    }
    setToDos((prev) => [toDo, ...prev]); //state의 값 설정 중 array를 업데이트하는 방법(new)
    setToDo("");
  };
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      )
    ).json(); //async 함수 내에서 await으로 감싸면 프라미스가 처리될 때까지 기다렸다 반환합니다
    setMovies(json.data.movies);
    console.log(movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
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
      <ul>
        {toDos.map(
          (
            item,
            index //map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
          ) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>
      <hr />
      <h1>{loading ? "loading..." : "Movies"}</h1>
      <div>
        {movies.map(
          (
            movie //반복될 수 있는 요소는 컴포넌트로 빼서 관리합니다. 마스터 컴포넌트인거죠
          ) => (
            <Movie
              key={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
