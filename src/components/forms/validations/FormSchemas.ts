import * as yup from "yup";

const requeridoString = "Campo requerido";
const soloNumero = "Ingresar solo números";

export const loginFormSchema = yup
  .object({
    mail: yup.string().email("mail invalido").required(requeridoString),
    password: yup
      .string()
      .min(6, "Debe tener más de 6 carateres")
      .required(requeridoString),
  })
  .required();

export const profileFormSchema = yup
  .object({
    nombre: yup.string().required(requeridoString),
    apellido: yup.string().required(requeridoString),
    telefono: yup
      .string()
      .matches(/^\d{10}$/, "cod área (sin 0) número (sin 15) - (10 dígitos)")
      .typeError(soloNumero)
      .required(requeridoString),
    domicilio: yup.string().required(requeridoString),
  })
  .required();

export const userFormSchema = yup
  .object({
    nombre: yup.string().required(requeridoString),
    apellido: yup.string().required(requeridoString),
    telefono: yup
      .string()
      .matches(/^\d{10}$/, "cod área (sin 0) número (sin 15) - (10 dígitos)")
      .typeError(soloNumero)
      .required(requeridoString),
    mail: yup.string().email("mail invalido").required(requeridoString),
    password: yup
      .string()
      .min(6, "Debe tener al menos 6 caracteres")
      .required(requeridoString),
    re_password: yup
      .string()
      .required("La confirmación de la contraseña es obligatoria")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  })
  .required();

export const cambioPassSchema = yup.object({
  currentPassword: yup.string().required("Contraseña actual requerida"),
  newPassword: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Nueva contraseña requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden")
    .required("Confirmación requerida"),
});
