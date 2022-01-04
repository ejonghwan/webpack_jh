## 사용방법
1. eslint 설치
2. npx eslint --init 입력 후 설정파일.. 선택  (.eslintrc.js 파일 셋팅)
3. package.json scripts 에 추가..src파일을 모두 체크하겠다.  
   - "lint": "eslint src --fix"    <- 이건 명령어로 실행하고 싶을 때 
4. vscode 확장도구 eslint 설치
5. 커맨드+, 셋팅탭에 가서 사용자(전체), 작업(작업별로) 작업탭에서 우측 파일모양 클릭해서 setting.json 열기
6. 아래 설정 
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true 
    }
}

<!-- prettier 랑 같이 쓰고 싶을 때 -->
- 설치목록 prettire eslint-config-prettier eslint-plugin-prettier 
4. prettire eslint-config-prettier 설치해서 겹치는 부분 모두 삭제
5. rc 파일 extends에 추가 "extends": ["eslint:recommended", "plugin:prettier/recommended"],





<!-- 여기 아래는 init 하면 안해도 되는 것  -->
* 룰 설정은 여기  참고 https://eslint.org/docs/rules 
* 공식 사이트에 렌치표시가 있는 애들은 --fix 옵션으로 자동으로 수정가능 
ex)  npx eslint test.js --fix

* rules를 하나하나 설정하는 방법 외, 규칙을 미리 모아놓은 것을 Extensible Config 라고 하는데 이걸 가져다 쓰면 편함
eslint:recommended - 공식홈에 체크되어있는 애들만
airbnb - 에어비엔비 스퇄
standard - js 스퇄
<!-- 여기까지 -->


## 설치 
eslint
eslint-config-prettier   프리티어랑 겹치는 규칙을 제거하고 같이 쓸 수 있게 셋팅




## .eslintrc 개인적으로 셋팅할 때
module.exports = {
    // rules: {
    //     "no-unexpected-multiline": "error", // 필요없는 줄바꿈
    //     "no-extra-semi": "error", //필요없는 세미콜론
    // }

    /* rules를 하나하나 설정하는 방법 외, 
    규칙을 미리 모아놓은 것을 Extensible Config 라고 하는데 이걸 가져다 쓰면 편함 */
    extends: [
        "eslint:recommended", // 미리 만들어진 규칙 셋트.. 공식에 체크 되어있는 애들만
    ]
}
