import CONFIG from "../config";

const ENDPOINTS = {
  ENDPOINT_REGISTER: `${CONFIG.BASE_URL}/register`,
  ENDPOINT_LOGIN: `${CONFIG.BASE_URL}/login`,
  ENDPOINT_STORY: `${CONFIG.BASE_URL}/stories`,
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

//get story data
export async function getStory() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        ok: false,
        status: 403,
        error: true,
        message: "Forbidden",
        listStory: [],
      };
    }

    const fetchResponse = await fetch(ENDPOINTS.ENDPOINT_STORY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await fetchResponse.json();
    console.log("API Response:", response);

    return {
      ok: fetchResponse.ok,
      status: fetchResponse.status,
      error: response.error,
      message: response.message,
      listStory: response.listStory ?? [],
    };
  } catch (error) {
    console.error("Get story error:", error);
    return {
      ok: false,
      status: 500,
      error: true,
      message: "Network or server error",
      listStory: [],
    };
  }
}

//create new story data
export async function createStory(formData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        ok: false,
        status: 403,
        message: "Unauthorized",
      };
    }

    const response = await fetch(ENDPOINTS.ENDPOINT_STORY, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      message: result.message || "Unknown error",
    };
  } catch (error) {
    console.error("createStory error:", error);
    return {
      ok: false,
      status: 500,
      message: "Network or server error",
    };
  }
}
