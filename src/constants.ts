export const ADDON_ID = "storybook/react-router-v6";
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = `reactRouter`;

export const EVENTS = {
  CLEAR: `${ADDON_ID}/clear`,
  NAVIGATION: `${ADDON_ID}/navigation`,
  STORY_LOADED: `${ADDON_ID}/story-loaded`,
  ROUTE_MATCHES: `${ADDON_ID}/route-matches`,
  ACTION_INVOKED: `${ADDON_ID}/action_invoked`,
  ACTION_SETTLED: `${ADDON_ID}/action_settled`,
  LOADER_INVOKED: `${ADDON_ID}/loader_invoked`,
  LOADER_SETTLED: `${ADDON_ID}/loader_settled`,
} as const;
