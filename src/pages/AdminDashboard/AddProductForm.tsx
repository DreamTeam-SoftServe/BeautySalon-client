import React, { useState, useEffect } from 'react';
import { api, type Product } from '../../shared/api/api';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';

interface AddProductFormProps {
    editingProduct: Product | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const AddProductForm = ({ editingProduct, onSuccess, onCancel }: AddProductFormProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: 0, 
        price: '',
        stock: '',
        description: '',
        volume: ''
    });

    // Ефект, який спрацьовує, коли адмін натискає "Edit" біля якогось товару
    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                brand: editingProduct.brand,
                category: editingProduct.category,
                price: editingProduct.price.toString(),
                stock: editingProduct.stock.toString(),
                description: editingProduct.description,
                volume: editingProduct.volume.toString()
            });
        } else {
            // Якщо режим редагування вимкнено, очищаємо форму
            setFormData({ name: '', brand: '', category: 0, price: '', stock: '', description: '', volume: '' });
        }
        setFile(null);
    }, [editingProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            let finalImgUrl = editingProduct ? editingProduct.imgUrl : '';

            // 1. Завантажуємо фото на S3, лише якщо обрано новий файл
            if (file) {
                const uploadRes = await api.uploadImage(file, "products");
                finalImgUrl = uploadRes.data.url; 
            }

            const payload = {
                name: formData.name,
                brand: formData.brand,
                category: Number(formData.category),
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                description: formData.description,
                volume: parseInt(formData.volume),
                imgUrl: finalImgUrl
            };

            if (editingProduct) {
                // Режим Редагування (PUT)
                await api.updateProduct(editingProduct.id, payload);
                alert('Product updated successfully!');
            } else {
                // Режим Створення нового (POST)
                await api.createProduct(payload);
                alert('Product added successfully!');
            }
            
            onSuccess(); // Сповіщаємо батьківський компонент про успіх (для оновлення списку)
            
        } catch (error) {
            console.error('Error saving product', error);
            alert('Failed to save product.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ margin: 0 }}>
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Product'}
            </h3>
            
            <Input 
                placeholder="Product Name" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
            />
            <Input 
                placeholder="Brand" 
                value={formData.brand} 
                onChange={e => setFormData({...formData, brand: e.target.value})} 
                required 
            />
            
            <select 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: parseInt(e.target.value)})}
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #D4C5A0', fontFamily: 'inherit' }}
            >
                <option value={0}>Shampoo</option>
                <option value={1}>Conditioner</option>
                <option value={2}>Styling Oil</option>
                <option value={3}>Hair Mask</option>
                <option value={4}>Hair Oil</option>
                <option value={5}>Hair Spray</option>
                <option value={6}>Hair Dye</option>
                <option value={7}>Treatment</option>
                <option value={8}>Tools</option>
            </select>

            <Input 
                type="number" 
                placeholder="Price ($)" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
                required 
            />
            <Input 
                type="number" 
                placeholder="Stock Amount" 
                value={formData.stock} 
                onChange={e => setFormData({...formData, stock: e.target.value})} 
                required 
            />
            <Input 
                type="number" 
                placeholder="Volume (ml)" 
                value={formData.volume} 
                onChange={e => setFormData({...formData, volume: e.target.value})} 
                required 
            />
            
            <textarea 
                placeholder="Description" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required 
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #D4C5A0', minHeight: '80px', fontFamily: 'inherit' }}
            />

            <div style={{ fontSize: '13px', color: '#7A7A7A' }}>
                {editingProduct && "Leave empty to keep current image:"}
                <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={e => setFile(e.target.files ? e.target.files[0] : null)} 
                />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button type="submit" style={{ flex: 1 }}>
                    {editingProduct ? 'Save Changes' : 'Save Product'}
                </Button>
                {editingProduct && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};