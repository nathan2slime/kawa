import { create, test, enforce, only, skipWhen } from 'vest';
import 'vest/enforce/email';

export const schema = create((data = {}, field?: string) => {
  field && only(field);

  test('name', 'Field is required', () => {
    enforce(data.name).isNotBlank();
  });

  skipWhen(
    res => res.hasErrors('name'),
    () => {
      test('email', 'Field is required', () => {
        enforce(data.email).isNotBlank();
      });
    },
  );

  test('email', 'Email is invalid', () => {
    enforce(data.email).isEmail();
  });

  skipWhen(
    res => res.hasErrors('email'),
    () => {
      test('phone', 'Field is required', () => {
        enforce(data.phone).isNotBlank();
      });
    },
  );

  skipWhen(
    res => res.hasErrors('email'),
    () => {
      test('phone', 'Phone is invalid', () => {
        enforce(data.phone.replace(/\D+/g, '')).lengthEquals(12);
      });
    },
  );

  test('document', 'Field is required', () => {
    enforce(data.document).isNotBlank();
  });

  test('document', 'CPF is invalid', () => {
    enforce(data.document.replace(/\D+/g, '')).lengthEquals(11);
  });
});
