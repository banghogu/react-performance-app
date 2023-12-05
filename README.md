### 리액트 성능 개선 앱

<hr>

#### 프로젝트 기간 2023:12/04 - 2023:12/05
#### 프로젝트 목적 : 리액트 성능 향상
<hr>

#### 완성 페이지

![](blob:https://velog.io/52f411ec-b3e2-498d-8669-f7fffeeb3a60)


**프로젝트 설명 : jsonplaceholder를 이용하여 fake data를 받아오고, 이를 보여주는 왼쪽의 A컴포넌트와 오른쪽의 B컴포넌트는 기능적으로 유사하지만, 각 컴포넌트는 다른 성능을 보여준다.**
<hr>

#### 준비


먼저 리액트 성능을 측정하는 크롬 도구를 다운받는다.
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko&

![](blob:https://velog.io/ff51a8c5-a622-4aca-a993-eece53f0ffd2)

도구 설정 중 highlight에 체크하면 현재 리렌더링 되는 요소가 어떤 요소인지 표시해준다.

![](blob:https://velog.io/e4dccd24-6233-46de-9c4a-5c040445658b)
![](blob:https://velog.io/d940c8f2-a22b-4149-90f7-8b56284dfa26)

녹화 버튼을 누를 시 각 컴포넌트에 대해 성능을 측정해준다.

<hr>

#### 파일 구조 
![업로드중..](blob:https://velog.io/ae57fc9c-6119-40f6-b74f-cd01b1bb6ff8)


<hr>

#### 가짜 데이터 가져오기
![업로드중..](blob:https://velog.io/6a1fff90-b78d-48f1-bb30-466f8b682a20)

<hr>

#### 앱 구현하기
![업로드중..](blob:https://velog.io/ef32dc07-52a4-4e81-be3c-d1eb5cb2b2b2)
![업로드중..](blob:https://velog.io/b875de55-db6c-49ba-93b6-b19d38a9b2b0)
A컴포넌트처럼 전체를 리랜더링 하는것 보다 B컴포넌트 코드처럼 각 부분을 컴포넌트로 나눠서 리랜더링하는것이 성능적으로 좋아 보일 것이다.

![업로드중..](blob:https://velog.io/35e1cdbf-4675-4d97-a1aa-e9c14ccf3e4c)
하지만 정작 성능은 A컴포넌트가 B컴포넌트에 비해 훨신 더 나은 성능을 보여주고 있다.

그 이유는 현재 B 컴포넌트에 잘게 나눈 기능에 상관 없는 컴포넌트까지 전부 리랜더링 되기 때문에 하나의 컴포넌트에 모든 컴포넌트를 넣은 A보다 성능이 떨어지는 것이다.

<hr>

#### 해결하기
이러한 문제를 해결하기 위해 React.memo로 B 컴포넌트 요소들을 묶어준다.
![업로드중..](blob:https://velog.io/36603d8c-00ff-4c74-8c78-af6e632042f3)

React memo는 먼저 컴포넌트를 렌더링 한 뒤, 이전에 렌더링 된 결과와 비교하여 DOM 업데이트를 결정한다 만약 렌더링 결과가 이전과 다르다면, React는 DOM을 업데이트한다 
이 과정에서 만약 컴포넌트가 React.memo()로 둘러 쌓여 있다면, React는 컴포넌트를 렌더링하고 결과를 메모이징하는데 다음 렌더링이 일어날 때 렌더링하는 컴포넌트의 props가 같다면, React는 메모이징된 내용을 재사용하여 불필요한 리랜더링을 막아 필요한 부분의 컴포넌트만 리랜더링 하게 되어 성능이 향상된다.

이때 React memo는 얕은 비교를 통해 props 객체를 비교한다.
얕은 비교란 숫자, 문자열 등 원시 자료형은 값을 비교하고, 배열, 객체 등 참조 자료형은 값 혹은 속성을 비교하지 않고, 참조되는 위치를 비교한다.
![업로드중..](blob:https://velog.io/b05ea774-1f72-4b06-9e14-6201143c671c)

참조) 리액트가 리렌더링 되는 경우
- state 변경이 있을 때 
- 부모 컴포넌트가 렌더링 될 때
- 새로운 props이 들어올 때 
- shouldComponentUpdate에서 true가 반환될 때 
- forceUpdate가 실행될 때 



<hr>

#### 주의점
하지만 현재 react앱처럼 기능이 거의 같은 즉 props가 거의 같은 이 페이지에서는 react memo가 유용하겠지만 대부분의 컴포넌트에 대해 props가 다른 경우에는 어차피 대부분 요소들이 리랜더링 되기 때문에 확실히 성능 향상이 있는지는 직접 성능을 측정해보면서 적용해야 할 필요가 있다.


<hr>

#### 느낀점
같은 기능을 갖는 동일한 페이지일지라도 컴포넌트 구현 방식을 달리 하면, 성능이 달라진다는 것을 배웠다. 또한 React memo, 얕은 비교, 리액트가 언제 리렌더링 되는 경우에 대해 알 수 있었다.
