import React, {Fragment} from "react";
import {styled} from '@storybook/theming';
import {EVENTS} from "../constants";
import {ActionBar, ScrollArea, ScrollAreaProps} from "@storybook/components";
import {RouterEventDisplayWrapper} from "./RouterEventDisplayWrapper";
import {ThemedInspector} from "./ThemedInspector";
import {InspectorContainer} from "./InspectorContainer";
import {NavigationEventsValues, RouterEvent} from "../typings";
import {FCC} from "../fixes";

export type PanelContentProps = {
  navigationEvents: RouterEvent[];
  onClear: () => void;
}

export const PatchedScrollArea = ScrollArea as FCC<ScrollAreaProps>;

export const PanelContent: FCC<PanelContentProps> = ({navigationEvents, onClear}) => {

  return (
    <Fragment>
      <Wrapper title="reactRouterLogger">
        {navigationEvents.map(event => {
          return (
            <RouterEventDisplayWrapper key={event.key}>
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
          )
        })}
      </Wrapper>

      <ActionBar actionItems={[{title: 'Clear', onClick: onClear}]}/>
    </Fragment>
  )
}

export const humanReadableEventNames: Record<NavigationEventsValues, string> = {
  [EVENTS.NAVIGATION]: "Navigate to",
  [EVENTS.STORY_LOADED]: "Story rendered at",
  [EVENTS.ROUTE_MATCHES]: "New route matches",
};

export const Wrapper = styled(({children, className}) => (
  <PatchedScrollArea horizontal vertical className={className}>
    {children}
  </PatchedScrollArea>
))({
  margin: 0,
  padding: '10px 5px 20px',
});
Wrapper.displayName = "Wrapper";
