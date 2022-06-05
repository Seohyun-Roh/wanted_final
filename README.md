# Wish Map

원티드 프리온보딩 코스 개인 과제입니다.

## 서비스 내용

가보고 싶은 장소를 기록해놓기 위한 지도 서비스입니다.   

평소 인터넷이나 SNS를 통해 맛집이나 가보고 싶은 장소를 발견해도 좋아요를 누른 후 깜빡하는 일이 많았고, 이런 경우를 방지하기 위해 해당 서비스를 개발하였습니다. 기능은 아래와 같습니다.

1. 키워드로 지도를 검색한 후 즐겨찾기 등록
2. 등록해놓은 장소 모아보기

## 개발 환경

### 사용 라이브러리

- react, react-router-dom, react-use, typescript, recoil
- react-kakao-maps-sdk, store

### 폴더 구조

```
├─assets
│  ├─images
│  └─svgs
├─hooks
│  └─state
├─routes
│  ├─Favorite
│  ├─Home
│  └─_shared
│      ├─GNB
│      ├─KakaoMap
│      └─PlaceCard
├─states
├─styles
│  ├─base
│  ├─constants
│  └─mixins
└─types
```

## 기능

### 키워드 검색, 즐겨찾기 등록

![search](https://user-images.githubusercontent.com/76952602/172031405-8f16e983-e710-41f9-b60c-d89acb15ab4c.gif)

- 키워드를 입력하면 관련된 정보들이 지도에 마커로 나타나고, 아래의 목록에서 즐겨찾기 버튼을 눌러 즐겨찾기를 등록할 수 있습니다.

### 즐겨찾기

![favorite](https://user-images.githubusercontent.com/76952602/172031423-110b3a2a-31e3-4e7f-a036-94c90f91c0e8.gif)

- 즐겨찾기 목록에서 위치 보기 버튼을 누르면 선택한 장소의 위치가 지도에 나타납니다.

### 장소 정보 검색

![placeInfo1](https://user-images.githubusercontent.com/76952602/172031605-4e36c2c1-2e11-475c-bb89-b7fd2fc41c71.gif)

![placeInfo2](https://user-images.githubusercontent.com/76952602/172031653-0a5ec27e-4738-4617-822b-8a981e144ee4.gif)

- 목록에서 정보 보기 버튼을 누르거나 지도의 마커를 클릭한 후 버튼을 누르면 해당 장소에 대한 자세한 정보가 있는 페이지로 이동합니다.

## 느낀 점

다른 과제와 병행하느라 온전히 시간을 쏟지 못한 것에 대한 아쉬움은 있으나 그래도 짧은 기간에 기본 기능을 구현해서 다행이라고 생각했습니다.   
이번 과제에서는 서버를 구축하지 못해 로컬 스토리지에 정보를 저장하고 가져와서 사용했지만 추후에는 서버도 함께 만들어 제대로 된 서비스로 발전시켜보고 싶습니다.   