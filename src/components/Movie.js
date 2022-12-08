import PropTypes from "prop-types";
import styles from "./Movie.module.css";

Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function Movie({ coverImg, title, summary, genres }) {
  return (
    //module.css를 통해 className prop으로 css를 지정할 수 있음
    <div>
      <img src={coverImg} />
      <h2 className={styles.red}>{title}</h2>
      <p>{summary}</p>
      <ul>
        {genres.map(
          (
            g //map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
          ) => (
            <li key={g}>{g}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default Movie;
