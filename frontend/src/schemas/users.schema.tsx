import { z } from 'zod'

const addressSchema = z.object({
	zip_code: z.string().nonempty('Campo obrigatório'),
	street: z.string().nonempty('Campo obrigatório'),
	country: z.string().nonempty('Campo obrigatório'),
	number: z.string().nonempty('Campo obrigatório'),
	city: z.string().nonempty('Campo obrigatório'),
})

export const userSchema = z.object({
	name: z.string().nonempty('Campo obrigatório'),
	email: z.string().nonempty('Campo obrigatório').email('E-mail inválido'),
	address: addressSchema,
})

export type TUser = z.infer<typeof userSchema>
