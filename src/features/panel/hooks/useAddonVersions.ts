import { compareVersions } from 'compare-versions';
import { useEffect, useState } from 'react';
import { ADDON_VERSION } from '../../../constants';

export function useAddonVersions() {
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    if (version !== undefined) return;

    const abortController = new AbortController();
    fetch(`https://registry.npmjs.org/storybook-addon-react-router-v6/latest`, { signal: abortController.signal })
      .then((b) => b.json())
      .then((json) => setVersion(json.version))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});

    return () => abortController.abort();
  }, [version]);

  const newVersionAvailable = version === undefined ? undefined : compareVersions(version, ADDON_VERSION) === 1;

  return {
    currentAddonVersion: ADDON_VERSION,
    latestAddonVersion: version,
    addonUpdateAvailable: newVersionAvailable,
  };
}
