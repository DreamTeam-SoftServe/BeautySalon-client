import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../shared/api/api';
import { useCart } from '../../app/providers/CartProvider';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';
import { PageHeader } from '../../shared/ui/PageHeader';
import { useI18n } from '../../shared/i18n';

import {
    pageWrapStyle, containerStyle, formSectionStyle, 
    summarySectionStyle, sectionTitleStyle, summaryItemStyle, totalStyle
} from './CheckoutPage.styles';

export const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const { t } = useI18n();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        deliveryType: 'Pickup in Studio'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            alert(t.store.checkoutPage.emptyError);
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
            alert(t.store.checkoutPage.successMessage);
            navigate('/store'); 
        } catch (error) {
            console.error('Error submitting order', error);
            alert(t.store.checkoutPage.error);
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
                {/* Left Column: Delivery Details */}
                <div style={formSectionStyle}>
                    <h2 style={sectionTitleStyle}>{t.store.checkoutPage.deliveryDetails}</h2>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <Input 
                                    label={t.store.checkoutPage.firstName}
                                    placeholder="Jane" 
                                    value={formData.firstName} 
                                    onChange={e => setFormData({...formData, firstName: e.target.value})} 
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Input 
                                    label={t.store.checkoutPage.lastName}
                                    placeholder="Doe" 
                                    value={formData.lastName} 
                                    onChange={e => setFormData({...formData, lastName: e.target.value})} 
                                    required
                                />
                            </div>
                        </div>

                        <Input 
                            label={t.store.checkoutPage.phone}
                            placeholder="+380 00 000 00 00" 
                            value={formData.phoneNumber} 
                            onChange={e => setFormData({...formData, phoneNumber: e.target.value})} 
                            required
                        />

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
                                <option value="Courier Delivery">{t.store.checkoutPage.courier}</option>
                            </select>
                        </div>

                        <Button type="submit" variant="primary" style={{ marginTop: '20px', padding: '16px' }}>
                            {t.store.checkoutPage.confirmOrder}
                        </Button>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div style={summarySectionStyle}>
                    <h2 style={sectionTitleStyle}>{t.store.checkoutPage.orderSummary}</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={summaryItemStyle}>
                                <div style={{ flex: 1, paddingRight: '15px' }}>
                                    <div style={{ fontWeight: 500, color: '#1A1A1A' }}>{item.name}</div>
                                    <div style={{ fontSize: '13px', color: '#A0A0A0' }}>x{item.quantity}</div>
                                </div>
                                <div>{(item.price * item.quantity).toFixed(2)} UAH</div>
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