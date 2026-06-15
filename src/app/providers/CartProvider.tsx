import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Product } from '../../shared/api/api';
import { THEME } from '../../shared/config/theme';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    totalPrice: number;
    triggerToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('shopping_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (toastMessage) {
            setIsToastVisible(true);
            const hideTimer = setTimeout(() => {
                setIsToastVisible(false);
            }, 2700);

            const clearTimer = setTimeout(() => {
                setToastMessage(null);
            }, 3000);

            return () => {
                clearTimeout(hideTimer);
                clearTimeout(clearTimer);
            };
        }
    }, [toastMessage]);

    const triggerToast = (message: string) => {
        setToastMessage(message);
    };

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        triggerToast(`«${product.name}» успішно додано до кошика!`);
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        triggerToast("Товар видалено з кошика");
    };

    const clearCart = () => setCartItems([]);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, triggerToast }}>
            {children}
            
            {/* СТИЛІЗОВАНИЙ КОМПОНЕНТ СПОВІЩЕННЯ (TOAST) */}
            {toastMessage && (
                <div style={{
                    position: 'fixed',
                    top: '100px',
                    right: '25px',
                    backgroundColor: '#FFFFFF',
                    borderLeft: `4px solid ${THEME.colors.gold || '#D4C5A0'}`,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    padding: '16px 24px',
                    borderRadius: '4px',
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transform: isToastVisible ? 'translateX(0)' : 'translateX(120%)',
                    opacity: isToastVisible ? 1 : 0,
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    fontFamily: THEME.fonts.sans,
                }}>
                    {/* Маленька елегантна золота іконка галочки */}
                    <span style={{ 
                        color: THEME.colors.gold || '#D4C5A0', 
                        fontWeight: 'bold', 
                        fontSize: '1.1rem' 
                    }}>
                        ✓
                    </span>
                    <span style={{ 
                        color: THEME.colors.charcoal || '#1A1A1A', 
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        letterSpacing: '0.3px'
                    }}>
                        {toastMessage}
                    </span>
                </div>
            )}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};