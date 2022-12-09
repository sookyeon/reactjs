//.d.ts는 타입선언 파일로, TS코드의 타입 추론을 돕는 파일이다. 때문에 스타일트 컴포넌트와 타입스크립트의 결합 -> Theme 생성을 돕기 위해 필요하다.
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string; //테마의 각 프로퍼티는 선언된 타입을 지켜야 한다.
    textColor: string;
    accentColor: string;
  }
}
