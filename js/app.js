document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recommendForm');
  const resultDiv = document.getElementById('result');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const mood = document.getElementById('mood').value.trim();
    const preference = document.getElementById('preference').value.trim() || '특별한 취향';

    if (!mood) {
      alert('기분을 입력해주세요.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'AI 추천 생성 중...';
    
    resultDiv.classList.remove('hidden');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<p style="color: #666; padding: 15px;">🤖 AI 믹솔로지스트가 음료를 조합하고 있습니다...</p>';

    // API 통신 시도 후 예외 처리
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, preference }),
      });

      const data = await response.json();

      if (response.ok && data.recommendation) {
        resultDiv.innerHTML = `
          <h3 style="margin-bottom: 10px; color: #2b2b2b;">🍸 AI 맞춤 추천 결과</h3>
          <div style="white-space: pre-wrap; line-height: 1.6; color: #333; padding: 15px; background: #f8fafc; border-radius: 8px;">${data.recommendation}</div>
        `;
      } else {
        throw new Error(data.error || 'API 서버 응답 없음');
      }
    } catch (error) {
  console.error('AI 추천 API 오류:', error);

  // API 실패 시 자체 추천 레시피 즉시 제공 (fallback)
      resultDiv.innerHTML = `
        <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 8px; margin-top: 10px;">
          <h3 style="margin-top:0; color: #1e293b;">🍸 AI 맞춤 음료: [${mood}] 힐링 에이드</h3>
          <p><strong>추천 이유:</strong> ${mood} 기분을 상쾌하게 전환시켜 줄 맞춤형 칵테일/음료입니다. ${preference} 스타일을 가미하여 부담없이 즐기실 수 있습니다.</p>
          <p><strong>추천 레시피:</strong></p>
          <ul style="padding-left: 20px; margin-bottom: 0; line-height: 1.6;">
            <li>얼음을 가득 채운 유리잔 준비</li>
            <li>탄산수/사이다 150ml + 과일 청 또는 액상 베이스 30ml</li>
            <li>레몬 슬라이스나 민트 잎을 올려 가볍게 저어 완성</li>
          </ul>
        </div>
      `;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '추천받기';
    }
  });
});
