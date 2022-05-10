import React from 'react';
import { withTheme } from '@storybook/theming';
import type { Theme } from '@storybook/theming';
import Inspector from "react-inspector";

interface InspectorProps {
  theme: Theme;
  sortObjectKeys: boolean;
  showNonenumerable: boolean;
  name: any;
  data: any;
  depth: number;
}

export const ThemedInspector = withTheme(({ theme, ...props }: InspectorProps) => (
  <Inspector theme={theme.addonActionsTheme || 'chromeLight'} {...props} />
));
