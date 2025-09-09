"use client";

import { I18nextProvider } from "react-i18next";
import { useState, useEffect } from "react";
import { createInstance, type i18n as I18nInstance } from "i18next";
import initTranslations from "../../../i18n";

type Props = {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: any;
};

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: Props) {
  const [i18nInitialized, setI18nInitialized] = useState<I18nInstance | null>(
    null
  );

  useEffect(() => {
    const initializeAndSetI18n = async () => {
      const newI18nInstance = createInstance();
      const { i18n } = await initTranslations(
        locale,
        namespaces,
        newI18nInstance,
        resources
      );
      setI18nInitialized(i18n);
    };

    if (!i18nInitialized || i18nInitialized.language !== locale) {
      initializeAndSetI18n();
    }
  }, [locale, namespaces, resources]);

  if (!i18nInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18nInitialized}>{children}</I18nextProvider>;
}
