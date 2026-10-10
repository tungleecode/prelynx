var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var ne = Object.create;
var U = Object.defineProperty;
var re = Object.getOwnPropertyDescriptor;
var ae = Object.getOwnPropertyNames;
var oe = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var E = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "E");
var V = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ce = /* @__PURE__ */ __name((e, t, n, s) => {
  if (t && typeof t == "object" || typeof t == "function") for (let a of ae(t)) !ie.call(e, a) && a !== n && U(e, a, { get: /* @__PURE__ */ __name(() => t[a], "get"), enumerable: !(s = re(t, a)) || s.enumerable });
  return e;
}, "ce");
var q = /* @__PURE__ */ __name((e, t, n) => (n = e != null ? ne(oe(e)) : {}, ce(t || !e || !e.__esModule ? U(n, "default", { value: e, enumerable: true }) : n, e)), "q");
var x;
var u = E(() => {
  x = { collectedLocales: [] };
});
var _;
var l = E(() => {
  _ = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/(.*)$", has: [{ type: "header", key: "next-action", value: "70e41d696102e8524bdb54bf0b16f81a624b15e30f" }], transforms: [{ type: "request.headers", op: "set", target: { key: "x-server-action-name" }, args: "src/app/actions.ts#saveMockTestResult" }] }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/study(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "cc99d56e3f39471ae51a4ad58dc15050" }], middlewarePath: "middleware", middlewareRawSrc: ["/study/:path*"], override: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/practice(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "cc99d56e3f39471ae51a4ad58dc15050" }], middlewarePath: "middleware", middlewareRawSrc: ["/practice/:path*"], override: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/quest(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "cc99d56e3f39471ae51a4ad58dc15050" }], middlewarePath: "middleware", middlewareRawSrc: ["/quest/:path*"], override: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/store(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "cc99d56e3f39471ae51a4ad58dc15050" }], middlewarePath: "middleware", middlewareRawSrc: ["/store/:path*"], override: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/profile(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "cc99d56e3f39471ae51a4ad58dc15050" }], middlewarePath: "middleware", middlewareRawSrc: ["/profile/:path*"], override: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/plan(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "cc99d56e3f39471ae51a4ad58dc15050" }], middlewarePath: "middleware", middlewareRawSrc: ["/plan/:path*"], override: true }, { src: "^/(?<path>.+?)(?:/)?$", dest: "/$path.segments/$segmentPath.segment.rsc", has: [{ type: "header", key: "rsc", value: "1" }, { type: "header", key: "next-router-prefetch", value: "1" }, { type: "header", key: "next-router-segment-prefetch", value: "/(?<segmentPath>.+)" }], continue: true, override: true }, { src: "^/?$", dest: "/index.segments/$segmentPath.segment.rsc", has: [{ type: "header", key: "rsc", value: "1" }, { type: "header", key: "next-router-prefetch", value: "1" }, { type: "header", key: "next-router-segment-prefetch", value: "/(?<segmentPath>.+)" }], continue: true, override: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }, { src: "^/(?<path>.+)(?<rscSuffix>\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/$path.rsc", check: true }], rewrite: [{ src: "^/(?<path>.+)(?<rscSuffix>\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/$path.rsc", check: true, override: true }, { src: "^/api/auth/(?<nxtPnextauth>.+?)(?<rscSuffix>\\.rsc|\\.prefetch\\.rsc|\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/api/auth/[...nextauth]$rscSuffix?nxtPnextauth=$nxtPnextauth", check: true, override: true }, { src: "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$", dest: "/api/auth/[...nextauth]?nxtPnextauth=$nxtPnextauth", check: true, override: true }, { src: "^/study/(?<nxtPid>[^/]+?)(?<rscSuffix>\\.rsc|\\.prefetch\\.rsc|\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/study/[id]$rscSuffix?nxtPid=$nxtPid", check: true, override: true }, { src: "^/study/(?<nxtPid>[^/]+?)(?:/)?$", dest: "/study/[id]?nxtPid=$nxtPid", check: true, override: true }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|AhPctF1hGlRT2ZKmSyVOH)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404, headers: { "x-next-error-status": "404" } }, { src: "^/.*$", dest: "/500", status: 500, headers: { "x-next-error-status": "500" } }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 32, 48, 64, 96, 128, 256, 384], qualities: [75], remotePatterns: [], localPatterns: [{ pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$", search: "" }], minimumCacheTTL: 14400, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "404.segments/_tree.segment.rsc.json": { path: "404.segments/_tree.segment.rsc", contentType: "application/json" }, "500.rsc.json": { path: "500.rsc", contentType: "application/json" }, "500.segments/_tree.segment.rsc.json": { path: "500.segments/_tree.segment.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { slug: "nextjs", version: "16.3.6" }, crons: [] };
});
var f;
var p = E(() => {
  f = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/404.segments/_tree.segment.rsc.json": { type: "override", path: "/404.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500.rsc.json": { type: "override", path: "/500.rsc.json", headers: { "content-type": "application/json" } }, "/500.segments/_tree.segment.rsc.json": { type: "override", path: "/500.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/AhPctF1hGlRT2ZKmSyVOH/_buildManifest.js": { type: "static" }, "/_next/static/AhPctF1hGlRT2ZKmSyVOH/_clientMiddlewareManifest.js": { type: "static" }, "/_next/static/AhPctF1hGlRT2ZKmSyVOH/_ssgManifest.js": { type: "static" }, "/_next/static/chunks/04zu-5et__9o8.js": { type: "static" }, "/_next/static/chunks/077b67dxcl_7n.js": { type: "static" }, "/_next/static/chunks/0cz1d0mv5g_q7.js": { type: "static" }, "/_next/static/chunks/0edte-771726v.js": { type: "static" }, "/_next/static/chunks/0o8vf13s3zhhs.js": { type: "static" }, "/_next/static/chunks/11be91k_gj8bl.js": { type: "static" }, "/_next/static/chunks/18sjjb-lbc20e.js": { type: "static" }, "/_next/static/chunks/196x_tfexoucg.js": { type: "static" }, "/_next/static/chunks/1o5uq-op3le_t.js": { type: "static" }, "/_next/static/chunks/21_7_p-u9rh3f.css": { type: "static" }, "/_next/static/chunks/2d8l452ey3u8w.js": { type: "static" }, "/_next/static/chunks/2hs8ykv0__tt8.js": { type: "static" }, "/_next/static/chunks/2mmpezlrfmbu5.js": { type: "static" }, "/_next/static/chunks/2rp0_txwy34_u.js": { type: "static" }, "/_next/static/chunks/2tsr57wvaa-2b.js": { type: "static" }, "/_next/static/chunks/3fntmmi971322.js": { type: "static" }, "/_next/static/chunks/3pdolpk4sxmt8.js": { type: "static" }, "/_next/static/chunks/3s6nzrbk-8mnv.js": { type: "static" }, "/_next/static/chunks/41289uaptxx86.js": { type: "static" }, "/_next/static/chunks/43465gdnq4ggv.js": { type: "static" }, "/_next/static/chunks/turbopack-2l-q3pv9t5u5y.js": { type: "static" }, "/_next/static/media/4fa387ec64143e14-s.2tuy5pz7dlieh.woff2": { type: "static" }, "/_next/static/media/53b9e256198e5412-s.390ncx5urfkfu.woff2": { type: "static" }, "/_next/static/media/5ce348bf30bf5439-s.31988l_ccedte.woff2": { type: "static" }, "/_next/static/media/6306c77e7c8268e4-s.2dbetqa9o8jxf.woff2": { type: "static" }, "/_next/static/media/7178b3e590c64307-s.21jp631_3pja2.woff2": { type: "static" }, "/_next/static/media/797e433ab948586e-s.p.0r6juujl39pe6.woff2": { type: "static" }, "/_next/static/media/7d817b4c03b0c5f1-s.1uyisp29ctx0d.woff2": { type: "static" }, "/_next/static/media/8a480f0b521d4e75-s.1qq4vpdcun5oj.woff2": { type: "static" }, "/_next/static/media/bbc41e54d2fcbd21-s.1rgnod-3esatf.woff2": { type: "static" }, "/_next/static/media/caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2": { type: "static" }, "/_next/static/media/favicon.2vob68tjqpejf.ico": { type: "static" }, "/_next/static/media/fef07dbb0973bf53-s.3p2_lha1f2xer.woff2": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/file.svg": { type: "static" }, "/globe.svg": { type: "static" }, "/logo.png": { type: "static" }, "/next.svg": { type: "static" }, "/vercel.svg": { type: "static" }, "/window.svg": { type: "static" }, "/api/auth/[...nextauth]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/auth/[...nextauth].func.js" }, "/api/auth/[...nextauth].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/auth/[...nextauth].func.js" }, "/api/essay/grade": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/essay/grade.func.js" }, "/api/essay/grade.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/essay/grade.func.js" }, "/api/flashcards/review": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/flashcards/review.func.js" }, "/api/flashcards/review.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/flashcards/review.func.js" }, "/api/plan": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/plan.func.js" }, "/api/plan.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/plan.func.js" }, "/dashboard": { type: "function", entrypoint: "__next-on-pages-dist__/functions/dashboard.func.js" }, "/dashboard.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/dashboard.func.js" }, "/leaderboard": { type: "function", entrypoint: "__next-on-pages-dist__/functions/leaderboard.func.js" }, "/leaderboard.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/leaderboard.func.js" }, "/plan": { type: "function", entrypoint: "__next-on-pages-dist__/functions/plan.func.js" }, "/plan.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/plan.func.js" }, "/practice/mock": { type: "function", entrypoint: "__next-on-pages-dist__/functions/practice/mock.func.js" }, "/practice/mock.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/practice/mock.func.js" }, "/practice": { type: "function", entrypoint: "__next-on-pages-dist__/functions/practice.func.js" }, "/practice.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/practice.func.js" }, "/profile": { type: "function", entrypoint: "__next-on-pages-dist__/functions/profile.func.js" }, "/profile.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/profile.func.js" }, "/quest": { type: "function", entrypoint: "__next-on-pages-dist__/functions/quest.func.js" }, "/quest.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/quest.func.js" }, "/roadmap": { type: "function", entrypoint: "__next-on-pages-dist__/functions/roadmap.func.js" }, "/roadmap.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/roadmap.func.js" }, "/sat": { type: "function", entrypoint: "__next-on-pages-dist__/functions/sat.func.js" }, "/sat.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/sat.func.js" }, "/study/[id]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/study/[id].func.js" }, "/study/[id].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/study/[id].func.js" }, "/study": { type: "function", entrypoint: "__next-on-pages-dist__/functions/study.func.js" }, "/study.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/study.func.js" }, "/vocabulary": { type: "function", entrypoint: "__next-on-pages-dist__/functions/vocabulary.func.js" }, "/vocabulary.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/vocabulary.func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/404.segments/_tree.segment.rsc": { type: "override", path: "/404.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/500.rsc": { type: "override", path: "/500.rsc.json", headers: { "content-type": "application/json" } }, "/500.segments/_tree.segment.rsc": { type: "override", path: "/500.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/_global-error.html": { type: "override", path: "/_global-error.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_global-error": { type: "override", path: "/_global-error.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_global-error.rsc": { type: "override", path: "/_global-error.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/_global-error.segments/__PAGE__.segment.rsc": { type: "override", path: "/_global-error.segments/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_full.segment.rsc": { type: "override", path: "/_global-error.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_tree.segment.rsc": { type: "override", path: "/_global-error.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.html": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found.rsc": { type: "override", path: "/_not-found.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/_not-found.segments/_full.segment.rsc": { type: "override", path: "/_not-found.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_not-found/__PAGE__.segment.rsc": { type: "override", path: "/_not-found.segments/_not-found/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_tree.segment.rsc": { type: "override", path: "/_not-found.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/about.html": { type: "override", path: "/about.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/about": { type: "override", path: "/about.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/about.rsc": { type: "override", path: "/about.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/about.segments/_full.segment.rsc": { type: "override", path: "/about.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/about.segments/_tree.segment.rsc": { type: "override", path: "/about.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/about.segments/about/__PAGE__.segment.rsc": { type: "override", path: "/about.segments/about/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/favicon.ico": { type: "override", path: "/favicon.ico", headers: { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index.html": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index.rsc": { type: "override", path: "/index.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/index.segments/__PAGE__.segment.rsc": { type: "override", path: "/index.segments/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/index.segments/_full.segment.rsc": { type: "override", path: "/index.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/index.segments/_tree.segment.rsc": { type: "override", path: "/index.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/,_N_T_/index", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/login.html": { type: "override", path: "/login.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/login": { type: "override", path: "/login.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/login.rsc": { type: "override", path: "/login.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/login.segments/_full.segment.rsc": { type: "override", path: "/login.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/login.segments/_tree.segment.rsc": { type: "override", path: "/login.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/login.segments/login/__PAGE__.segment.rsc": { type: "override", path: "/login.segments/login/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, middleware: { type: "middleware", entrypoint: "__next-on-pages-dist__/functions/middleware.func.js" } };
});
var $ = V((We, F) => {
  "use strict";
  u();
  l();
  p();
  function b(e, t) {
    e = String(e || "").trim();
    let n = e, s, a = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      s = e[0];
      let i = e.lastIndexOf(s);
      a += e.substring(i + 1), e = e.substring(1, i);
    }
    let r = 0;
    return e = pe(e, (i) => {
      if (/^\(\?[P<']/.test(i)) {
        let c = /^\(\?P?[<']([^>']+)[>']/.exec(i);
        if (!c) throw new Error(`Failed to extract named captures from ${JSON.stringify(i)}`);
        let d = i.substring(c[0].length, i.length - 1);
        return t && (t[r] = c[1]), r++, `(${d})`;
      }
      return i.substring(0, 3) === "(?:" || r++, i;
    }), e = e.replace(/\[:([^:]+):\]/g, (i, c) => b.characterClasses[c] || i), new b.PCRE(e, a, n, a, s);
  }
  __name(b, "b");
  function pe(e, t) {
    let n = 0, s = 0, a = false;
    for (let o = 0; o < e.length; o++) {
      let r = e[o];
      if (a) {
        a = false;
        continue;
      }
      switch (r) {
        case "(":
          s === 0 && (n = o), s++;
          break;
        case ")":
          if (s > 0 && (s--, s === 0)) {
            let i = o + 1, c = n === 0 ? "" : e.substring(0, n), d = e.substring(i), h = String(t(e.substring(n, i)));
            e = c + h + d, o = n;
          }
          break;
        case "\\":
          a = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(pe, "pe");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(s, a, o, r, i) {
        super(s, a), this.pcrePattern = o, this.pcreFlags = r, this.delimiter = i;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(b || (b = {}));
  b.prototype = b.PCRE.prototype;
  F.exports = b;
});
var Q = V((H) => {
  "use strict";
  u();
  l();
  p();
  H.parse = Re;
  H.serialize = Te;
  var we = Object.prototype.toString, C = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Re(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var n = {}, s = t || {}, a = s.decode || Ne, o = 0; o < e.length; ) {
      var r = e.indexOf("=", o);
      if (r === -1) break;
      var i = e.indexOf(";", o);
      if (i === -1) i = e.length;
      else if (i < r) {
        o = e.lastIndexOf(";", r - 1) + 1;
        continue;
      }
      var c = e.slice(o, r).trim();
      if (n[c] === void 0) {
        var d = e.slice(r + 1, i).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), n[c] = Se(d, a);
      }
      o = i + 1;
    }
    return n;
  }
  __name(Re, "Re");
  function Te(e, t, n) {
    var s = n || {}, a = s.encode || Pe;
    if (typeof a != "function") throw new TypeError("option encode is invalid");
    if (!C.test(e)) throw new TypeError("argument name is invalid");
    var o = a(t);
    if (o && !C.test(o)) throw new TypeError("argument val is invalid");
    var r = e + "=" + o;
    if (s.maxAge != null) {
      var i = s.maxAge - 0;
      if (isNaN(i) || !isFinite(i)) throw new TypeError("option maxAge is invalid");
      r += "; Max-Age=" + Math.floor(i);
    }
    if (s.domain) {
      if (!C.test(s.domain)) throw new TypeError("option domain is invalid");
      r += "; Domain=" + s.domain;
    }
    if (s.path) {
      if (!C.test(s.path)) throw new TypeError("option path is invalid");
      r += "; Path=" + s.path;
    }
    if (s.expires) {
      var c = s.expires;
      if (!je(c) || isNaN(c.valueOf())) throw new TypeError("option expires is invalid");
      r += "; Expires=" + c.toUTCString();
    }
    if (s.httpOnly && (r += "; HttpOnly"), s.secure && (r += "; Secure"), s.priority) {
      var d = typeof s.priority == "string" ? s.priority.toLowerCase() : s.priority;
      switch (d) {
        case "low":
          r += "; Priority=Low";
          break;
        case "medium":
          r += "; Priority=Medium";
          break;
        case "high":
          r += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (s.sameSite) {
      var h = typeof s.sameSite == "string" ? s.sameSite.toLowerCase() : s.sameSite;
      switch (h) {
        case true:
          r += "; SameSite=Strict";
          break;
        case "lax":
          r += "; SameSite=Lax";
          break;
        case "strict":
          r += "; SameSite=Strict";
          break;
        case "none":
          r += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return r;
  }
  __name(Te, "Te");
  function Ne(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(Ne, "Ne");
  function Pe(e) {
    return encodeURIComponent(e);
  }
  __name(Pe, "Pe");
  function je(e) {
    return we.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(je, "je");
  function Se(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Se, "Se");
});
u();
l();
p();
u();
l();
p();
u();
l();
p();
var w = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
u();
l();
p();
u();
l();
p();
u();
l();
p();
u();
l();
p();
var D = q($());
function P(e, t, n) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let s = n ? "" : "i", a = [];
  return { match: (0, D.default)(`%${e}%${s}`, a).exec(t), captureGroupKeys: a };
}
__name(P, "P");
function R(e, t, n, { namedOnly: s } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (a, o) => {
    let r = n.indexOf(o);
    return s && r === -1 ? a : (r === -1 ? t[parseInt(o, 10)] : t[r + 1]) || "";
  });
}
__name(R, "R");
function A(e, { url: t, cookies: n, headers: s, routeDest: a }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? M(e.value, s.get(e.key), a) : { valid: s.has(e.key) };
    case "cookie": {
      let o = n[e.key];
      return o && e.value !== void 0 ? M(e.value, o, a) : { valid: o !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? M(e.value, t.searchParams.get(e.key), a) : { valid: t.searchParams.has(e.key) };
  }
}
__name(A, "A");
function M(e, t, n) {
  let { match: s, captureGroupKeys: a } = P(e, t);
  return n && s && a.length ? { valid: !!s, newRouteDest: R(n, s, a, { namedOnly: true }) } : { valid: !!s };
}
__name(M, "M");
u();
l();
p();
function G(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", w), new Request(e, { headers: t });
}
__name(G, "G");
u();
l();
p();
function m(e, t, n) {
  let s = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [a, o] of s) {
    let r = a.toLowerCase(), i = n?.match ? R(o, n.match, n.captureGroupKeys) : o;
    r === "set-cookie" ? e.append(r, i) : e.set(r, i);
  }
}
__name(m, "m");
function T(e) {
  return /^https?:\/\//.test(e);
}
__name(T, "T");
function y(e, t) {
  for (let [n, s] of t.entries()) {
    let a = /^nxtP(.+)$/.exec(n), o = /^nxtI(.+)$/.exec(n);
    a?.[1] ? (e.set(n, s), e.set(a[1], s)) : o?.[1] ? e.set(o[1], s.replace(/(\(\.+\))+/, "")) : (!e.has(n) || !!s && !e.getAll(n).includes(s)) && e.append(n, s);
  }
}
__name(y, "y");
function I(e, t) {
  let n = new URL(t, e.url);
  return y(n.searchParams, new URL(e.url).searchParams), n.pathname = n.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(n, e);
}
__name(I, "I");
function N(e) {
  return new Response(e.body, e);
}
__name(N, "N");
function L(e) {
  return e.split(",").map((t) => {
    let [n, s] = t.split(";"), a = parseFloat((s ?? "q=1").replace(/q *= */gi, ""));
    return [n.trim(), isNaN(a) ? 1 : a];
  }).sort((t, n) => n[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(L, "L");
u();
l();
p();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function j(e, { request: t, assetsFetcher: n, ctx: s }, { path: a, searchParams: o }) {
  let r, i = new URL(t.url);
  y(i.searchParams, o);
  let c = new Request(i, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let d = await import(e.entrypoint);
        try {
          r = await d.default(c, s);
        } catch (h) {
          let g = h;
          throw g.name === "TypeError" && g.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : h;
        }
        break;
      }
      case "override": {
        r = N(await n.fetch(I(c, e.path ?? a))), e.headers && m(r.headers, e.headers);
        break;
      }
      case "static": {
        r = await n.fetch(I(c, a));
        break;
      }
      default:
        r = new Response("Not Found", { status: 404 });
    }
  } catch (d) {
    return console.error(d), new Response("Internal Server Error", { status: 500 });
  }
  return N(r);
}
__name(j, "j");
function B(e, t) {
  let n = "^//?(?:", s = ")/(.*)$";
  return !e.startsWith(n) || !e.endsWith(s) ? false : e.slice(n.length, -s.length).split("|").every((o) => t.has(o));
}
__name(B, "B");
u();
l();
p();
function de(e, { protocol: t, hostname: n, port: s, pathname: a }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(n).test(e.hostname) || s && !new RegExp(s).test(e.port) || a && !new RegExp(a).test(e.pathname));
}
__name(de, "de");
function he(e, t) {
  if (e.method !== "GET") return;
  let { origin: n, searchParams: s } = new URL(e.url), a = s.get("url"), o = Number.parseInt(s.get("w") ?? "", 10), r = Number.parseInt(s.get("q") ?? "75", 10);
  if (!a || Number.isNaN(o) || Number.isNaN(r) || !t?.sizes?.includes(o) || r < 0 || r > 100) return;
  let i = new URL(a, n);
  if (i.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let c = a.startsWith("//"), d = a.startsWith("/") && !c;
  if (!d && !t?.domains?.includes(i.hostname) && !t?.remotePatterns?.find((v) => de(i, v))) return;
  let h = e.headers.get("Accept") ?? "", g = t?.formats?.find((v) => h.includes(v))?.replace("image/", "");
  return { isRelative: d, imageUrl: i, options: { width: o, quality: r, format: g } };
}
__name(he, "he");
function _e(e, t, n) {
  let s = new Headers();
  if (n?.contentSecurityPolicy && s.set("Content-Security-Policy", n.contentSecurityPolicy), n?.contentDispositionType) {
    let o = t.pathname.split("/").pop(), r = o ? `${n.contentDispositionType}; filename="${o}"` : n.contentDispositionType;
    s.set("Content-Disposition", r);
  }
  e.headers.has("Cache-Control") || s.set("Cache-Control", `public, max-age=${n?.minimumCacheTTL ?? 60}`);
  let a = N(e);
  return m(a.headers, s), a;
}
__name(_e, "_e");
async function z(e, { buildOutput: t, assetsFetcher: n, imagesConfig: s }) {
  let a = he(e, s);
  if (!a) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: o, imageUrl: r } = a, c = await (o && r.pathname in t ? n.fetch.bind(n) : fetch)(r);
  return _e(c, r, s);
}
__name(z, "z");
u();
l();
p();
u();
l();
p();
u();
l();
p();
async function S(e) {
  return import(e);
}
__name(S, "S");
var fe = "x-vercel-cache-tags";
var xe = "x-next-cache-soft-tags";
var ge = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function Z(e) {
  let t = `https://${w}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let n = new URL(e.url), s = await me();
    if (n.pathname === "/v1/suspense-cache/revalidate") {
      let o = n.searchParams.get("tags")?.split(",") ?? [];
      for (let r of o) await s.revalidateTag(r);
      return new Response(null, { status: 200 });
    }
    let a = n.pathname.replace("/v1/suspense-cache/", "");
    if (!a.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let o = W(e, xe), r = await s.get(a, { softTags: o });
        return r ? new Response(JSON.stringify(r.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (r.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let o = globalThis[ge], r = /* @__PURE__ */ __name(async () => {
          let i = await e.json();
          i.data.tags === void 0 && (i.tags ??= W(e, fe) ?? []), await s.set(a, i);
        }, "r");
        return o ? o.ctx.waitUntil(r()) : await r(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (n) {
    return console.error(n), new Response("Error handling cache request", { status: 500 });
  }
}
__name(Z, "Z");
async function me() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? K("kv") : K("cache-api");
}
__name(me, "me");
async function K(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, n = await S(t);
  return new n.default();
}
__name(K, "K");
function W(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(W, "W");
function X() {
  globalThis[J] || (ye(), globalThis[J] = true);
}
__name(X, "X");
function ye() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let n = new Request(...t), s = await be(n);
    return s || (s = await Z(n), s) ? s : (ve(n), e(n));
  };
}
__name(ye, "ye");
async function be(e) {
  if (e.url.startsWith("blob:")) try {
    let n = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, s = (await S(n)).default, a = { async arrayBuffer() {
      return s;
    }, get body() {
      return new ReadableStream({ start(o) {
        let r = Buffer.from(s);
        o.enqueue(r), o.close();
      } });
    }, async text() {
      return Buffer.from(s).toString();
    }, async json() {
      let o = Buffer.from(s);
      return JSON.stringify(o.toString());
    }, async blob() {
      return new Blob(s);
    } };
    return a.clone = () => ({ ...a }), a;
  } catch {
  }
  return null;
}
__name(be, "be");
function ve(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(ve, "ve");
var J = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
u();
l();
p();
var Y = q(Q());
var k = class {
  static {
    __name(this, "k");
  }
  constructor(t, n, s, a, o) {
    this.routes = t;
    this.output = n;
    this.reqCtx = s;
    this.url = new URL(s.request.url), this.cookies = (0, Y.parse)(s.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), y(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = o?.find((r) => r.domain === this.url.hostname), this.locales = new Set(a.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: n, checkIntercept: s }) {
    let a = P(t.src, this.path, t.caseSensitive);
    if (!a.match || t.methods && !t.methods.map((r) => r.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let o = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((r) => {
      let i = A(r, o);
      return i.newRouteDest && (o.routeDest = i.newRouteDest), !i.valid;
    }) && !t.missing?.find((r) => A(r, o).valid) && !(n && t.status !== this.status)) {
      if (s && t.dest) {
        let r = /\/(\(\.+\))+/, i = r.test(t.dest), c = r.test(this.path);
        if (i && !c) return;
      }
      return { routeMatch: a, routeDest: o.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let n = "x-middleware-override-headers", s = t.headers.get(n);
    if (s) {
      let c = new Set(s.split(",").map((d) => d.trim()));
      for (let d of c.keys()) {
        let h = `x-middleware-request-${d}`, g = t.headers.get(h);
        this.reqCtx.request.headers.get(d) !== g && (g ? this.reqCtx.request.headers.set(d, g) : this.reqCtx.request.headers.delete(d)), t.headers.delete(h);
      }
      t.headers.delete(n);
    }
    let a = "x-middleware-rewrite", o = t.headers.get(a);
    if (o) {
      let c = new URL(o, this.url), d = this.url.hostname !== c.hostname;
      this.path = d ? `${c}` : c.pathname, y(this.searchParams, c.searchParams), t.headers.delete(a);
    }
    let r = "x-middleware-next";
    t.headers.get(r) ? t.headers.delete(r) : !o && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), m(this.reqCtx.request.headers, t.headers), m(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let n = t && this.output[t];
    if (!n || n.type !== "middleware") return this.status = 500, false;
    let s = await j(n, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), s.status === 500 ? (this.status = s.status, false) : (this.processMiddlewareResp(s), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, n, s) {
    !t.headers || (m(this.headers.normal, t.headers, { match: n, captureGroupKeys: s }), t.important && m(this.headers.important, t.headers, { match: n, captureGroupKeys: s }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, n, s) {
    if (!t.dest) return this.path;
    let a = this.path, o = t.dest;
    this.wildcardMatch && /\$wildcard/.test(o) && (o = o.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = R(o, n, s);
    let r = /\/index\.rsc$/i.test(this.path), i = /^\/(?:index)?$/i.test(a), c = /^\/__index\.prefetch\.rsc$/i.test(a);
    r && !i && !c && (this.path = a);
    let d = /\.rsc$/i.test(this.path), h = /\.prefetch\.rsc$/i.test(this.path), g = this.path in this.output;
    d && !h && !g && (this.path = this.path.replace(/\.rsc/i, ""));
    let v = new URL(this.path, this.url);
    return y(this.searchParams, v.searchParams), T(this.path) || (this.path = v.pathname), a;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: s, cookie: a } } = t, o = a && this.cookies[a], r = L(o ?? ""), i = L(this.reqCtx.request.headers.get("accept-language") ?? ""), h = [...r, ...i].map((g) => s[g]).filter(Boolean)[0];
    if (h) {
      !this.path.startsWith(h) && (this.headers.normal.set("location", h), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, n) {
    return !this.locales || n !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, n) {
    let s = this.getLocaleFriendlyRoute(n, t), { routeMatch: a, routeDest: o } = this.checkRouteMatch(s, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, r = { ...s, dest: o };
    if (!a?.match || r.middlewarePath && this.middlewareInvoked.includes(r.middlewarePath)) return "skip";
    let { match: i, captureGroupKeys: c } = a;
    if (this.applyRouteOverrides(r), this.applyLocaleRedirects(r), !await this.runRouteMiddleware(r.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(r, i, c), this.applyRouteStatus(r);
    let h = this.applyRouteDest(r, i, c);
    if (r.check && !T(this.path)) if (h === this.path) {
      if (t !== "miss") return this.checkPhase(O(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !r.continue || r.status && r.status >= 300 && r.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let n = true;
    for (let o of this.routes[t]) {
      let r = await this.checkRoute(t, o);
      if (r === "error") return "error";
      if (r === "done") {
        n = false;
        break;
      }
    }
    if (t === "hit" || T(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let o of this.locales) {
      let r = new RegExp(`/${o}(/.*)`), c = this.path.match(r)?.[1];
      if (c && c in this.output) {
        this.path = c;
        break;
      }
    }
    let s = this.path in this.output;
    if (!s && this.path.endsWith("/")) {
      let o = this.path.replace(/\/$/, "");
      s = o in this.output, s && (this.path = o);
    }
    if (t === "miss" && !s) {
      let o = !this.status || this.status < 400;
      this.status = o ? 404 : this.status;
    }
    let a = "miss";
    return s || t === "miss" || t === "error" ? a = "hit" : n && (a = O(t)), this.checkPhase(a);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let n = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), n;
  }
};
async function ee(e, t, n, s) {
  let a = new k(t.routes, n, e, s, t.wildcard), o = await te(a);
  return Ce(e, o, n);
}
__name(ee, "ee");
async function te(e, t = "none", n = false) {
  return await e.run(t) === "error" || !n && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
async function Ce(e, { path: t = "/404", status: n, headers: s, searchParams: a, body: o }, r) {
  let i = s.normal.get("location");
  if (i) {
    if (i !== s.middlewareLocation) {
      let h = [...a.keys()].length ? `?${a.toString()}` : "";
      s.normal.set("location", `${i ?? "/"}${h}`);
    }
    return new Response(null, { status: n, headers: s.normal });
  }
  let c;
  if (o !== void 0) c = new Response(o, { status: n });
  else if (T(t)) {
    let h = new URL(t);
    y(h.searchParams, a), c = await fetch(h, e.request);
  } else c = await j(r[t], e, { path: t, status: n, headers: s, searchParams: a });
  let d = s.normal;
  return m(d, c.headers), m(d, s.important), c = new Response(c.body, { ...c, status: n || c.status, headers: d }), c;
}
__name(Ce, "Ce");
u();
l();
p();
function se() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: ke };
}
__name(se, "se");
function ke(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let n = Ee();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, n), n;
}
__name(ke, "ke");
function Ee() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, n) => e.has(n) ? e.get(n) : Reflect.get(globalThis, n), "get"), set: /* @__PURE__ */ __name((t, n, s) => Me.has(n) ? Reflect.set(globalThis, n, s) : (e.set(n, s), true), "set") });
}
__name(Ee, "Ee");
var Me = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ae = Object.defineProperty;
var Ie = /* @__PURE__ */ __name((...e) => {
  let t = e[0], n = e[1], s = "__import_unsupported";
  if (!(n === s && typeof t == "object" && t !== null && s in t)) return Ae(...e);
}, "Ie");
globalThis.Object.defineProperty = Ie;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var Ns = { async fetch(e, t, n) {
  se(), X();
  let s = await __ALSes_PROMISE__;
  if (!s) {
    let r = new URL(e.url), i = await t.ASSETS.fetch(`${r.protocol}//${r.host}/cdn-cgi/errors/no-nodejs_compat.html`), c = i.ok ? i.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(c, { status: 503 });
  }
  let { envAsyncLocalStorage: a, requestContextAsyncLocalStorage: o } = s;
  return a.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: w }, async () => o.run({ env: t, ctx: n, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return z(e, { buildOutput: f, assetsFetcher: t.ASSETS, imagesConfig: _.images });
    let i = G(e);
    return ee({ request: i, ctx: n, assetsFetcher: t.ASSETS }, _, f, x);
  }));
} };
export {
  Ns as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.46239774030300484.mjs.map
