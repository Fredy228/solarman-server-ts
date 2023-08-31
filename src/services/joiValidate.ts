import Joi from "joi";

import { ETypeComponents, ETypeSets } from "../enums/EStoreType";
import { UserRole } from "../enums/EUserRole";
import { IStoreComponents } from "../interfaces/IStore";

export const contactsValidator = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  phone: Joi.string()
    .pattern(/^(\+38)?\s?(\(0\d{2}\)|0\d{2})[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/)
    .required(),
  email: Joi.string().email(),
}).options({ stripUnknown: true });

export const userCreateSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9_\-\.]{2,20}$/)
    .min(2)
    .max(20)
    .required(),
  role: Joi.string()
    .valid(UserRole.Admin, UserRole.Moderator, UserRole.User)
    .default(UserRole.User),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/)
    .required(),
}).options({ stripUnknown: true });

export const userUpdateSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9_\-\.]{2,20}$/)
    .min(2)
    .max(20),
  email: Joi.string().email(),
  role: Joi.string().valid(UserRole.Admin, UserRole.Moderator, UserRole.User),
  password: Joi.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
  ),
}).options({ stripUnknown: true });

export const createPostSchema = Joi.object({
  title: Joi.string().min(20).max(80).required(),
  year: Joi.string().max(4).required(),
  components: Joi.string().required(),
});

export const deletePostImgSchema = Joi.object({
  urlMini: Joi.string().required(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(20).max(80),
  year: Joi.string().max(4),
  components: Joi.string(),
}).options({ stripUnknown: true });

export const updateOrderSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    series: Joi.number().required(),
  }),
);

export const CreateStoreSetsSchema = Joi.object({
  title: Joi.string().min(2).max(80).required(),
  type: Joi.string()
    .valid(
      ETypeSets.All,
      ETypeSets.GreenTariff,
      ETypeSets.AutonomousStations,
      ETypeSets.BackupPower,
      ETypeSets.HybridUPS,
      ETypeSets.ForEnterprises,
    )
    .required(),
  cost: Joi.number().min(0).required(),
  power: Joi.string().min(2).max(10).required(),
  descripMain: Joi.string().required(),
  descripCharacter: Joi.string().required(),
  components: Joi.string().required(),
}).options({ stripUnknown: true });

export const CreateStoreComponentsSchema = Joi.object({
  title: Joi.string().min(2).max(80).required(),
  type: Joi.string()
    .valid(
      ETypeComponents.All,
      ETypeComponents.Panels,
      ETypeComponents.Inverters,
      ETypeComponents.Batteries,
      ETypeComponents.MountingHardware,
      ETypeComponents.Components,
      ETypeComponents.ChargingStations,
    )
    .required(),
  cost: Joi.number().min(0).required(),
  brand: Joi.string().min(2).max(20).default("unknown"),
  country: Joi.string().min(2).max(20).default("unknown"),
  descripMain: Joi.string().required(),
  descripCharacter: Joi.string().required(),
  optionSort: Joi.string().required(),
}).options({ stripUnknown: true });

export const componentsAddValidate = (
  data: Pick<
    IStoreComponents,
    "descripMain" | "optionSort" | "descripCharacter"
  >,
) =>
  Joi.object()
    .keys({
      descripMain: Joi.array().items(Joi.string()),
      optionSort: Joi.object({
        subtype: Joi.string(),
        material: Joi.string(),
        power: Joi.string(),
        voltage: Joi.string(),
        phases: Joi.string(),
        reservoir: Joi.string(),
      }),
      descripCharacter: Joi.array().items(
        Joi.object({
          subtitle: Joi.string(),
          option: Joi.array().items(Joi.string()),
        }),
      ),
    })
    .validate(data);
