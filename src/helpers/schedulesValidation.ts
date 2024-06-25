
import { IScheduleItem } from "@/types/schedules.types";
import * as yup from "yup";
 

const requiredString = yup
  .string()
  .typeError("Debe ser un texto")
  .required("Es requerido");

const requiredNumber = yup
  .number()
  .required("Es requerido")
  .typeError("Debe ser un número");
const shortText = yup
  .string()
  .typeError("Debe ser un texto")
  .min(2, "Mínimo 2 caracteres")
  .max(50, "Máximo 50 caracteres")
  .required();

const phonenumber = yup
  .string()
  .typeError("Debe ser un texto")
  .min(16, "Debes ingresar un número de teléfono válido");

const requiredShortText = requiredString
  .min(2, "Mínimo 2 caracteres")
  .max(50, "Máximo 50 caracteres");

const longText = yup
  .string()
  .typeError("Debe ser un texto")
  .min(3, "Mínimo 3 caracteres")
  .max(500, "Máximo 500 caracteres");

const requiredLongText = requiredString
  .min(5, "Mínimo 5 caracteres")
  .max(500, "Máximo 500 caracteres");

export const createSchedule = yup.object<IScheduleItem>().shape({
    name: requiredString,
    start: requiredString,
    end: requiredString,
    location: requiredString
});

