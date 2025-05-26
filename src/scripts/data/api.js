import CONFIG from "../config";

const ENDPOINTS = {
  ENDPOINT_REGISTER: `${CONFIG.BASE_URL}/register`,
  ENDPOINT_GET_DATA: `${CONFIG.BASE_URL}/your/endpoint/here`,
};

export async function register(data) {
  try {
    const fetchResponse = await fetch(ENDPOINTS.ENDPOINT_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await fetchResponse.json();

    return {
      ok: fetchResponse.ok,
      status: fetchResponse.status,
      error: response.error,
      message: response.message,
    };
  } catch (error) {
    console.error('Register error:', error);
    return {
      ok: false,
      status: 500,
      error: true,
      message: 'Network or server error',
    };
  }
}


export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}
