import React, { ReactFragment, useState } from "react";
import styled from "styled-components";
//css의 기본 세팅값을 초기화할 때, 전체 도규먼트에 적용될 스타일은 GlobalStyle
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css");
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box;
}`; //*는 css에서 모든 요소에 대해 적용하고 싶을 때 씀.

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    //event 인자의 타입이 any인데 any는 가급적 안나오는 게 좋음. 그래서 타입을 지정해줘야 함. 이 필요를 느끼는 것  까지가 배움의 영역인듯
    const {
      currentTarget: { value },
    } = event;
    setValue(value); //FormEvent에서 엘리먼트를 지정해주자 해결
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <div>{`Hi, ${value}.`}</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="텍스트를 입력해주세요"
          value={value}
          onChange={onChange}
        ></input>
        <button>로그인</button>
      </form>
    </>
  );
}

export default App;
