import { createInstance, i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getCookie } from "@/app/actions/cookies/getCookie.action";
import { COOKIES_KEYS } from "@/lib/staticKeys";

export const LOCALES = {
  arabic: "ar",
  english: "en",
} as const;

export const RTL_LANGS = {
  arabic: "ar",
};

export const locales = [...Object.values(LOCALES)] as const;
export const rtlLangs = [...Object.values(RTL_LANGS)] as const;

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export const i18nConfig = {
  locales,
  defaultLocale: LOCALES.arabic,
};

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: I18nInstance,
  resources?: any
): Promise<{
  i18n: I18nInstance;
  resources: Record<string, unknown>;
  t: I18nInstance["t"];
}> {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./public/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t,
  };
}

export async function getTranslation() {
  const locale = await getCookie(COOKIES_KEYS.locale);
  return await initTranslations(locale, ["locale"]);
}
