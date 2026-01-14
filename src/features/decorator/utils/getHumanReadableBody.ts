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
      try {
        humanReadableBody = getFormDataSummary(await requestClone.formData());
      } catch {
        // formData parsing can fail in certain environments (e.g., @web3-storage/multipart-parser in vitest)
        // This is only for logging purposes, so gracefully degrade instead of crashing
        humanReadableBody = undefined;
      }
      break;
    }
  }

  return humanReadableBody;
}
