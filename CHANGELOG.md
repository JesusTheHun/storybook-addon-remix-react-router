# v3.1.0 (Tue Dec 31 2024)

#### 🚀 Enhancement

- feat: add support for react 19 ([@JesusTheHun](https://github.com/JesusTheHun))
- Feat/v7 future [#80](https://github.com/JesusTheHun/storybook-addon-remix-react-router/pull/80) ([@JesusTheHun](https://github.com/JesusTheHun))

#### 🐛 Bug Fix

- fix: allow React 19 as peer dep ([@JesusTheHun](https://github.com/JesusTheHun))
- ci: use json config file ([@JesusTheHun](https://github.com/JesusTheHun))

#### ⚠️ Pushed to `main`

- revert: move to react 19 ([@JesusTheHun](https://github.com/JesusTheHun))
- build: set dev dep to React 19 ([@JesusTheHun](https://github.com/JesusTheHun))
- ci: use auto conventional commits ([@JesusTheHun](https://github.com/JesusTheHun))
- docs: remove canary entry from changelog ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jonathan MASSUCHETTI ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v3.0.2 (Tue Nov 26 2024)

#### 🐛 Bug Fix

- docs: add reactRouterParameters to the import list [#77](https://github.com/JesusTheHun/storybook-addon-remix-react-router/pull/77) ([@benhuangbmj](https://github.com/benhuangbmj))

#### Authors: 2

- Ben Huang ([@benhuangbmj](https://github.com/benhuangbmj))
- Jonathan MASSUCHETTI ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.11 (Sun Mar 03 2024)

- chore: upgrade tsup & auto ([@JesusTheHun](https://github.com/JesusTheHun))
- fix: import case ([@JesusTheHun](https://github.com/JesusTheHun))
- ci: gh action upgrades ([@JesusTheHun](https://github.com/JesusTheHun))
- feat(decorator): allow the story to be injected multiple times ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.10 (Tue Nov 14 2023)

- fix(build): change module target to include import assertions into result ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.9 (Fri Nov 03 2023)

#### 🐛 Bug Fix

- Added assert type to json import [#55](https://github.com/JesusTheHun/storybook-addon-react-router-v6/pull/55) ([@BCaspari](https://github.com/BCaspari))

#### Authors: 1

- [@BCaspari](https://github.com/BCaspari)

---

# v2.0.8 (Tue Oct 17 2023)

- fix(panel): import router context from react-router-dom ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.7 (Tue Aug 29 2023)

- fix(logs): loader and action are now logged correctly if the functions come from the lazy property. ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.6 (Tue Aug 29 2023)

- fix(logs): current url now correctly add question mark and sharp character. ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(logs): missing question mark before query string ([@JesusTheHun](https://github.com/JesusTheHun))
- build(deps): remove react-router from the peerDependencies ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.5 (Fri Aug 18 2023)

- fix(decorator): story not updating on arg change if the story itself is an outlet ([@JesusTheHun](https://github.com/JesusTheHun))
- test(controls): bring back addon-essentials ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.4 (Sun Aug 13 2023)

- misc(build): smaller tsup external ([@JesusTheHun](https://github.com/JesusTheHun))
- misc: add package/ to gitignore ([@JesusTheHun](https://github.com/JesusTheHun))
- Merge branch 'fix/runtime-package.json' ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(panel): catch failed npmjs requests ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(panel): get version from package.json at runtime ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.3 (Fri Aug 11 2023)

- fix(panel): duplicate event key when hmr triggers ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.2 (Fri Aug 04 2023)

- test(event): the suffix of the first event is now 1 ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(event): duplicate event key when hmr triggers before any new event ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(panel): use template literal for styled components ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v2.0.1 (Fri Aug 04 2023)

- feat(panel): add banner when a new version is available ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(panel): update panel registration title to return a ReactElement ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(npm): add required package at build time to dev deps ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(helper): remove forgotten log statement ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v1.0.2 (Thu Jun 01 2023)

- feat(readme): add table of available parameters ([@JesusTheHun](https://github.com/JesusTheHun))
- feat(readme): changelog ([@JesusTheHun](https://github.com/JesusTheHun))
- feat(decorator): add support for route id ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v1.0.1 (Tue May 23 2023)

- feat(npm): bump react-inspector version ([@JesusTheHun](https://github.com/JesusTheHun))
- feat(npm): update dependencies ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.3.6 (Wed May 03 2023)

- fix(router): rebuild router only after story args changed ([@JesusTheHun](https://github.com/JesusTheHun))
- feat(decorator): add support for shouldRevalidate function ([@JesusTheHun](https://github.com/JesusTheHun))
- fix(controls): router not reloading component after change through SB controls ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.3.5 (Fri Mar 24 2023)

- fix: reloading component should not trigger a console warning ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.3.4 (Mon Mar 20 2023)

- fix: log of action with file upload ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.3.3 (Mon Mar 20 2023)

- fix: story decorator not passing errorElement to the wrapping component ([@JesusTheHun](https://github.com/JesusTheHun))
- fix: story decorator not passing routeHandle to the wraping component ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.3.2 (Sun Mar 19 2023)

- feat: add support for route handle ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.3.1 (Wed Mar 15 2023)

- fix(ts): restore ts rootDir to src ([@JesusTheHun](https://github.com/JesusTheHun))
- misc(npm): bump version ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.2.2 (Mon Mar 13 2023)

- feat(readme): add data router information ([@JesusTheHun](https://github.com/JesusTheHun))
- feat(ci): add tests to CI steps ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: ts strict ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: ci ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: log route loader ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: log route outlet action ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: log route action ([@JesusTheHun](https://github.com/JesusTheHun))
- fix: faulty router initialization ([@JesusTheHun](https://github.com/JesusTheHun))
- wip: tests ([@JesusTheHun](https://github.com/JesusTheHun))
- wip: impl ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.15 (Tue Aug 30 2022)

- fix: event order ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: support for descendant routes ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.14 (Fri Aug 19 2022)

- feat: support for easy outlet ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.13 (Tue Aug 02 2022)

- fix: query string question mark inconsistencies ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.12 (Tue Aug 02 2022)

- test: add basic nested routing stories ([@JesusTheHun](https://github.com/JesusTheHun))
- change(event): remove matchedRoutes prop as the fix cannot be delivered before the next react-router version ([@JesusTheHun](https://github.com/JesusTheHun))
- fix: double parsing of route pattern ([@JesusTheHun](https://github.com/JesusTheHun))
- readme: add tiny contribution guideline ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.11 (Fri Jul 29 2022)

- readme: add doc about location state ([@JesusTheHun](https://github.com/JesusTheHun))
- test: add stories to test location state ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: add support for location state ([@JesusTheHun](https://github.com/JesusTheHun))
- misc: improve event properties order & consistency ([@JesusTheHun](https://github.com/JesusTheHun))
- misc: set node version to 16.15.1 ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.10 (Thu Jun 23 2022)

- fix: react-inspector is core dep not devDep ([@JesusTheHun](https://github.com/JesusTheHun))
- readme: add compatibility mentions ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.9 (Wed Jun 22 2022)

- patch addon to support both React 17 & 18 ([@JesusTheHun](https://github.com/JesusTheHun))
- bump to node version 16 ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: add support for React 18 ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.8 (Mon Jun 06 2022)

- attempt to fix badges in storybook catalog ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.7 (Wed May 11 2022)

- fix: double initial rendering navigation event ([@JesusTheHun](https://github.com/JesusTheHun))
- misc: better event name ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: initial rendering no longer increment the counter in the panel title ([@JesusTheHun](https://github.com/JesusTheHun))
- feat: use header component to test router decorator ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.6 (Wed May 11 2022)

- fix: remove default preview decorator ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.5 (Wed May 11 2022)

- export withRouter decorator ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.4 (Wed May 11 2022)

- readme: improve overall documentation ([@JesusTheHun](https://github.com/JesusTheHun))
- readme: improve the getting started section ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))

---

# v0.1.1 (Wed May 11 2022)

- add some badges ([@JesusTheHun](https://github.com/JesusTheHun))
- change license to Unlicense ([@JesusTheHun](https://github.com/JesusTheHun))
- fix: wrong storybook catalog icon ([@JesusTheHun](https://github.com/JesusTheHun))

#### Authors: 1

- Jesus The Hun ([@JesusTheHun](https://github.com/JesusTheHun))
