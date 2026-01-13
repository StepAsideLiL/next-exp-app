import "server-only";

import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { TFormSchema } from "../utils";

export async function getSiteConfig() {
  try {
    let libDir: string;
    const isSrc = await directoryExists(path.resolve("src"));
    if (isSrc) {
      libDir = path.resolve("src", "lib");
    } else {
      libDir = path.resolve("lib");
    }

    const configFilePath = path.resolve(libDir, "site-config", "data.json");

    if (await fileExists(configFilePath)) {
      const config = await fs.readFile(configFilePath, "utf-8");
      return JSON.parse(config) as TFormSchema;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export async function fileExists(path: string) {
  try {
    const stat = await fs.stat(path);
    return stat.isFile();
  } catch {
    return false;
  }
}

export async function directoryExists(path: string) {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
}
