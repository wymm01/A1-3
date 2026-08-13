document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recommendForm');
  const resultDiv = document.getElementById('result');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const mood = document.getElementById('mood').value;
    const preference = document.getElementById('preference').value;

    if (!mood) {
      alert('기분을 입력해주세요.');
      return;
    }

    // 버튼 상태 변경
    submitBtn.disabled = true;
    submitBtn.textContent = 'AI 추천 생성 중...';
    
    // 이전 결과 초기화
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<p style="color: #666;">🤖 AI가 음료를 조합하고 있습니다. 잠시만 기다려주세요...</p>';

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, preference }),
      });

      const data = await response.json();

      if (response.ok && data.recommendation) {
        resultDiv.innerHTML = `
          <h3 style="margin-bottom: 10px; color: #2b2b2b;">🍸 AI 맞춤 추천 결과</h3>
          <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">${data.recommendation}</div>
        `;
      } else {
        resultDiv.innerHTML = `<p style="color: red;">❌ 오류 발생: ${data.error || '추천을 불러오지 못했습니다.'}</p>`;
      }
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = '<p style="color: red;">❌ 서버와 통신 중 에러가 발생했습니다.</p>';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '추천받기';
    }
  });
});