document.getElementById('recommend-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const mood = document.getElementById('mood').value.trim();
  const preference = document.getElementById('preference').value.trim();

  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error-msg');
  const resultEl = document.getElementById('result-box');

  // Reset UI
  errorEl.classList.add('hidden');
  resultEl.classList.add('hidden');

  // 예외 처리 1: 빈 입력 검증
  if (!mood) {
    errorEl.textContent = '현재 기분을 입력해주세요!';
    errorEl.classList.remove('hidden');
    return;
  }

  loadingEl.classList.remove('hidden');

  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, preference })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API 요청 중 오류가 발생했습니다.');
    }

    resultEl.textContent = data.result;
    resultEl.classList.remove('hidden');
  } catch (err) {
    // 예외 처리 2: API/네트워크 오류 안내
    errorEl.textContent = err.message;
    errorEl.classList.remove('hidden');
  } finally {
    loadingEl.classList.add('hidden');
  }
});