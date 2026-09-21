interface Env {
  ASSETS: { fetch: (request: Request | string) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const prefix = '/connect/lit-example';

    if (url.pathname === prefix || url.pathname === `${prefix}/`) {
      url.pathname = '/';
    } else if (url.pathname.startsWith(`${prefix}/`)) {
      url.pathname = url.pathname.slice(prefix.length) || '/';
    }

    return env.ASSETS.fetch(new Request(url, request));
  },
};
