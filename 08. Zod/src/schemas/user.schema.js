import {z} from 'zod';

const geoSchema = z.object({
    lat:z.string().trim(),
    lng:z.string().trim()
})

const addressSchema = z.object({
    street:z.string().trim().optional(),
    suite:z.string().trim().optional(),
    city:z.string().trim().optional(),
    zipcode:z.string().trim().regex(/^\d{6}$/,"Zipcode must be of 6 digits only"),
    geo:geoSchema.optional()
})

const companySchema = z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  });

export const userSchema = z.object({
    name:z.string().trim().min(4,"Name must be 4 or more characters"),
    username:z.string().trim().min(4,"Username must be minimum 4 or more characters").max(12,"Username must be maximum 12 or less characters"),
    email:z.string().trim().toLowerCase().email("Email must be in correct format (e.g. example@gmail.com)"),
    phone:z.string().trim().regex(/^[0-9]+$/,"Phone number must contains digits only").length(10,"Phone number must be of 10 digits only").transform(val => `+91 ${val.slice(0,5)} ${val.slice(5)}`),
    website:z.string().trim().toLowerCase().min(5,"Website url must contain at least 5 characters").refine((val => val.indexOf('.') !== -1),"Invalid Url").optional(),
    address:addressSchema,
    company:companySchema
})
