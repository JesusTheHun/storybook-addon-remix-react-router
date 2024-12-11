import { styled, StyledComponent } from '@storybook/theming';
import { ReactNode } from 'react';

export const RouterEventDisplayWrapper: StyledComponent<{ children: ReactNode }> = styled.div({
  display: 'flex',
  padding: 0,
  borderLeft: '5px solid transparent',
  borderBottom: '1px solid transparent',
  transition: 'all 0.1s',
  alignItems: 'flex-start',
  whiteSpace: 'pre',
});
