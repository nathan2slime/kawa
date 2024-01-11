import { create, test, enforce, only } from 'vest';

export const schema = create((data = {}, field: string) => {
  only(field);

  test('username', 'Field is required', () => {
    enforce(data.username).isNotBlank();
  });
});
