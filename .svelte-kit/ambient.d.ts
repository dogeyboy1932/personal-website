
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const FUSION_ENVIRONMENT: string;
	export const KUBERNETES_SERVICE_PORT: string;
	export const KUBERNETES_PORT: string;
	export const AI_AGENT: string;
	export const npm_config_user_agent: string;
	export const NODE_VERSION: string;
	export const BETTER_AUTH_SECRET: string;
	export const HOSTNAME: string;
	export const YARN_VERSION: string;
	export const GH_TOKEN: string;
	export const npm_node_execpath: string;
	export const XDG_CACHE_HOME: string;
	export const SHLVL: string;
	export const MISE_DATA_DIR: string;
	export const MISE_CONFIG_DIR: string;
	export const HOME: string;
	export const OLDPWD: string;
	export const npm_package_json: string;
	export const FUSION_TERMINATION_GRACE_SECONDS: string;
	export const COREPACK_ROOT: string;
	export const NODE_OPTIONS: string;
	export const FUSION_ENV_ORIGIN: string;
	export const NPM_CONFIG_PROGRESS: string;
	export const npm_config_engine_strict: string;
	export const npm_config_resolution_mode: string;
	export const COREPACK_ENABLE_STRICT: string;
	export const COMPOSER_HOME: string;
	export const npm_config_progress: string;
	export const COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
	export const npm_config_audit: string;
	export const COMPOSER_ALLOW_SUPERUSER: string;
	export const FORCE_COLOR: string;
	export const LOGNAME: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const _: string;
	export const GOMODCACHE: string;
	export const npm_config_registry: string;
	export const TERM: string;
	export const KUBERNETES_PORT_443_TCP_ADDR: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const YARN_CACHE_FOLDER: string;
	export const UV_THREADPOOL_SIZE: string;
	export const npm_package_name: string;
	export const NODE: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const KUBERNETES_PORT_443_TCP_PORT: string;
	export const NPM_CONFIG_LOGLEVEL: string;
	export const npm_config_color: string;
	export const npm_config_frozen_lockfile: string;
	export const COMPOSER_CACHE_DIR: string;
	export const KUBERNETES_PORT_443_TCP_PROTO: string;
	export const MISE_INSTALL_PATH: string;
	export const MISE_CACHE_DIR: string;
	export const npm_config_fund: string;
	export const npm_config_loglevel: string;
	export const npm_lifecycle_script: string;
	export const SHELL: string;
	export const GOPATH: string;
	export const HOST: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const npm_config_verify_deps_before_run: string;
	export const NODE_PATH: string;
	export const NPM_CONFIG_UPDATE_NOTIFIER: string;
	export const npm_config_update_notifier: string;
	export const NX_REJECT_UNKNOWN_LOCAL_CACHE: string;
	export const KUBERNETES_SERVICE_PORT_HTTPS: string;
	export const KUBERNETES_PORT_443_TCP: string;
	export const KUBERNETES_SERVICE_HOST: string;
	export const PWD: string;
	export const npm_execpath: string;
	export const npm_config__jsr_registry: string;
	export const npm_command: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const NODE_ENV: string;
	export const NPM_CONFIG_COLOR: string;
	export const MISE_TRUSTED_CONFIG_PATHS: string;
	export const INIT_CWD: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		FUSION_ENVIRONMENT: string;
		KUBERNETES_SERVICE_PORT: string;
		KUBERNETES_PORT: string;
		AI_AGENT: string;
		npm_config_user_agent: string;
		NODE_VERSION: string;
		BETTER_AUTH_SECRET: string;
		HOSTNAME: string;
		YARN_VERSION: string;
		GH_TOKEN: string;
		npm_node_execpath: string;
		XDG_CACHE_HOME: string;
		SHLVL: string;
		MISE_DATA_DIR: string;
		MISE_CONFIG_DIR: string;
		HOME: string;
		OLDPWD: string;
		npm_package_json: string;
		FUSION_TERMINATION_GRACE_SECONDS: string;
		COREPACK_ROOT: string;
		NODE_OPTIONS: string;
		FUSION_ENV_ORIGIN: string;
		NPM_CONFIG_PROGRESS: string;
		npm_config_engine_strict: string;
		npm_config_resolution_mode: string;
		COREPACK_ENABLE_STRICT: string;
		COMPOSER_HOME: string;
		npm_config_progress: string;
		COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
		npm_config_audit: string;
		COMPOSER_ALLOW_SUPERUSER: string;
		FORCE_COLOR: string;
		LOGNAME: string;
		pnpm_config_verify_deps_before_run: string;
		_: string;
		GOMODCACHE: string;
		npm_config_registry: string;
		TERM: string;
		KUBERNETES_PORT_443_TCP_ADDR: string;
		npm_config_node_gyp: string;
		PATH: string;
		YARN_CACHE_FOLDER: string;
		UV_THREADPOOL_SIZE: string;
		npm_package_name: string;
		NODE: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		KUBERNETES_PORT_443_TCP_PORT: string;
		NPM_CONFIG_LOGLEVEL: string;
		npm_config_color: string;
		npm_config_frozen_lockfile: string;
		COMPOSER_CACHE_DIR: string;
		KUBERNETES_PORT_443_TCP_PROTO: string;
		MISE_INSTALL_PATH: string;
		MISE_CACHE_DIR: string;
		npm_config_fund: string;
		npm_config_loglevel: string;
		npm_lifecycle_script: string;
		SHELL: string;
		GOPATH: string;
		HOST: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		npm_config_verify_deps_before_run: string;
		NODE_PATH: string;
		NPM_CONFIG_UPDATE_NOTIFIER: string;
		npm_config_update_notifier: string;
		NX_REJECT_UNKNOWN_LOCAL_CACHE: string;
		KUBERNETES_SERVICE_PORT_HTTPS: string;
		KUBERNETES_PORT_443_TCP: string;
		KUBERNETES_SERVICE_HOST: string;
		PWD: string;
		npm_execpath: string;
		npm_config__jsr_registry: string;
		npm_command: string;
		PNPM_SCRIPT_SRC_DIR: string;
		NODE_ENV: string;
		NPM_CONFIG_COLOR: string;
		MISE_TRUSTED_CONFIG_PATHS: string;
		INIT_CWD: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
