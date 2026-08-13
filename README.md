# 🍸 AI Mixologist

사용자의 현재 기분과 선호 취향을 바탕으로 AI가 어울리는 음료를 추천해주는 웹 서비스입니다.

## 🔗 배포 URL

https://a1-3-flax.vercel.app/

## 📌 서비스 소개

AI Mixologist는 사용자의 현재 기분과 선호 재료 또는 취향을 입력받아
AI가 상황에 어울리는 음료를 추천해주는 웹 서비스입니다.

사용자는 자신의 기분과 취향을 입력하고 추천받기 버튼을 누르면
Gemini AI를 통해 맞춤형 음료 추천 결과와 레시피를 확인할 수 있습니다.

## 🎯 주요 기능

- 현재 기분 입력
- 선호 재료 및 취향 입력
- Gemini AI 기반 맞춤 음료 추천
- 추천 이유 및 레시피 출력
- 빈 입력값 검증
- AI API 오류 처리
- API 오류 발생 시 대체 추천 제공
- 모바일/태블릿/데스크톱 반응형 화면
- 서비스 소개 / AI 추천 / FAQ 섹션 제공

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
- google-genai SDK

### Deployment

- GitHub
- Vercel

## 📁 프로젝트 구조

```text
AI웹개발/
├── README.md
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── api/
    ├── recommend.py
    ├── requirements.txt
    └── README.md

    🔄 서비스 동작 방식
사용자가 현재 기분을 입력합니다.
사용자가 선호 재료 또는 취향을 입력합니다.
JavaScript가 입력값을 확인합니다.
fetch('/api/recommend')를 통해 Python 백엔드에 요청을 전달합니다.
Python Serverless Function이 Gemini API를 호출합니다.
Gemini가 사용자의 입력을 바탕으로 음료를 추천합니다.
백엔드가 추천 결과를 JSON 형태로 반환합니다.
JavaScript가 AI 추천 결과를 웹 화면에 표시합니다.
🤖 AI 기능
입력

사용자가 입력하는 정보:

현재 기분
선호 재료
음료 취향
출력
추천 음료
추천 이유
추천 레시피
실패 처리
현재 기분을 입력하지 않은 경우 입력 안내
Gemini API 오류 발생 시 오류 처리
API 요청에 실패할 경우 기본 추천 결과를 제공하는 fallback 처리
🔐 환경 변수 설정

Gemini API 키는 소스 코드에 직접 작성하지 않고 환경 변수로 관리합니다.

Vercel 프로젝트의 Environment Variables에 다음 환경 변수를 설정합니다.

GEMINI_API_KEY

API 키를 GitHub 저장소의 코드, README, 스크린샷 등에 직접 작성하지 않습니다.

API 키가 외부에 노출된 경우 기존 키를 즉시 폐기하고 새로운 키를 발급해야 합니다.

💻 로컬 개발 환경

프로젝트를 다운로드한 후 Python 패키지를 설치합니다.

pip install -r api/requirements.txt

백엔드 API는 Vercel Serverless Functions 환경에서 실행됩니다.

🚀 배포

GitHub 저장소와 Vercel 프로젝트를 연결하여 배포합니다.

GitHub의 main 브랜치에 변경사항을 push하면 Vercel에서 새로운 배포가 진행됩니다.

📱 반응형 지원

데스크톱, 태블릿, 모바일 화면에서 사용할 수 있도록 반응형 레이아웃을 적용했습니다.

Chrome 개발자 도구의 모바일 기기 화면을 이용하여 모바일 환경에서 화면과 AI 추천 기능이 정상적으로 동작하는 것을 확인했습니다.

📄 서비스 구성
서비스 소개

AI Mixologist의 목적과 주요 기능을 소개합니다.

AI 추천 받기

사용자의 현재 기분과 선호 재료 또는 취향을 입력하면
Gemini AI가 맞춤형 음료를 추천합니다.

FAQ

서비스 이용 방법과 관련된 자주 묻는 질문을 안내합니다.

👤 프로젝트 목적

본 프로젝트는 AI 코딩 도구와 생성형 AI API를 활용하여
실제로 사용 가능한 AI 웹 서비스를 구현하고 배포하는 것을 목표로 제작되었습니다.

📜 License

This project was created for educational purposes.

