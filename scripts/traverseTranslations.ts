import translations from "../src/locales/EN.json";

const keys: string[] = [];

type TranslationRecord = {
  [P in string]: string | TranslationRecord;
};

const _traverseTranslations = (obj: TranslationRecord, path: string[]) => {
  Object.keys(obj).forEach((key) => {
    const objOrString = obj[key];
    if (typeof objOrString === "string") {
      keys.push([...path, key].join("."));
    } else {
      _traverseTranslations(objOrString, [...path, key]);
    }
  });
};

const traverseTranslations = () => {
  _traverseTranslations(translations, []);
  return keys;
};

export { traverseTranslations };
