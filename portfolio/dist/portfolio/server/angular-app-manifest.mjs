
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 12988, hash: 'afd26809a3130dc8721825c13da1098a522ddffb2f3721e2c2a407ff41ba627c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4995, hash: '64332c1f6bec7c45e1fbbcf2d6b1de0168fe90a58e57864ff354f66123bb663e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 50472, hash: '9345ac67316bf6cf4078394b354f47e4daa381cbccc567a7f7ff881271976de2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 50472, hash: '9345ac67316bf6cf4078394b354f47e4daa381cbccc567a7f7ff881271976de2', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'styles-YU4TAXL7.css': {size: 9731, hash: 'ONdi7qt8qPw', text: () => import('./assets-chunks/styles-YU4TAXL7_css.mjs').then(m => m.default)}
  },
};
