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

export const cambioPassSchema = yup
  .object({
    currentPassword: yup.string().required(requeridoString),
    newPassword: yup
      .string()
      .min(6, "Debe tener al menos 6 caracteres")
      .required(requeridoString),
    re_newPassword: yup
      .string()
      .required("La confirmación de la contraseña es obligatoria")
      .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden"),
  })
  .required();

export const recoveryPassSchema = yup
  .object({
    mail: yup.string().email("mail invalido").required(requeridoString),
  })
  .required();

export const resetPassSchema = yup
  .object({
    newPassword: yup
      .string()
      .min(6, "Debe tener al menos 6 caracteres")
      .required(requeridoString),
    re_newPassword: yup
      .string()
      .required("La confirmación de la contraseña es obligatoria")
      .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden"),
  })
  .required();

export const editPlatoFormSchema = yup
  .object({
    nombre: yup
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede exceder 50 caracteres")
      .required(requeridoString),
    descripcion: yup
      .string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(200, "La descripción no puede exceder 200 caracteres")
      .required(requeridoString),
    precio: yup
      .number()
      .integer("El precio debe ser un número entero")
      .positive("El precio debe ser mayor a 0")
      .required(requeridoString)
      .typeError("Debe ingresar un número válido"),
  })
  .required();

export const telefonoWhatsappSchema = yup
  .object({
    telefono: yup
      .string()
      .matches(/^\d{10}$/, "cod área (sin 0) número (sin 15) - (10 dígitos)")
      .typeError(soloNumero)
      .required(requeridoString),
  })
  .required();

export const horarioAtencionSchema = yup
  .object({
    horario: yup
      .string()
      .required(requeridoString)
      .min(5, "El horario debe tener al menos 5 caracteres")
      .max(100, "El horario no puede exceder 100 caracteres"),
  })
  .required();
