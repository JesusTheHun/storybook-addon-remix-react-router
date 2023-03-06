import React from "react";
import {useFetcher} from "react-router-dom";
import {StoryRouteTree} from "../../../src/components/StoryRouteTree";

export default {
  component: StoryRouteTree,
};

function MyForm() {
  const fetcher = useFetcher();

  return (
      <div>
        <fetcher.Form method="post">
          <input type="hidden" name="foo" value="bar" />
          <button type="submit">Submit</button>
        </fetcher.Form>
      </div>
  );
}

export const FormData = {
  args: {
    action: async () => ({ result: 42 }),
    children: <MyForm />
  }
}
