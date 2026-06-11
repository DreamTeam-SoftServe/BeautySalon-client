import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../shared/api/api';
import type { Product } from '../../shared/api/api';
import { Button } from '../../shared/ui/Button/Button';
import { PageHeader } from '../../shared/ui/PageHeader';
import { useCart } from '../../app/providers/CartProvider';
import { useI18n } from '../../shared/i18n';

import {
    pageWrapStyle, containerStyle, imageWrapStyle, imageStyle,
    infoWrapStyle, backBtnStyle, brandStyle, titleStyle, 
    priceStyle, specRowStyle, specLabelStyle, specValueStyle, 
    descWrapStyle
} from './ProductDetailsPage.styles';

export const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { t } = useI18n();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            api.getProductById(id).then(res => setProduct(res)).catch(console.error);
        }
    }, [id]);

    if (!product) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={pageWrapStyle}>
            <PageHeader 
            title={product.name} 
            subtitle={t.store.details}
            body={t.store.body} />

            <div style={containerStyle}>
                <div style={imageWrapStyle}>
                    <img src={product.imgUrl} alt={product.name} style={imageStyle} />
                </div>
                
                <div style={infoWrapStyle}>
                    <button 
                        onClick={() => navigate('/store')} 
                        style={backBtnStyle}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#D4C5A0'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#7A7A7A'}
                    >
                        ← {t.store.backToStore}
                    </button>
                    
                    <div style={brandStyle}>{product.brand}</div>
                    <h1 style={titleStyle}>{product.name}</h1>
                    <div style={priceStyle}>{product.price.toFixed(2)} UAH</div>
                    
                    <div style={specRowStyle}>
                        <div>
                            <div style={specLabelStyle}>{t.store.volume}</div>
                            <div style={specValueStyle}>{product.volume} ml</div>
                        </div>
                        <div>
                            <div style={specLabelStyle}>{t.store.availability}</div>
                            <div style={specValueStyle}>
                                {product.stock > 0 ? (
                                    <span style={{ color: '#2ecc71' }}>{t.store.inStock} ({product.stock})</span>
                                ) : (
                                    <span style={{ color: '#C0392B' }}>{t.store.outOfStock}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div style={descWrapStyle}>
                        {product.description}
                    </div>

                    <Button 
                        variant="primary"
                        onClick={() => addToCart(product)} 
                        disabled={product.stock <= 0}
                        style={{ padding: '16px', fontSize: '16px', fontWeight: 600 }}
                    >
                        {product.stock > 0 ? t.store.addToCart : t.store.outOfStock}
                    </Button>
                </div>
            </div>
        </div>
    );
};