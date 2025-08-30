
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
    'index.csr.html': {size: 29314, hash: '20957316dfb0f6cf2bfdee016dc71e17d5c58e8958fc05d94a0c9e8b22caf0a0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22183, hash: 'be87b56eaaf3aa12536a0ab9a40b6f808e4cd838219cf7f8643e39788f0b554a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 66798, hash: '0a80978f4b27ab928f2012be3392e06494e1ff6da71ada19c46a988843002f16', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'index.html': {size: 66798, hash: '0a80978f4b27ab928f2012be3392e06494e1ff6da71ada19c46a988843002f16', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-L6RL7THV.css': {size: 8718, hash: 'uQMorehqfb0', text: () => import('./assets-chunks/styles-L6RL7THV_css.mjs').then(m => m.default)}
  },
};
