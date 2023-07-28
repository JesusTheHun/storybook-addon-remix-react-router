import { WithReactRouter } from '../features/decorator/types';

declare module '@storybook/react' {
  type StoryObj = WithReactRouter;
}
