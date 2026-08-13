import os
import json
from http.server import BaseHTTPRequestHandler
from openai import OpenAI

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}

            mood = data.get('mood', '').strip()
            preference = data.get('preference', '').strip()

            if not mood:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': '기분을 입력해주세요.'}).encode())
                return

            api_key = os.environ.get("OPENAI_API_KEY")
            if not api_key:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'API 키 설정이 올바르지 않습니다.'}).encode())
                return

            client = OpenAI(api_key=api_key)
            prompt = f"사용자의 현재 기분: '{mood}', 선호 재료/취향: '{preference}'. 이에 어울리는 음료 또는 칵테일 1가지를 추천하고 레시피와 추천 이유를 친절하게 작성해줘."

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "너는 전문 바텐더 및 음료 소믈리에야."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500
            )

            result = response.choices[0].message.content

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'result': result}).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}).encode())