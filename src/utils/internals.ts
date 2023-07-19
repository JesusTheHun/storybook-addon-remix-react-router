export type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
};

export function defer<T = void>(): Deferred<T> {
  const deferred: Partial<Deferred<T>> = {};

  deferred.promise = new Promise<T>((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred as Deferred<T>;
}

export type FileSummary = { filename: string; filesize: number; filetype: string };

export function getFormDataSummary(formData: FormData): Record<string, string | FileSummary> {
  const data: Record<string, string | FileSummary> = {};

  formData.forEach((value, key) => {
    if (value instanceof File) {
      data[key] = {
        filename: value.name,
        filesize: value.size,
        filetype: value.type,
      };
      return;
    }

    data[key] = value;
  });

  return data;
}

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

export function searchParamsToRecord(searchParams: URLSearchParams) {
  const result: Record<string, string | string[]> = {};

  searchParams.forEach((value, key) => {
    const currentValue = result[key];
    if (typeof currentValue === 'string') {
      result[key] = [currentValue, value];
      return;
    }

    if (Array.isArray(currentValue)) {
      result[key] = [...currentValue, value];
      return;
    }

    result[key] = value;
  });

  return result;
}
