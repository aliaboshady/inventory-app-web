export const COOKIES_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  locale: "NEXT_LOCALE",
};

export type RoutesType = Record<string, { url: string; displayName: string }>;

export const ROUTES = {
  root: { url: "/", displayName: "DASHBOARD" },
  login: { url: "/login", displayName: "LOGIN" },
  users: { url: "/users", displayName: "USERS" },
  beneficiaries: { url: "/beneficiaries", displayName: "BENEFICIARIES" },
  sessions: { url: "/sessions", displayName: "SESSIONS" },
  projects: { url: "/projects", displayName: "PROJECTS" },
};
