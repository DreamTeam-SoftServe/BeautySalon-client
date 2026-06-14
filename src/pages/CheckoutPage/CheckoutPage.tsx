import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../shared/api/api';
import { useCart } from '../../app/providers/CartProvider';
import { useAuth } from '../../shared/auth/context'; 
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';
import { PageHeader } from '../../shared/ui/PageHeader';
import { useI18n } from '../../shared/i18n';

import {
    pageWrapStyle, containerStyle, formSectionStyle, 
    summarySectionStyle, sectionTitleStyle, summaryItemStyle, totalStyle
} from './CheckoutPage.styles';

export const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart, removeFromCart, triggerToast } = useCart(); 
    const { user } = useAuth(); 
    const navigate = useNavigate();
    const { t } = useI18n();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        deliveryType: 'Pickup in Studio',
        deliveryCity: '',     
        deliveryAddress: ''   
    });

    // Підтягуємо дані користувача, якщо він залогінений
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                firstName: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ')[1] || '',
                phoneNumber: user.phone || ''
            }));
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            triggerToast(t.store.checkoutPage.emptyError);
            return;
        }

        const orderData = {
            ...formData,
            items: cartItems.map(item => ({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            await api.submitOrder(orderData);
            clearCart();
            
            triggerToast(t.store.checkoutPage.successMessage);
            
            setTimeout(() => {
                navigate('/store'); 
            }, 1500);
        } catch (error) {
            console.error('Error submitting order', error);
            triggerToast(t.store.checkoutPage.error);
        }
    };
    if (cartItems.length === 0) {
        return (
            <div style={pageWrapStyle}>
                <PageHeader 
                title={t.store.checkoutPage.title} 
                subtitle={t.store.checkoutPage.eyebrow} 
                body={t.store.checkoutPage.body}/>
                <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <h2 style={{ color: '#1A1A1A', marginBottom: '20px' }}>{t.store.emptyCart}</h2>
                    <Button onClick={() => navigate('/store')}>{t.store.backToStore}</Button>
                </div>
            </div>
        );
    }

    return (
        <div style={pageWrapStyle}>
            <PageHeader 
                title={t.store.checkoutPage.title} 
                subtitle={t.store.checkoutPage.eyebrow} 
                body={t.store.checkoutPage.body}/>

            <div style={containerStyle}>
                {/* Колонки: Доставка */}
                <div style={formSectionStyle}>
                    <h2 style={sectionTitleStyle}>{t.store.checkoutPage.deliveryDetails}</h2>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '13px', color: '#7A7A7A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {t.store.checkoutPage.deliveryMethod}
                            </label>
                            <select 
                                value={formData.deliveryType} 
                                onChange={e => setFormData({...formData, deliveryType: e.target.value})}
                                style={{ 
                                    padding: '14px', 
                                    borderRadius: '8px', 
                                    border: '1px solid #D4C5A0', 
                                    backgroundColor: 'transparent',
                                    fontFamily: 'inherit',
                                    fontSize: '16px',
                                    outline: 'none'
                                }}
                            >
                                <option value="Pickup in Studio">{t.store.checkoutPage.pickup}</option>
                                <option value="Nova Poshta Delivery">{t.store.checkoutPage.novaPoshta}</option>
                            </select>
                        </div>

                        {/* ДОДАНО: Поля для Нової Пошти */}
                        {formData.deliveryType === 'Nova Poshta Delivery' && (
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <Input 
                                        label="Місто"
                                        placeholder="Київ" 
                                        value={formData.deliveryCity} 
                                        onChange={e => setFormData({...formData, deliveryCity: e.target.value})} 
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Input 
                                        label="Відділення / Адреса"
                                        placeholder="Відділення №15" 
                                        value={formData.deliveryAddress} 
                                        onChange={e => setFormData({...formData, deliveryAddress: e.target.value})} 
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* ПОЛЯ ДЛЯ НЕЗАЛОГІНЕНИХ: Ховаємо, якщо user існує */}
                        {!user && (
                            <>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ flex: 1 }}>
                                        <Input 
                                            label={t.store.checkoutPage.firstName}
                                            placeholder="Іван" 
                                            value={formData.firstName} 
                                            onChange={e => setFormData({...formData, firstName: e.target.value})} 
                                            required
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Input 
                                            label={t.store.checkoutPage.lastName}
                                            placeholder="Іванов" 
                                            value={formData.lastName} 
                                            onChange={e => setFormData({...formData, lastName: e.target.value})} 
                                            required
                                        />
                                    </div>
                                </div>

                                <Input 
                                    label={t.store.checkoutPage.phone}
                                    placeholder="+380..." 
                                    value={formData.phoneNumber} 
                                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})} 
                                    required
                                />
                            </>
                        )}

                        <Button type="submit" variant="primary" style={{ marginTop: '20px', padding: '16px' }}>
                            {t.store.checkoutPage.confirmOrder}
                        </Button>
                    </form>
                </div>

                {/* Колонки: Кошик */}
                <div style={summarySectionStyle}>
                    <h2 style={sectionTitleStyle}>{t.store.checkoutPage.orderSummary}</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={summaryItemStyle}>
                                <div style={{ flex: 1, paddingRight: '15px' }}>
                                    <div style={{ fontWeight: 500, color: '#1A1A1A' }}>{item.name}</div>
                                    <div style={{ fontSize: '13px', color: '#A0A0A0' }}>x{item.quantity}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                    <span>{(item.price * item.quantity).toFixed(2)} UAH</span>
                                    {/* ДОДАНО: Кнопка видалення товару */}
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ background: 'none', border: 'none', color: '#C0392B', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        Видалити
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={totalStyle}>
                        <span>{t.store.checkoutPage.total}</span>
                        <span style={{ color: '#D4C5A0' }}>{totalPrice.toFixed(2)} UAH</span>
                    </div>
                </div>
            </div>
        </div>
    );
};