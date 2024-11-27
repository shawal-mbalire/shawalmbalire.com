
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
['index.csr.html', {size: 4266, hash: '9cdb118fecbde957b5306690a4a7979596ba7f61b3d14da614a97f9aafd9e09f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 4294, hash: 'eab937b6bd796a960e3be29f19664f8ca457d5e5752aac494152e7deb52ef2ee', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['index.html', {size: 28450, hash: '8c2dca393d665c10ee2c765eb1483ae22f4883d45184596b5c763257d95323f0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}], 
['styles-YWTKWIXQ.css', {size: 957, hash: 'Gh82omiFJ+s', text: () => import('./assets-chunks/styles-YWTKWIXQ_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
