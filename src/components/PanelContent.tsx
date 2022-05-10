import React, {Fragment} from "react";
import {styled} from '@storybook/theming';
import {EVENTS} from "../constants";
import {ActionBar, ScrollArea} from "@storybook/components";
import {RouterEvent} from "./RouterEvent";
import {ThemedInspector} from "./ThemedInspector";
import {InspectorContainer} from "./InspectorContainer";
import {NavigationEventsValues} from "../typings";
import {getTypedEventData} from "../utils";

export type PanelContentProps = {
  navigationEvents: [NavigationEventsValues, unknown][];
  onClear: () => void;
}

export const PanelContent: React.FC<PanelContentProps> = ({navigationEvents, onClear}) => {

  return (
    <Fragment>
      <Wrapper title="reactRouterLogger">
        {navigationEvents.map(([eventName, data]) => {
          const eventData = getTypedEventData(eventName, data);

          return (
            <RouterEvent key={eventData.key}>
              <InspectorContainer>
                <ThemedInspector
                  name={humanReadableEventNames[eventName]}
                  data={eventData}
                  showNonenumerable={false}
                  sortObjectKeys={false}
                  depth={1}
                />
              </InspectorContainer>
            </RouterEvent>
          )
        })}
      </Wrapper>

      <ActionBar actionItems={[{title: 'Clear', onClick: onClear}]}/>
    </Fragment>
  )
}

export const humanReadableEventNames: Record<NavigationEventsValues, string> = {
  [EVENTS.NAVIGATION]: "Navigate to",
  [EVENTS.STORY_LOADED]: "Story loaded at",
};

export const Wrapper = styled(({children, className}) => (
  <ScrollArea horizontal vertical className={className}>
    {children}
  </ScrollArea>
))({
  margin: 0,
  padding: '10px 5px 20px',
});
Wrapper.displayName = "Wrapper";
