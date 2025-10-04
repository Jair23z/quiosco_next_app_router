import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[]
    addToOrder: (product: Omit<Product, 'categoryId' | 'image'>) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void,
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({

    order: [],

    addToOrder: (product) => {

        const data = product

        let exists = false;

        const updatedOrder = get().order.map(item => {

            if (item.name === data.name) {
                exists = true;
                return {
                    ...item,
                    quantity: item.quantity >= 5 ? item.quantity : item.quantity + 1,
                    subtotal: item.quantity >= 5 ? item.subtotal : (item.quantity + 1) * item.price,
                };
            }
            return item;
        });

        if (!exists) {
            updatedOrder.push({
                ...data,
                quantity: 1,
                subtotal: data.price,
            });
        }
        set(() => ({
            order: updatedOrder
        }))
    }
    , increaseQuantity: (id) => {

        set((state) => ({
            order: state.order.map(item => item.id === id ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price } : item)
        }))
    },
    decreaseQuantity: (id) => {

        let order = get().order.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                    subtotal: (item.quantity - 1) * item.price
                }
            } else {
                return item
            }
        })

        order = order.filter(o => o.quantity > 0)

        set({
            order
        })
    },
    removeItem: (id) => {

        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set({
            order: []
        })
    }
}))