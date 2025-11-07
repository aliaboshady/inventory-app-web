import React from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ErrorResponse } from "@/models/shared.model";
import { toast } from "react-toastify";

const fullConfig = resolveConfig(tailwindConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTailwindColor = (input: string) => {
  if (!fullConfig?.theme?.colors) {
    console.warn("Invalid Tailwind config passed.");
    return null;
  }

  const colors = fullConfig.theme.colors;

  const [colorName, shade] = input.split("-");

  const colorEntry = colors[colorName];

  if (!colorEntry) {
    console.warn(`Color '${colorName}' not found in Tailwind config.`);
    return null;
  }

  // If the color entry is a string, return it directly
  if (typeof colorEntry === "string") {
    return colorEntry;
  }

  // If a shade is provided and exists, return it
  if (shade && colorEntry[shade]) {
    return colorEntry[shade];
  }

  // If no shade and DEFAULT exists, return it
  if (colorEntry.DEFAULT) {
    return colorEntry.DEFAULT;
  }

  // If no shade and no DEFAULT, but shade-less color was passed and is a shade (like neutral-3)
  if (!shade && typeof colorEntry === "object") {
    console.warn(
      `No 'DEFAULT' value for '${colorName}', please specify a shade.`
    );
    return null;
  }

  return null;
};

export function styleSplitText(
  text: string,
  wrappers?: Array<string | React.ReactElement>
): React.ReactNode {
  if (!text) return null;

  const regex = /<(\d+)>([\s\S]*?)<\/\1>/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    const matchStart = match.index;
    const fullMatch = match[0];
    const idx = Number(match[1]);
    const inner = match[2];

    if (matchStart > lastIndex) {
      nodes.push(text.slice(lastIndex, matchStart));
    }

    const wrapper = wrappers?.[idx];

    if (wrapper && React.isValidElement(wrapper)) {
      nodes.push(React.cloneElement(wrapper, { key: `ht-${key++}` }, inner));
    } else {
      const className = typeof wrapper === "string" ? wrapper : undefined;
      nodes.push(
        React.createElement("span", { key: `ht-${key++}`, className }, inner)
      );
    }

    lastIndex = matchStart + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 0
    ? text
    : React.createElement(React.Fragment, null, ...nodes);
}

export const handleErrorToast = (
  error: ErrorResponse,
  showNonGeneralErrors: boolean = false
) => {
  if (!error) return;

  // ✅ Always show general errors first (if present)
  if (Array.isArray(error.general)) {
    error.general.forEach((msg) => {
      toast.error(msg);
    });
  }

  // ✅ If showGeneralOnly is false, also show field-specific errors
  if (showNonGeneralErrors) {
    Object.entries(error).forEach(([key, messages]) => {
      if (key === "general") return; // skip general (already shown)
      if (!Array.isArray(messages)) return;

      messages.forEach((msg) => {
        toast.error(msg);
      });
    });
  }
};

export function combineLocalDateAndTime(
  date?: Date,
  time?: string
): Date | null {
  if (!date || !time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  return combined;
}

export const getFilter = (
  filterName: string,
  value: number | string | boolean,
  ignore: (number | string)[] = []
) => {
  if (!value) return "";

  let filter =
    filterName && value !== null && filterName && value !== ""
      ? `&${filterName}=${value}`
      : "";
  ignore.map((word) => {
    if (value === word) filter = "";
  });
  return filter;
};

export function formatDate(isoString?: string | null): string {
  if (!isoString) return "-"; // or return null, or 'N/A'

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "-"; // invalid date check

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
