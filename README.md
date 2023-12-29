# Todo - API

## 판매자

- 예약 승인
  - 하루에 받을수 있는 투어 예약은 5건으로 자동 승인 [o]
  - 판매자는 추가로 예약 승인 가능 [o]
- 휴일 지정
  - 특정 요일 휴일 지정 가능 [o]
  - 하루 단위로 투어를 하지 않는 휴일 지정 가능 (ex: 매주 월요일 휴일, 3월 1일 휴일) [o]
- 토큰을 이용해 고객의 예약 여부 확인이 가능하며, 한번 승인한 토큰은 재사용 불가 [o]

## 고객

- 예약 조회
  - 월 단위로 예약이 가능한 일정 조회 [o]
  - 판매자가 휴일 정보를 수정하지 않는다면 캐시 정보 사용 [o]
- 예약 신청에 성공한 고객은 유일한 토큰 값을 승인의 결과값으로 획득 [o]
- 여행 3일전까지 예약 취소 가능 [o]

# 추가로 구현한 기능 및 디테일한 조건들

- 인증 기능(AuthN, AuthR)
  - 판매자와 고객이 사용할 수 있는 API가 다르기 때문에 위 인증 기능이 필요했고 어세스 토큰으로부터 user가 누구인지 id 값을 추출할 필요성이 있음
- Tour Content 생성 기능
  - 투어의 내용과 조건 등을 담은 Tour Content 생성
- Tour 생성 기능
  - Tour Content와 ManyToOne 관계로 각 날짜 별 투어의 정보름 담은 Tour 생성
  - 투어라는 것은 이벤트이고 행사이기 때문에 시작 날짜와 종료 날짜를 받아서 진행한다. 시스템적으로는 두 날짜를 받고 현재 시각 이후로 tour들을 대량 생산한다.
    - 여기서 추가로 해커가 악의적으로 몇년치 날짜를 입력하여 유사 Dos(서비스 거부 공격)을 해가지고 디비를 망가트릴 수 있어서 최대 3개월치만 생성할 수 있도록 제한함

# Server Start

1. `docker network create --gateway 172.19.0.1 --subnet 172.19.0.0/16 zumzum`
2. `docker-compose up`
3. `yarn run start:dev`

# DB Migration

1. `docker-compose up` to create database
2. `yarn run migration:run`

**DDL 작성 파일 위치**

- database/migrations

# Test

1. Unit Test
   `yarn run test:cov`
2. Integration Test
   `yarn run test:e2e:cov`

# 추가 주의 사항

- 당연히 .env 파일은 git 올리는게 아니지만 코딩 테스트이기 때문에 면접관의 테스트 편의상 .env 파일을 git 올림
- 노출되어도 상관 없는 테스트 정보들 뿐
