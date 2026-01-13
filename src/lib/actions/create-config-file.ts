"use server";

import * as fs from "node:fs/promises";
import * as path from "node:path";
import { directoryExists, fileExists } from "../data/data";
import type { TFormSchema } from "../utils";

export default async function createConfigFile(value: TFormSchema) {
  try {
    let libDir: string;
    const isSrc = await directoryExists(path.resolve("src"));
    if (isSrc) {
      libDir = path.resolve("src", "lib");
    } else {
      libDir = path.resolve("lib");
    }

    const configFilePath = path.resolve(libDir, "site-config", "data.json");

    if (!(await fileExists(configFilePath))) {
      await fs.mkdir(path.dirname(configFilePath), { recursive: true });
      await fs.writeFile(configFilePath, JSON.stringify(value), "utf-8");
    } else {
      await fs.writeFile(configFilePath, JSON.stringify(value), "utf-8");
    }

    return {
      success: true,
      message: "Success!",
    };
  } catch {
    return {
      success: false,
      message: "Failed",
    };
  }
}

// const siteConfig = {
//   title: "Fancy",
//   description: "How fancy the web can be!",
//   url:
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3000"
//       : "http://localhost:3000",
//   author: {
//     name: "StepAsideLiL",
//     url: "https://github.com/StepAsideLiL",
//   },
// };

// export type TSiteConfig = typeof siteConfig;
// export default siteConfig;
