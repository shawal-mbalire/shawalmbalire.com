#!/usr/bin/env bun
/**
 * Generate a static runtime config for the SPA from environment variables.
 * Output: public/app-config.json
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const env = process.env;

const config = {
  appName: env.PUBLIC_APP_NAME ?? "Portfolio",
  environment: env.PUBLIC_ENV ?? (env.NODE_ENV ?? "development"),
  baseUrl: env.PUBLIC_BASE_URL ?? "/",
  contactEmail: env.PUBLIC_CONTACT_EMAIL ?? "mbalireshawal@gmail.com",
  analyticsId: env.PUBLIC_ANALYTICS_ID ?? "",
};

const outPath = resolve(import.meta.dir, "../public/app-config.json");
await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify(config, null, 2));

console.log(`[config] Wrote ${outPath}`);
console.log(`[config] ${JSON.stringify(config)}`);
