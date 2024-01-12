import { create, test, enforce, only, skipWhen } from 'vest';

export const schema = create((data = {}, field?: string) => {
  field && only(field);

  test('search', 'Field is required', () => {
    enforce(data.search).isNotBlank();
  });
});
