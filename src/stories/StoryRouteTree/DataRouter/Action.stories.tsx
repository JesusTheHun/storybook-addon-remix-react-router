import React from "react";
import {useFetcher} from "react-router-dom";
import {StoryRouteTree} from "../../../components/StoryRouteTree";

export default {
  component: StoryRouteTree,
};

function TinyForm() {
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

export const TextFormData = {
  args: {
    action: async () => ({ result: 42 }),
    children: <TinyForm />
  }
}


function FileForm() {
  const fetcher = useFetcher();

  return (
    <div>
      <fetcher.Form method="post" encType="multipart/form-data">
        <label htmlFor="file-uploader">Upload file:</label>
        <input id="file-uploader" type="file" name="myFile" />

        <button type="submit">Submit</button>
      </fetcher.Form>
    </div>
  );
}

export const FileFormData = {
  args: {
    action: async () => ({ result: 'file saved' }),
    children: <FileForm />
  }
}
