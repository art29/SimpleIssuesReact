import fs from "fs";
import { join } from "path";
import prettier from "prettier";
import english from "../src/locales/EN.json";
import { traverseTranslations } from "./traverseTranslations";

const paths = traverseTranslations();

const set = (string: string, obj: any, value: string) => {
  const [current, ...rest] = string.split(".");
  rest.length >= 1
    ? set(rest.join("."), (obj[current] = obj[current] || {}), value)
    : (obj[current] = value);
  return obj;
};

const get = (object: any, path: string, defval = undefined) => {
  return path
    .split(".")
    .reduce((xs, x) => (xs && xs[x] ? xs[x] : defval), object);
};

export interface IHash {
  [locale: string]: number;
}

const missingKeys: IHash = {};

fs.readdirSync(join(__dirname, "../src/locales")).forEach((locale) => {
  if (locale === "common_en-US.json") {
    return; // No need to analyse the master file
  }

  const filename = join(__dirname, "../src/locales", locale);

  let data: any;

  try {
    data = JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
  } catch (err: any) {
    throw new Error(`${locale}: ${err.message}`);
  }

  paths.forEach((p) => {
    if (get(data, p, undefined) === undefined) {
      set(p, data, `${get(english, p, undefined)} (MISSING)`);
      missingKeys[locale] = missingKeys[locale] ? missingKeys[locale] + 1 : 1;
      console.log(`Missing Translation: [${locale}]: ${p}`);
    }
  });

  fs.writeFileSync(
    filename,
    prettier.format(JSON.stringify(data), {
      parser: "json",
    })
  );
});

console.log("NEW TRANSLATIONS REQUIRED:");
console.log(missingKeys);
