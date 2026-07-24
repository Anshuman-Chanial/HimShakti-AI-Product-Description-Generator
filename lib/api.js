// A wrapper around fetch that automatically handles expired-session (401) responses
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    // We throw a special error so calling code can distinguish this from other failures
    const err = new Error("Session expired");
    err.isSessionExpired = true;
    throw err;
  }

  return response;
}