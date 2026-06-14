import { useState } from 'react';
import { AddProductForm } from '../AddProductForm';
import { AdminProductsList } from '../AdminProductsList';
import {type Product} from "../../../shared/api/api"


export const ProductTab = () => {
    // Тепер хуки знаходяться на верхньому рівні компонента
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const triggerRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
        setEditingProduct(null);
    };

    return (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '20px' }}>
            <div style={{ flex: '1 1 300px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px' }}>
                <AddProductForm 
                    editingProduct={editingProduct} 
                    onSuccess={triggerRefresh} 
                    onCancel={() => setEditingProduct(null)}
                />
            </div>
            <div style={{ flex: '2 1 600px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px' }}>
                <AdminProductsList 
                    onEdit={setEditingProduct} 
                    refreshTrigger={refreshTrigger}
                    onDeleteSuccess={triggerRefresh}
                />
            </div>
        </div>
    );
};