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
  
  
