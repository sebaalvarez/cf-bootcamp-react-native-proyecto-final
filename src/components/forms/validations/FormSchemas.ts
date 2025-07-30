import * as yup from "yup";

const requeridoString = "Campo requerido";
const soloNumero = "Ingresar solo números";

// export const loginFormSchema = yup
//   .object({
//     mail: yup.string().email("mail invalido").required(requeridoString),
//     password: yup
//       .string()
//       .min(4, "Debe tener más de 4 carateres")
//       .required(requeridoString),
//   })
//   .required();

export const profileFormSchema = yup
  .object({
    nombre: yup.string().required(requeridoString),
    apellido: yup.string().required(requeridoString),
    telefono: yup.number().typeError(soloNumero).required(requeridoString),
    domicilio: yup.string().required(requeridoString),
  })
  .required();

export const userFormSchema = yup
  .object({
    usuario: yup.string().required(requeridoString),
    nombre: yup.string(), //.required(requeridoString),
    apellido: yup.string(), //.required(requeridoString),
    telefono: yup.number().typeError(soloNumero).required(requeridoString),
    mail: yup.string().required(requeridoString),
    password: yup
      .string()
      .min(6, "Debe tener al menos 6 caracteres")
      .required(requeridoString),
  })
  .required();
