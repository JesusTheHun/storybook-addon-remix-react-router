import { BaseAnnotations as NativeBaseAnnotations, StoryObj as NativeStoryObj } from '@storybook/react';
import { ReactRouterAddonStoryParameters } from '../features/decorator/components/ReactRouterDecorator';
import { WithReactRouter } from '../features/decorator/types';

declare module '@storybook/react' {
  export type StoryObj = WithReactRouter<NativeStoryObj>;
  export type BaseAnnotations = NativeBaseAnnotations & {
    parameters: ReactRouterAddonStoryParameters;
  };
}
