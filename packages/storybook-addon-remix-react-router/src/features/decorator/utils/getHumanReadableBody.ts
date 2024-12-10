import { FileSummary, getFormDataSummary } from './getFormDataSummary';

export async function getHumanReadableBody(request: Request) {
  const requestClone = request.clone();
  const contentTypeHeader = requestClone.headers.get('content-type') || '';

  let humanReadableBody: string | Record<string, string | FileSummary> | undefined = undefined;

  switch (true) {
    case contentTypeHeader.startsWith('text'):
      humanReadableBody = await requestClone.text();
      break;
    case contentTypeHeader.startsWith('application/json'):
      humanReadableBody = await requestClone.json();
      break;
    case contentTypeHeader.startsWith('multipart/form-data'):
    case contentTypeHeader.startsWith('application/x-www-form-urlencoded'): {
      humanReadableBody = getFormDataSummary(await requestClone.formData());
      break;
    }
  }

  return humanReadableBody;
}
