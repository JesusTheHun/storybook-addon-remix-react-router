import React from 'react';
import type { Theme } from 'storybook/internal/theming';
import { withTheme } from 'storybook/internal/theming';
import { ObjectInspector } from 'react-inspector';

interface InspectorProps {
  theme: Theme;
  sortObjectKeys?: boolean;
  showNonenumerable?: boolean;
  name: any;
  data: any;
  depth?: number;
  expandPaths?: string | string[];
}

export const ThemedInspector = withTheme(({ theme, ...props }: InspectorProps) => (
  <ObjectInspector theme={theme.addonActionsTheme || 'chromeLight'} {...props} />
));
