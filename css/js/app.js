document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recommendForm');
  const resultDiv = document.getElementById('result');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const mood = document.getElementById('mood').value.trim();
    const preference = document.getElementById('preference').value.trim();

    if (!mood) {
      alert('기분을 입력해주세요.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'AI 추천 생성 중...';
    resultDiv.classList.add('hidden');

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
          <h3>🍸 AI 추천 음료</h3>
          <div style="white-space: pre-wrap; margin-top: 10px; line-height: 1.6;">${data.recommendation}</div>
        `;
        resultDiv.classList.remove('hidden');
      } else {
        alert(data.error || '추천을 불러오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('서버와 통신 중 에러가 발생했습니다.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '추천받기';
    }
  });
});