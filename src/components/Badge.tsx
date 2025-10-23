"use client";

import { useTranslation } from "react-i18next";
import { Badge as BadgeUI } from "./ui/badge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Badge = ({ children, className }: Props) => {
  const { t } = useTranslation();

  return <BadgeUI className={className}>{t(children as string)}</BadgeUI>;
};

export default Badge;
