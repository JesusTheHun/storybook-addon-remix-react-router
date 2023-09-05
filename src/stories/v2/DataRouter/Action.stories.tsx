import React from 'react';
import { useFetcher } from 'react-router-dom';
import { reactRouterParameters } from '../../../features/decorator/utils/routesHelpers/reactRouterParameters';
import { withRouter } from '../../../features/decorator/withRouter';

export default {
  title: 'v2/DataRouter/Action',
  decorators: [withRouter],
};

function TextForm() {
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
  render: () => <TextForm />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { action: async () => ({ result: 42 }) },
    }),
  },
};

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
  render: () => <FileForm />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { action: async () => ({ result: 'file saved' }) },
    }),
  },
};
