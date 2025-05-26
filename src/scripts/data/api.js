import CONFIG from "../config";

const ENDPOINTS = {
  ENDPOINT_REGISTER: `${CONFIG.BASE_URL}/register`,
  ENDPOINT_LOGIN: `${CONFIG.BASE_URL}/login`,
  ENDPOINT_GET_DATA: `${CONFIG.BASE_URL}/your/endpoint/here`,
};

//register
export async function register(data) {
  try {
    const fetchResponse = await fetch(ENDPOINTS.ENDPOINT_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Register error:", error);
    return {
      ok: false,
      status: 500,
      error: true,
      message: "Network or server error",
    };
  }
}

//login
export async function login(data) {
  try {
    const fetchResponse = await fetch(ENDPOINTS.ENDPOINT_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await fetchResponse.json();
    console.log("errornya:", response);

    return {
      ok: fetchResponse.ok,
      status: fetchResponse.status,
      error: response.error,
      message: response.message,
      loginResult: response.loginResult,
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      ok: false,
      status: 500,
      error: true,
      message: "Network or server error",
    };
  }
}

export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}
