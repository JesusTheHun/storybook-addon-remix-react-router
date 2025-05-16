import { styled, StyledComponent } from 'storybook/theming';
import { ReactNode } from 'react';

export const InspectorContainer: StyledComponent<{ children: ReactNode }> = styled.div({
  flex: 1,
  padding: '0 0 0 5px',
});
