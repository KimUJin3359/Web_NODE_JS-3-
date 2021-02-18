# Web_NODE_JS-3-

### express와 DB 연동
- mysql2
  - mysql1버전에서 2로 변경됨
  - prmoise 방식을 리턴 받을 수 있는 node의 mysql 라이브러리
- [실습1](https://github.com/KimUJin3359/Web_NODE_JS-3-/blob/master/001.database/index.js)
  - mysql관련된 파일은 mysql폴더 안의 index.js를 만들어 설정을 해 줌
    - user : 해당 스키마에 권한이 부여된, 사용할 ID
    - database : 사용할 스키마(데이터베이스)
    - module.exports = { pool };을 사용해서 외부에서 모듈을 사용할 수 있게 만들어 줌
  - 본 디렉토리의 index.js에서는 const { pool } = require("./mysql");을 사용해 모듈을 받아와줌    
  - app.use(express.urlencoded({ extended : false }));
    ` 미들웨어의 여러 옵션 중에 하나
    - false 값일 시, node.js에 기본으로 내장된 queryString를 사용
    - true 값일 시, 따로 설치가 필요한 npm qs 라이브러리를 사용
- 실습2 : [index.js](https://github.com/KimUJin3359/Web_NODE_JS-3-/blob/master/002.database/index.js), [index.ejs](https://github.com/KimUJin3359/Web_NODE_JS-3-/blob/master/002.database/views/index.ejs)
  - DB를 연동하여 할 일 목록을 만드는 작업
  - check box가 체크되었을 시, 해당 작업을 수행 한 것
  - 해당 작업을 추가, 수정, 삭제할 수 있음(DB 반영)
  - app.set("view engine", "ejs");
    - ejs파일을 사용해 html을 로딩함을 나타냄
  ![캡처(1)](https://user-images.githubusercontent.com/50474972/108365348-774aea00-723a-11eb-9937-cd248526e4df.JPG)
  ![캡처(2)](https://user-images.githubusercontent.com/50474972/108365439-90539b00-723a-11eb-9aa1-a0bd33d8673f.JPG)

### Sequelizer
- ORM(Object Relational Mapping)
  - 객체와 관계형 데이터베이스의 관계를 매핑 해주는 도구
  - 재사용 및 유지보수의 편리성 증가
  - DBMS에 대한 종속성이 줄어듬
  - 장점
    - DBMS에 대한 종속성이 줄어듬
    - 쿼리대신 직관적인 코드로 데이터를 조작할 수 있음
    - 재사용 및 유지보수의 편리성 증대
  - 단점
    - 프로젝트가 복잡해질수록 난이도가 올라감
    - 설계의 어려움
- Sequelize
  - Node에서 사용하는 ORM
  - query문을 사용하지 않음
- Sequelize 기본 세팅
  - config 폴더 안의 config.json을 만들어 설정해 줌
    - developement 사용
    - database : 사용할 스키마
    - host : DB의 주소
    - dialect : 사용할 DB 주소
- Sequelize 명령어
  - npx sequelize-cli db:create
    - DB(Schema) 생성하는 명령어
    - config.json의 database 명칭대로 database 생성
  - npx sequelize-cli model:generate --name ${table이름} --attributes ${column이름}:${변수형},...
    - 모델 생성 명령어
    - attribute 띄어쓰기 X
    - ex) npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string
  - npx sequelize-cli db:migrate --env development
    - 모델의 내용을 DB로 옮기는 명령어
  - npx sequelize-cli seed:generate --name ${table이름}
    - 데이터를 입력할 seeders 파일 생성
  - npx sequelize-cli db:seed:all
    - 입력한 데이터를 Table로 옮김
- 실습4 : [index.js](https://github.com/KimUJin3359/Web_NODE_JS-3-/blob/master/004.sequelizer/index.js), [seeders_order_list.js](https://github.com/KimUJin3359/Web_NODE_JS-3-/blob/master/004.sequelizer/seeders/20210218061211-order_list.js), [migration_create_order-lists.js](https://github.com/KimUJin3359/Web_NODE_JS-3-/blob/master/004.sequelizer/migrations/20210218060930-create-order-list.js)
  - ORDER_LIST 생성하기
    - column : item(string), type(string)
    - 임의의 데이터 삽입
    - get, post, patch, delete(REST API) 기능
  - get
    ![캡처_1_](https://user-images.githubusercontent.com/50474972/108370597-30f88980-7240-11eb-8c49-badb30668b7c.JPG)
  - post    
    ![캡처_2_](https://user-images.githubusercontent.com/50474972/108370601-3229b680-7240-11eb-9db6-ac892b96f4a4.JPG)
  - put    
    ![캡처_3_](https://user-images.githubusercontent.com/50474972/108370608-335ae380-7240-11eb-9b57-942451260e71.JPG)
  - patch    
    ![캡처_4_](https://user-images.githubusercontent.com/50474972/108370613-33f37a00-7240-11eb-8918-02d65f990a35.JPG)
    
### 파일 업로드
- 파일 전송
  - 이미지, 동영상 등은 형태, 쓰임새와 상관없이 모두 파일임
  - 0, 1로 구성
- File은 0과 1로 구성된 대량의 변수값을 보내는 것
- 데이터 전송 시 인코딩 방법(Form Enctype)
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain

### Multer Library
- HTTP Header
  - 클라이언트와 서버가 요청, 응답으로 부가적인 정보를 전송할 수 있게 해줌(압축, 인증, 캐시 등)
  - Content-Type
    - 표현 데이터의 형식에 대해서 나타냄
    - text/html; charset=utf-8
    - application/json
  - Content-Disposition
    - 컨텐츠의 기질/성향을 알려줌
    - 파일 다운로드를 처리하는 헤더
- Multer
  - 파일 업로드를 위한 Node.js 미들웨어
    - multipart/form-data를 처리하기 위한 라이브러리
- fs
  - stream
    - readFile은 파일 전체를 메모리에 올리기 떄문에 메모리 사용량이 큼
    - 큰 데이터를 가져올 때나 외부 소스로부터 한번씩 나눠 가져올 때 유용
  - createReadStream
    - 전체 파일을 지정한 크기의 chunk로 읽음
- adm-zip
  - 파일을 손쉽게 압축, 압축 풀기 할 수 있는 라이브러리
- 실습5 : [index.js](https://github.com/KimUJin3359/Web_NODE_JS-3-/blob/master/005.multer/index.js), [views_index.ejs](https://github.com/KimUJin3359/Web_NODE_JS-3-/blob/master/005.multer/views/index.ejs)
  - 파일을 다양한 방식을 통해 upload 및 download-

    
  
