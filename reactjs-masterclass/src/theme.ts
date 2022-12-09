import { DefaultTheme } from "styled-components";
//theme.ts에서 타입이 선언된 테마를 지정할 수 있음. 실질적으로 테마를 만드는 파일임.

export const lightTheme: DefaultTheme = {
  bgColor: "whitesmoke",
  textColor: "#111",
  btnColor: "whitesmoke",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#111",
  textColor: "white",
  btnColor: "gray",
};
