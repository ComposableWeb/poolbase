if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,t,c)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const n={uri:location.origin+s.slice(1)};return Promise.all(t.map(s=>{switch(s){case"exports":return a;case"module":return n;default:return e(s)}})).then(e=>{const s=c(...e);return a.default||(a.default=s),a})}))}}define("./sw.js",["./workbox-2ad0dd62"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"kdUzIyd2QNAoMXqOKpu2Z"},{url:"/_next/static/chunks/2b542f89329f367e5fcd156556bafeb7590ab3c1.3fa1ff3c343805b20cc2.js",revision:"9a74dacd037cb1318d3dc21248650e8d"},{url:"/_next/static/chunks/7e274b784aca288a2c7c85ef60b8a5e077832334.b014acb223f17d473f15.js",revision:"48434c74a135326eb3f579bedc136e18"},{url:"/_next/static/chunks/b79b4181.41961812e1e6fef03f2f.js",revision:"48b8dd932727053cbc656c52fb742411"},{url:"/_next/static/chunks/c439f4c8.6a1c407fe0b5b750f5e6.js",revision:"4855d29f28b3fe5f942aaf9aaabcf92f"},{url:"/_next/static/chunks/c5d567e1.27050f3200b90433efe3.js",revision:"1dcd13a313e28197e46e5a825b7ed8a7"},{url:"/_next/static/chunks/commons.a655e1af1274d21807dd.js",revision:"f9418cd463f6a695d4a8a190ac23cfb7"},{url:"/_next/static/chunks/framework.6543a014380450a4e683.js",revision:"8ddd8310e04e4139d418a698f1c2c54e"},{url:"/_next/static/kdUzIyd2QNAoMXqOKpu2Z/_buildManifest.js",revision:"bb9c063eb768092f5c1ec2e44e5521e8"},{url:"/_next/static/kdUzIyd2QNAoMXqOKpu2Z/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/kdUzIyd2QNAoMXqOKpu2Z/pages/_app.js",revision:"7ef38f1b85dfd4e675fe6c75add06420"},{url:"/_next/static/kdUzIyd2QNAoMXqOKpu2Z/pages/_error.js",revision:"dd9c00465c75a2d4a70b27cc24034368"},{url:"/_next/static/kdUzIyd2QNAoMXqOKpu2Z/pages/add-url.js",revision:"82c4b361386cf4ba0f31d47604ca5514"},{url:"/_next/static/kdUzIyd2QNAoMXqOKpu2Z/pages/index.js",revision:"117477187d1bb11c496a4d58208839fc"},{url:"/_next/static/runtime/main-1843b5b8cf76774091f2.js",revision:"53a8554fa5406626034c754b0ff3d226"},{url:"/_next/static/runtime/polyfills-1d90dd09410c73f40354.js",revision:"d53ab6cf0fbcc1a36a7d039d43c1ac61"},{url:"/_next/static/runtime/webpack-b65cab0b00afd201cbda.js",revision:"f5e6e2fca3144cc944812cfa3547f475"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
