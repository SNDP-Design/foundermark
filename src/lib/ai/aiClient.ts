const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callAIEndpoint(endpoint: string, payload: object) {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const statusCode = data.statusCode || response.status;
        const error = new Error(data.error || `Request failed: ${response.status}`);
        (error as any).statusCode = statusCode;

        if (attempt < MAX_RETRIES && RETRYABLE_STATUS_CODES.has(statusCode)) {
          const delay = BASE_DELAY_MS * Math.pow(2, attempt);
          console.warn(`Retrying AI request (attempt ${attempt + 1}/${MAX_RETRIES}) after ${delay}ms due to status ${statusCode}`);
          await sleep(delay);
          lastError = error;
          continue;
        }

        console.error('API Route Error:', {
          error: data.error,
          details: data.details,
        });
        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof Error && (error as any).statusCode && RETRYABLE_STATUS_CODES.has((error as any).statusCode) && attempt < MAX_RETRIES) {
        lastError = error;
        continue;
      }
      console.error('API request error:', error);
      throw error;
    }
  }

  throw lastError || new Error('Max retries exceeded');
}
