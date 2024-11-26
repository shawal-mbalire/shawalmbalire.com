
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: new Map([
['index.csr.html', {size: 4243, hash: 'ac54ad128a0553c229fcc5bd9a8209e5268acb7950bc9de309e26002e1dec02e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 4294, hash: '602ff68861310e516126b37e3b81b8870f58cd3960625f4af862feb1344f6969', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['index.html', {size: 22905, hash: '1318ef9ef8eff5d0b307d8e4f3aa5bfe78336bb3304e205c1143bf694d45a1a2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}], 
['styles-TDYAX434.css', {size: 365, hash: 'pkufHG49psQ', text: () => import('./assets-chunks/styles-TDYAX434_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
