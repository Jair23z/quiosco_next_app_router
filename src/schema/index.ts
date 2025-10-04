import z from "zod";

export const OrderSchema = z.object({
    name: z.string()
        .min(1, 'Tu Nombre es Obligatorio'),
    total: z.number()
        .min(1, 'Hay errorres en la orden'),
    order: z.array(z.object({
        id: z.number(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number(),
        name: z.string(),
    }))
})