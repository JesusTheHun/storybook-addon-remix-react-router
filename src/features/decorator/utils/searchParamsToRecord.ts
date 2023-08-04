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
