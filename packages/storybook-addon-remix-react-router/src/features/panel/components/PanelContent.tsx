import { ActionBar, ScrollArea } from 'storybook/internal/components';
import { styled, StyledComponent } from 'storybook/theming';
import React, { Fragment, PropsWithChildren, ReactNode } from 'react';
import { EVENTS } from '../../../constants';
import { FCC } from '../../../fixes';
import { RouterEvent, RouterEvents } from '../types';
import { InspectorContainer } from './InspectorContainer';
import { RouterEventDisplayWrapper } from './RouterEventDisplayWrapper';
import { ThemedInspector } from './ThemedInspector';

export type PanelContentProps = {
  routerEvents: Array<RouterEvent>;
  onClear: () => void;
};

export type ScrollAreaProps = PropsWithChildren<{
  horizontal?: boolean;
  vertical?: boolean;
  className?: string;
  title: string;
}>;
const PatchedScrollArea = ScrollArea as FCC<ScrollAreaProps>;

export const PanelContent: FCC<PanelContentProps> = ({ routerEvents, onClear }) => {
  return (
    <Fragment>
      <Wrapper title="reactRouterLogger">
        {routerEvents.map((event, i) => {
          return (
            <RouterEventDisplayWrapper key={i}>
              <InspectorContainer>
                <ThemedInspector
                  name={humanReadableEventNames[event.type]}
                  data={event.data}
                  showNonenumerable={false}
                  sortObjectKeys={false}
                  expandPaths={[
                    '$.routeParams',
                    '$.searchParams',
                    '$.routeMatches.*',
                    '$.routeMatches.*.*',
                    '$.matches',
                    '$.matches.*',
                    '$.matches.*.*',
                  ]}
                />
              </InspectorContainer>
            </RouterEventDisplayWrapper>
          );
        })}
      </Wrapper>

      <ActionBar actionItems={[{ title: 'Clear', onClick: onClear }]} />
    </Fragment>
  );
};

export const humanReadableEventNames: Record<RouterEvents[keyof RouterEvents], string> = {
  [EVENTS.NAVIGATION]: 'Navigate',
  [EVENTS.STORY_LOADED]: 'Story rendered',
  [EVENTS.ROUTE_MATCHES]: 'New route matches',
  [EVENTS.ACTION_INVOKED]: 'Action invoked',
  [EVENTS.ACTION_SETTLED]: 'Action settled',
  [EVENTS.LOADER_INVOKED]: 'Loader invoked',
  [EVENTS.LOADER_SETTLED]: 'Loader settled',
};

export const Wrapper: StyledComponent<{ children: ReactNode } & ScrollAreaProps> = styled(
  ({ children, title }: ScrollAreaProps) => (
    <PatchedScrollArea horizontal vertical title={title}>
      {children}
    </PatchedScrollArea>
  )
)({
  margin: 0,
  padding: '10px 5px 20px',
});
Wrapper.displayName = 'Wrapper';
