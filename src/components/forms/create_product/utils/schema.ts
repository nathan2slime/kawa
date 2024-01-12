import { create, test, enforce, only, skipWhen } from 'vest';
import 'vest/enforce/email';

export const schema = create((data = {}, field?: string) => {
  field && only(field);

  test('name', 'Field is required', () => {
    enforce(data.name).isNotBlank();
  });
});
