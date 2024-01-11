import { create, test, enforce, only } from 'vest';
import 'vest/enforce/email';

export const schema = create((data = {}, field: string) => {
  only(field);

  test('name', 'Field is required', () => {
    enforce(data.name).isNotBlank();
  });

  test('email', 'Field is required', () => {
    enforce(data.email).isNotBlank();
  });

  test('phone', 'Field is required', () => {
    enforce(data.phone).isNotBlank();
  });


  test('email', 'Email is invalid', () => {
    enforce(data.email).isEmail();
  });

  test('document', 'Field is required', () => {
    enforce(data.document).isNotBlank();
  });

  test('document', 'CPF is invalid', () => {
    enforce(data.document).lengthEquals(14);
  });
});
