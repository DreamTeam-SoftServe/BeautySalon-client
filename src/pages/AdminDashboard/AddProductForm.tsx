import React, { useState, useEffect } from 'react';
import { api, type Product } from '../../shared/api/api';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';
import { useI18n } from '../../shared/i18n'; // ДОДАНО

interface AddProductFormProps {
    editingProduct: Product | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const AddProductForm = ({ editingProduct, onSuccess, onCancel }: AddProductFormProps) => {
    const { t } = useI18n(); // ДОДАНО
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '', brand: '', category: 0, price: '', stock: '', description: '', volume: ''
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name, brand: editingProduct.brand, category: editingProduct.category,
                price: editingProduct.price.toString(), stock: editingProduct.stock.toString(),
                description: editingProduct.description, volume: editingProduct.volume.toString()
            });
        } else {
            setFormData({ name: '', brand: '', category: 0, price: '', stock: '', description: '', volume: '' });
        }
        setFile(null);
    }, [editingProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let finalImgUrl = editingProduct ? editingProduct.imgUrl : '';
            if (file) {
                const uploadRes = await api.uploadImage(file, "products");
                finalImgUrl = uploadRes.url; 
            }
            const payload = {
                name: formData.name, brand: formData.brand, category: Number(formData.category),
                price: parseFloat(formData.price), stock: parseInt(formData.stock),
                description: formData.description, volume: parseInt(formData.volume),
                imgUrl: finalImgUrl
            };
            if (editingProduct) {
                await api.updateProduct(editingProduct.id, payload);
                alert(t.admin.products.successEdit); // ЗАМІНЕНО
            } else {
                await api.createProduct(payload);
                alert(t.admin.products.successAdd); // ЗАМІНЕНО
            }
            onSuccess(); 
        } catch (error) {
            console.error('Error saving product', error);
            alert(t.admin.products.errorSave); // ЗАМІНЕНО
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ margin: 0 }}>
                {editingProduct ? `${t.admin.products.formTitleEdit} ${editingProduct.name}` : t.admin.products.formTitleAdd}
            </h3>
            
            <Input placeholder={t.admin.products.namePh} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <Input placeholder={t.admin.products.brandPh} value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required />
            
            <select value={formData.category} onChange={e => setFormData({...formData, category: parseInt(e.target.value)})} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #D4C5A0', fontFamily: 'inherit' }}>
                <option value={0}>{t.store.categories.shampoo}</option>
                <option value={1}>{t.store.categories.conditioner}</option>
                <option value={2}>{t.store.categories.stylingOil}</option>
                <option value={3}>{t.store.categories.hairMask}</option>
                <option value={4}>{t.store.categories.hairOil}</option>
                <option value={5}>{t.store.categories.hairSpray}</option>
                <option value={6}>{t.store.categories.hairDye}</option>
                <option value={7}>{t.store.categories.treatment}</option>
                <option value={8}>{t.store.categories.tools}</option>
            </select>

            <Input type="number" placeholder={t.admin.products.pricePh} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            <Input type="number" placeholder={t.admin.products.stockPh} value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
            <Input type="number" placeholder={t.admin.products.volumePh} value={formData.volume} onChange={e => setFormData({...formData, volume: e.target.value})} required />
            
            <textarea placeholder={t.admin.products.descPh} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #D4C5A0', minHeight: '80px', fontFamily: 'inherit' }} />

            <div style={{ fontSize: '13px', color: '#7A7A7A' }}>
                {editingProduct && t.admin.products.imgHint}
                <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button type="submit" style={{ flex: 1 }}>
                    {editingProduct ? t.admin.dashboard.buttons.saveChanges : t.admin.products.saveProduct}
                </Button>
                {editingProduct && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        {t.admin.products.cancel}
                    </Button>
                )}
            </div>
        </form>
    );
};