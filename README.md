# 🍸 AI Mixologist

사용자의 현재 기분과 선호 취향을 바탕으로 AI가 어울리는 음료를 추천해주는 웹 서비스입니다.

## 🔗 배포 URL

[AI Mixologist 바로가기](https://a1-3-flax.vercel.app/)

---

## 📌 서비스 소개

**AI Mixologist**는 사용자의 현재 기분과 선호 재료 또는 취향을 입력받아 AI가 상황에 어울리는 음료를 추천해주는 웹 서비스입니다.

사용자는 자신의 기분과 취향을 입력하고 **추천받기** 버튼을 누르면 Gemini AI를 통해 맞춤형 음료 추천 결과와 레시피를 확인할 수 있습니다.

---

## 🎯 주요 기능

- 현재 기분 입력
- 선호 재료 및 취향 입력
- Gemini AI 기반 맞춤 음료 추천
- 추천 이유 및 레시피 출력
- 빈 입력값 검증
- AI API 오류 처리
- API 오류 발생 시 대체 추천 제공(Fallback)
- 모바일 / 태블릿 / 데스크톱 반응형 화면
- 서비스 소개 / AI 추천 / FAQ 섹션 제공

---

## 🛠 기술 스택

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Python
- Vercel Serverless Functions

### AI

- Google Gemini API
- `google-genai` SDK

### Deployment

- GitHub
- Vercel

---

## 📁 프로젝트 구조

```text
AI웹개발/
├── README.md
├── service_plan.md
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── api/
    ├── recommend.py
    ├── requirements.txt
    └── README.md
```

---

## 🔄 서비스 동작 방식

1. 사용자가 현재 기분을 입력합니다.
2. 사용자가 선호 재료 또는 취향을 입력합니다.
3. JavaScript가 입력값을 확인합니다.
4. `fetch('/api/recommend')`를 통해 Python 백엔드에 요청을 전달합니다.
5. Python Serverless Function이 Gemini API를 호출합니다.
6. Gemini AI가 사용자의 입력을 바탕으로 음료를 추천합니다.
7. 백엔드가 추천 결과를 JSON 형태로 반환합니다.
8. JavaScript가 AI 추천 결과를 웹 화면에 표시합니다.

### 전체 흐름

```text
사용자
  ↓
현재 기분 / 선호 취향 입력
  ↓
JavaScript
  ↓
fetch('/api/recommend')
  ↓
Python Serverless Function
  ↓
Gemini API
  ↓
AI 음료 추천 생성
  ↓
JSON 응답
  ↓
JavaScript
  ↓
추천 결과 화면 출력
```

---

## 🤖 AI 기능

### 입력

사용자가 입력하는 정보는 다음과 같습니다.

- 현재 기분
- 선호 재료
- 음료 취향

예시:

```text
현재 기분: 피곤함
선호 취향: 상큼함, 탄산
```

### AI 처리

사용자의 기분과 취향을 Python 백엔드에서 Gemini API에 전달합니다.

Gemini AI는 입력된 정보를 바탕으로 사용자의 상황에 적합한 음료 1가지를 추천하고, 추천 이유와 레시피를 생성합니다.

### 출력

AI가 생성하는 추천 결과에는 다음과 같은 내용이 포함됩니다.

- 추천 음료
- 추천 이유
- 추천 레시피

---

## ⚠️ 오류 및 예외 처리

### 빈 입력 처리

현재 기분은 필수 입력값으로 설정되어 있습니다.

사용자가 기분을 입력하지 않고 추천을 요청하면 다음과 같은 안내를 제공합니다.

```text
기분을 입력해주세요.
```

### Gemini API 오류 처리

Gemini API 호출 과정에서 오류가 발생하면 백엔드에서 오류를 처리하고 JSON 형태의 오류 메시지를 반환합니다.

### Fallback 처리

AI API 요청에 실패하는 경우에도 사용자가 빈 화면을 보지 않도록 프론트엔드에서 기본 음료 추천 결과를 제공하는 **Fallback 기능**을 적용했습니다.

---

## 🔐 환경 변수 설정

Gemini API 키는 소스 코드에 직접 작성하지 않고 **환경 변수**로 관리합니다.

Vercel 프로젝트의 **Environment Variables**에 다음 환경 변수를 설정합니다.

```text
GEMINI_API_KEY
```

API 키는 다음 장소에 직접 작성하거나 공개하지 않습니다.

- GitHub 저장소
- 소스 코드
- `README.md`
- 스크린샷
- 공개 문서

API 키가 외부에 노출된 경우 기존 키를 폐기하고 새로운 API 키를 발급해야 합니다.

---

## 💻 로컬 개발 환경

프로젝트를 다운로드한 후 Python 패키지를 설치합니다.

```bash
pip install -r api/requirements.txt
```

백엔드 API는 Vercel Serverless Functions 환경에서 실행됩니다.

---

## 🚀 배포

GitHub 저장소와 Vercel 프로젝트를 연결하여 배포합니다.

GitHub의 `main` 브랜치에 변경사항을 `push`하면 Vercel에서 새로운 배포가 진행됩니다.

배포된 서비스:

[AI Mixologist](https://a1-3-flax.vercel.app/)

---

## 📱 반응형 지원

데스크톱, 태블릿, 모바일 화면에서 사용할 수 있도록 반응형 레이아웃을 적용했습니다.

Chrome 개발자 도구의 모바일 기기 에뮬레이션을 이용하여 다음 항목을 확인했습니다.

- 메뉴 표시
- 입력창 표시
- 추천 버튼 표시
- AI 추천 결과 표시
- 화면 폭에 따른 레이아웃 변화

---

## 📄 서비스 구성

### 1. 서비스 소개

AI Mixologist의 목적과 주요 기능을 소개합니다.

### 2. AI 추천 받기

사용자의 현재 기분과 선호 재료 또는 취향을 입력하면 Gemini AI가 맞춤형 음료를 추천합니다.

### 3. FAQ

서비스 이용 방법과 AI 추천 기능에 대한 자주 묻는 질문을 안내합니다.

---

## 🎯 프로젝트 목적

본 프로젝트는 **AI 코딩 도구와 생성형 AI API를 활용하여 실제로 사용 가능한 AI 웹 서비스를 구현하고 배포하는 것**을 목표로 제작되었습니다.

사용자의 입력을 받아 AI API와 연결하고, 생성된 결과를 웹 화면에 출력하는 전체 과정을 직접 구현했습니다.

---

## 📜 License

This project was created for educational purposes.
