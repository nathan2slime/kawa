export const getErrorMessage = (
  data: Record<string, string[]> = {},
  field: string,
) => {
  const errors = data[field];

  if (errors && errors.length > 0) return errors[0];
};
