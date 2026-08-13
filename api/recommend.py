import os
import json
from http.server import BaseHTTPRequestHandler
from google import genai

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}

            mood = data.get('mood', '').strip()
            preference = data.get('preference', '').strip()

            # 1. 예외 처리: 빈 입력 검증
            if not mood:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': '기분을 입력해주세요.'}).encode('utf-8'))
                return

            # 2. API Key 검증
            api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
            if not api_key:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Gemini API 키가 설정되지 않았습니다.'}).encode('utf-8'))
                return

            client = genai.Client(api_key=api_key)
            prompt = (
                f"너는 전문 바텐더 및 음료 소믈리에야. "
                f"사용자의 현재 기분: '{mood}', 선호 재료/취향: '{preference}'. "
                f"이에 어울리는 음료 또는 칵테일 1가지를 추천하고 레시피와 추천 이유를 친절하게 작성해줘."
            )

            # 3. Gemini 1.5 Flash 모델 호출
            response = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt
            )

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'recommendation': response.text}).encode('utf-8'))

        except Exception as e:
            # 4. 예외 처리: API/서버 오류 발생시 안내
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': f'서버 오류가 발생했습니다: {str(e)}'}).encode('utf-8'))