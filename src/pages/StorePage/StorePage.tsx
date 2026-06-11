import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../shared/api/api';
import type { Product } from '../../shared/api/api';
import { Button } from '../../shared/ui/Button/Button';
import { PageHeader } from '../../shared/ui/PageHeader';
import { useCart } from '../../app/providers/CartProvider';
import { useI18n } from '../../shared/i18n';

// Імпортуємо стилі
import {
    pageWrapStyle, containerStyle, topActionsStyle, tabsWrapStyle, 
    getTabStyle, gridStyle, cardStyle, imgWrapStyle, imgStyle, 
    contentWrapStyle, brandStyle, nameStyle, priceRowStyle, 
    priceStyle, stockStyle, buttonsRowStyle
} from './StorePage.styles';

export const StorePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<number>(-1);
    const { addToCart, cartItems } = useCart();
    const navigate = useNavigate();
    const { t } = useI18n(); 

// Категорії для фільтрів (маппінг з вашого enum)
    const PRODUCT_CATEGORIES = [
        { id: -1, label: t.store.categories.all },
        { id: 0, label: t.store.categories.shampoo },
        { id: 1, label: t.store.categories.conditioner },
        { id: 2, label: t.store.categories.stylingOil },
        { id: 3, label: t.store.categories.hairMask },
        { id: 4, label: t.store.categories.hairOil },
        { id: 5, label: t.store.categories.hairSpray },
        { id: 6, label: t.store.categories.hairDye },
        { id: 7, label: t.store.categories.treatment },
        { id: 8, label: t.store.categories.tools }
    ];

    useEffect(() => {
        api.getProducts().then(res => setProducts(res)).catch(console.error);
    }, []);

    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const filteredProducts = activeCategory === -1 
        ? products 
        : products.filter(p => p.category === activeCategory);

    return (
        <div style={pageWrapStyle}>
            <PageHeader 
                subtitle={t.store.eyebrow}
                title={t.store.title} 
                body={t.store.body} 
            />

            <div style={containerStyle}>
                
                {/* Кнопка кошика */}
                <div style={topActionsStyle}>
                    {cartItemsCount > 0 && (
                <Button variant="primary" onClick={() => navigate('/checkout')}>
                    {t.store.checkout} ({cartItemsCount})
                </Button>
                    )}
                </div>

                {/* Фільтри (Tabs) як на сторінці послуг */}
                <div style={tabsWrapStyle}>
                    {PRODUCT_CATEGORIES.map(cat => (
                        <button 
                            key={cat.id}
                            style={getTabStyle(activeCategory === cat.id)}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Сітка товарів */}
                <div style={gridStyle}>
                    {filteredProducts.map(product => (
                        <div key={product.id} style={cardStyle}>
                            
                            <div style={imgWrapStyle} onClick={() => navigate(`/store/${product.id}`)}>
                                <img src={product.imgUrl} alt={product.name} style={imgStyle} />
                            </div>
                            
                            <div style={contentWrapStyle}>
                                <div style={brandStyle}>{product.brand}</div>
                                <div style={nameStyle} onClick={() => navigate(`/store/${product.id}`)}>
                                    {product.name}
                                </div>
                                
                                <div style={priceRowStyle}>
                                    <span style={priceStyle}>{product.price.toFixed(2)} UAH</span>
                                    <span style={stockStyle}>{product.volume} ml</span>
                                </div>
                                
                                <div style={buttonsRowStyle}>
                                    <Button variant="outline" style={{ flex: 1 }} onClick={() => navigate(`/store/${product.id}`)}>
                                          {t.store.details}
                                    </Button>
                                    <Button variant="primary" style={{ flex: 1 }} onClick={() => addToCart(product)} disabled={product.stock <= 0}>
                                             {product.stock > 0 ? t.store.buy : t.store.outOfStock}
                                    </Button>                               
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
                
                {/* Якщо в категорії немає товарів */}
                {filteredProducts.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#7A7A7A', marginTop: '60px', fontSize: '16px' }}>
                        {t.store.outOfProductCategory}
                    </div>
                )}

            </div>
        </div>
    );
};