export const headers = new Headers();
headers.set('Content-Type', 'application/json;charset=UTF-8');

async function fetchJson(request: Request): Promise<any> {
  let result = {};

  try {
    const response = await fetch(request);
    if (response.ok) {
      if (response.status === 204) {
        return;
      }
      result = await response.json();
      return result;
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface QueryParams {
  [key: string]: string | boolean | number;
}

async function query(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, params: QueryParams = {}, body: any = null): Promise<any> {
  const url = path + generateSearch(params);

  const init: RequestInit = { headers, method };
  if (body !== null) {
    init.body = JSON.stringify(body);
  }

  const req = new Request(url, init);
  try {
    const response = await fetchJson(req);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function generateSearch(params: QueryParams): string {
  const search = Object.keys(params).map((key: string) => `${key}=${params[key]}`).join('&');
  return search.length ? `?${search}` : '';
}

export async function post(path: string, params: QueryParams = {}, body: any): Promise<any> {
  return query('POST', path, params, body);
}

export async function put(path: string, params: QueryParams = {}, body: any): Promise<any> {
  return query('PUT', path, params, body);
}

export async function get(path: string, params: QueryParams = {}): Promise<any> {
  return query('GET', path, params);
}

export async function remove(path: string, params: QueryParams = {}): Promise<any> {
  return query('DELETE', path, params);
}

export default {
  get,
  post,
  put,
  remove
};
