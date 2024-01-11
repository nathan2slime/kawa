export const getErrorMessage = (
  data: Record<string, string[]> = {},
  field: string,
) => {
  const errors =  data[field];

  if (errors) {
    return errors.length > 0 && errors[0];
  }
};
