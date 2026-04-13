import { create } from 'zustand';

export const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: [],
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    set({ user });
  },
  addToCart: (product) => set((state) => {
    const itemExists = state.cart.find((item) => item.product._id === product._id);
    if (itemExists) {
      return {
        cart: state.cart.map((item) =>
          item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { product, quantity: 1, price: product.price }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.product._id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map((item) => 
      item.product._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  clearCart: () => set({ cart: [] })
}));
