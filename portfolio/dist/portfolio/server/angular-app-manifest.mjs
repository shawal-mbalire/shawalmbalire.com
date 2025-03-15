
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
    "route": "/new_exp"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 29188, hash: 'bbe8ed47410f3f20ae744f150a4ecaf6841eef9e4110d84b8a859a64b4f549af', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22183, hash: '953faed7aa57ee8a53d6e2b9c9e797ce0c677448919c93074217fa107c205613', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'new_exp/index.html': {size: 66443, hash: '5c1982985a3f419255ad8ce8a3769e4be290df1b140b68cbf53ef4c478ca8b68', text: () => import('./assets-chunks/new_exp_index_html.mjs').then(m => m.default)},
    'index.html': {size: 66443, hash: '5c1982985a3f419255ad8ce8a3769e4be290df1b140b68cbf53ef4c478ca8b68', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-CDNTH6Z3.css': {size: 8592, hash: 't+tW2+TDZ3A', text: () => import('./assets-chunks/styles-CDNTH6Z3_css.mjs').then(m => m.default)}
  },
};
