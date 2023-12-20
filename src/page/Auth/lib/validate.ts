import { InferType, object, string } from 'yup';

export const userSchemaRegistration = object().shape({
  name: string()
    .min(3, "Поле 'Имя' должно содежать как минимум 3 символа")
    .required("Поле 'Имя' должно содежать минимум 3 символа"),
  email: string().email("Поле 'email' должно быть валидным").required("Поле 'email' должно быть валидным"),
  password: string()
    .min(6, "Поле 'пароль' должно содежать минимум 6 символов")
    .required("Поле 'пароль' должно содежать минимум 6 символов"),
});

export const userSchemaLogin = object({
  email: string().email("Поле 'email' должно быть валидным").required("Поле 'email' должно быть валидным"),
  password: string()
    .min(6, "Поле 'пароль' должно содержать минимум 6 символов")
    .required("Поле 'пароль' должно содежать минимум 6 символов"),
});

export type UserLogin = InferType<typeof userSchemaLogin>;
export type UserRegistration = InferType<typeof userSchemaRegistration>;
