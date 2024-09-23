import { compareVersions } from 'compare-versions';
import { useEffect, useState } from 'react';

export function useAddonVersions() {
  const [currentVersion, setCurrentVersion] = useState<string>();
  const [latestVersion, setLatestVersion] = useState<string>();

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`https://registry.npmjs.org/storybook-addon-remix-react-router/latest`, { signal: abortController.signal })
      .then((b) => b.json())
      .then((json) => setLatestVersion(json.version))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    getAddonVersion().then((v) => setCurrentVersion(v));
  }, []);

  const newVersionAvailable =
    !latestVersion || !currentVersion ? undefined : compareVersions(latestVersion, currentVersion) === 1;

  return {
    currentAddonVersion: currentVersion,
    latestAddonVersion: latestVersion,
    addonUpdateAvailable: newVersionAvailable,
  };
}

async function getAddonVersion() {
  try {
    const packageJson = await import('../../../../package.json', {
      with: {
        type: 'json',
      },
    });

    return packageJson.version;
  } catch (error) {
    const packageJson = await import('../../../../package.json', {
      assert: {
        type: 'json',
      },
    });

    return packageJson.version;
  }
}
