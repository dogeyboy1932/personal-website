export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Linkedin_pfp.jpeg","browserconfig.xml","favicon.ico","projectImages/BlinkAPI.png","projectImages/DocAssist.png","projectImages/MyCalPal.png","projectImages/NUS-MODS.png","projectImages/NodeFlow.png","projectImages/SolPal.png","projectImages/Weave.png","resume.pdf","site.webmanifest"]),
	mimeTypes: {".jpeg":"image/jpeg",".xml":"application/xml",".png":"image/png",".pdf":"application/pdf",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.3b278c72.js","app":"_app/immutable/entry/app.daf3f653.js","imports":["_app/immutable/entry/start.3b278c72.js","_app/immutable/chunks/scheduler.cd15ae3c.js","_app/immutable/chunks/singletons.63405c95.js","_app/immutable/chunks/index.cb5194ce.js","_app/immutable/entry/app.daf3f653.js","_app/immutable/chunks/scheduler.cd15ae3c.js","_app/immutable/chunks/index.8e49917d.js","_app/immutable/chunks/environment.60829b93.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/.well-known/appspecific/com.chrome.devtools.json",
				pattern: /^\/\.well-known\/appspecific\/com\.chrome\.devtools\.json\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/.well-known/appspecific/com.chrome.devtools.json/_server.js'))
			},
			{
				id: "/more",
				pattern: /^\/more\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/portfolio",
				pattern: /^\/portfolio\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/resume",
				pattern: /^\/resume\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
