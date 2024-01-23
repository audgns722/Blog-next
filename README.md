# next-blog 만들기

## 셋팅 및 설치

```
npx create-next-app@latest .
npm install sass
npm install next-auth
npm install prisma
npm install @prisma/client
npm install @auth/prisma-adapter

```

```
npx prisma init --datasource-provider mongodb   // prisma 파일 생성
npx prisma generate                             // prisma 연결
npx prisma studio                               // prisma 화면
```

## 
context 전역변수상태관리