export const COOKIES_KEYS = {
  accessToken: "accessToken",
  locale: "NEXT_LOCALE",
};

export type RoutesType = Record<string, { url: string; displayName: string }>;

export const ROUTES = {
  root: { url: "/", displayName: "ITEMS" },
  users: { url: "/users", displayName: "USERS" },
  categories: { url: "/categories", displayName: "CATEGORIES" },
  login: { url: "/login", displayName: "LOGIN" },
};
