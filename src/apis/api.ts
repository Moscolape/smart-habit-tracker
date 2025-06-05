export const devURL = import.meta.env.VITE_DEVELOPMENT_URL;
export const prodURL = import.meta.env.VITE_PRODUCTION_URL;

type METHODS = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export async function makeApiRequest(
  url: string,
  method: METHODS,
  body?: object,
  token?: string
) {
  interface Options extends RequestInit {
    method: string;
    headers: HeadersInit;
    body?: string;
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: Options = {
    method,
    headers,
  };

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    options.body = JSON.stringify(body);
  }

  const baseUrl = import.meta.env.MODE === "production" ? prodURL : devURL;

  const response = await fetch(baseUrl + url, options);
  const data = await response.json();

  return data;
}
