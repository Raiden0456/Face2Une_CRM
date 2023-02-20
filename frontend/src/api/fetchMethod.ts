// To Be Changed
const buildUrl = (path: string) =>
  process.env.NODE_ENV === 'production' ? `/api/v1/${path}` : `http://localhost:3000/${path}`;

interface ISafeFetch {
  path: string;
  defaultConf: object;
}

const safeFetch = async ({ path, defaultConf }: ISafeFetch) => {
  try {
    return await fetch(buildUrl(path), defaultConf)
      .then((r) => r.json())
      .then((r) => r);
  } catch (e) {
    // alert('Error');
    // Technical Errors
  }
};

export const JSONFetch = async (path: string, body: object) => {
  const r = safeFetch({
    path,
    defaultConf: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Language: 'en_US',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    },
  });
  return r;
};

export const JSONFetchGet = async (path: string) =>
  safeFetch({
    path,
    defaultConf: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Language: 'en_US',
      },
      credentials: 'include',
    },
  });

export const JSONFetchDelete = async (path: string) =>
  safeFetch({
    path,
    defaultConf: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Language: 'en_US',
      },
      credentials: 'include',
    },
  });
