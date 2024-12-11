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
