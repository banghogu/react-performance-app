### 리액트 성능 개선 앱

<hr>

#### 프로젝트 기간 2023:12/04 - 2023:12/05
#### 프로젝트 목적 : 리액트 성능 향상
<hr>

#### 완성 페이지

![image](https://github.com/banghogu/react-performance-app/assets/132210541/ad6ae661-7a3e-4616-829d-e700babf3b27)



**프로젝트 설명 : jsonplaceholder를 이용하여 fake data를 받아오고, 이를 보여주는 왼쪽의 A컴포넌트와 오른쪽의 B컴포넌트는 기능적으로 유사하지만, 각 컴포넌트는 다른 성능을 보여준다.**
<hr>

#### 준비


먼저 리액트 성능을 측정하는 크롬 도구를 다운받는다.
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko&

![image](https://github.com/banghogu/react-performance-app/assets/132210541/fee541a8-7131-4b1f-958f-850a1ae530d9)


도구 설정 중 highlight에 체크하면 현재 리렌더링 되는 요소가 어떤 요소인지 표시해준다.

![image](https://github.com/banghogu/react-performance-app/assets/132210541/a1c990f9-fd5f-45b7-b8a6-c19d6b06d76f)

![image](https://github.com/banghogu/react-performance-app/assets/132210541/80e6c1b6-782b-4941-8960-0c4f89b3d048)


녹화 버튼을 누를 시 각 컴포넌트에 대해 성능을 측정해준다.

<hr>

#### 파일 구조 
![image](https://github.com/banghogu/react-performance-app/assets/132210541/8f542931-ab55-4147-8149-f49b09236285)



<hr>

#### 가짜 데이터 가져오기
![image](https://github.com/banghogu/react-performance-app/assets/132210541/c0def604-7569-4353-be5c-d1a3f25c839f)


<hr>

#### 앱 구현하기
![image](https://github.com/banghogu/react-performance-app/assets/132210541/ee0454b8-a088-411d-ae6c-13fefe94f3cb)

![image](https://github.com/banghogu/react-performance-app/assets/132210541/cb0b255e-1195-483a-8d0c-5676cfeeafea)

A컴포넌트처럼 전체를 리랜더링 하는것 보다 B컴포넌트 코드처럼 각 부분을 컴포넌트로 나눠서 리랜더링하는것이 성능적으로 좋아 보일 것이다.

![image](https://github.com/banghogu/react-performance-app/assets/132210541/02197aff-b4b4-4e6b-bca9-d12637d5e0fb)

하지만 정작 성능은 A컴포넌트가 B컴포넌트에 비해 훨신 더 나은 성능을 보여주고 있다.

그 이유는 현재 B 컴포넌트에 잘게 나눈 기능에 상관 없는 컴포넌트까지 전부 리랜더링 되기 때문에 하나의 컴포넌트에 모든 컴포넌트를 넣은 A보다 성능이 떨어지는 것이다.

<hr>

#### 해결하기
이러한 문제를 해결하기 위해 React.memo로 B 컴포넌트 요소들을 묶어준다.
![image](https://github.com/banghogu/react-performance-app/assets/132210541/b9410149-8f5b-43f6-b551-06f63b1f9037)


React memo는 먼저 컴포넌트를 렌더링 한 뒤, 이전에 렌더링 된 결과와 비교하여 DOM 업데이트를 결정한다 만약 렌더링 결과가 이전과 다르다면, React는 DOM을 업데이트한다 
이 과정에서 만약 컴포넌트가 React.memo()로 둘러 쌓여 있다면, React는 컴포넌트를 렌더링하고 결과를 메모이징하는데 다음 렌더링이 일어날 때 렌더링하는 컴포넌트의 props가 같다면, React는 메모이징된 내용을 재사용하여 불필요한 리랜더링을 막아 필요한 부분의 컴포넌트만 리랜더링 하게 되어 성능이 향상된다.

이때 React memo는 얕은 비교를 통해 props 객체를 비교한다.
얕은 비교란 숫자, 문자열 등 원시 자료형은 값을 비교하고, 배열, 객체 등 참조 자료형은 값 혹은 속성을 비교하지 않고, 참조되는 위치를 비교한다.
![image](https://github.com/banghogu/react-performance-app/assets/132210541/e0ae6b5a-5b3e-41ce-b48f-7faf42c743fc)


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
