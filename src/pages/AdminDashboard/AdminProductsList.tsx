import { useEffect, useState } from 'react';
import { api, type Product } from '../../shared/api/api';
import { Button } from '../../shared/ui/Button/Button';

interface AdminProductsListProps {
    onEdit: (product: Product) => void;
    refreshTrigger: number;
    onDeleteSuccess: () => void;
}

export const AdminProductsList = ({ onEdit, refreshTrigger, onDeleteSuccess }: AdminProductsListProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = () => {
        api.getProducts().then(res => setProducts(res)).catch(console.error);
    };

    // Оновлюємо список щоразу, коли змінюється тригер refreshTrigger
    useEffect(() => {
        fetchProducts();
    }, [refreshTrigger]);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.deleteProduct(id);
                onDeleteSuccess();
            } catch (error) {
                console.error("Failed to delete product", error);
            }
        }
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Manage Products</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: '#7A7A7A', fontSize: '14px' }}>
                            <th style={{ padding: '10px' }}>Image</th>
                            <th style={{ padding: '10px' }}>Name</th>
                            <th style={{ padding: '10px' }}>Price</th>
                            <th style={{ padding: '10px' }}>Stock</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee', fontSize: '15px' }}>
                                <td style={{ padding: '10px' }}>
                                    <img 
                                        src={product.imgUrl} 
                                        alt={product.name} 
                                        style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} 
                                    />
                                </td>
                                <td style={{ padding: '10px', fontWeight: 500 }}>
                                    {product.name}
                                    <div style={{ fontSize: '12px', color: '#A0A0A0', fontWeight: 400 }}>{product.brand}</div>
                                </td>
                                <td style={{ padding: '10px' }}>UAH {product.price.toFixed(2)}</td>
                                <td style={{ padding: '10px' }}>
                                    <span style={{ color: product.stock === 0 ? '#C0392B' : 'inherit' }}>
                                        {product.stock} pcs
                                    </span>
                                </td>
                                <td style={{ padding: '10px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <Button variant="outline" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => onEdit(product)}>
                                            Edit
                                        </Button>
                                        <Button variant="outline" style={{ padding: '6px 12px', fontSize: '13px', borderColor: '#C0392B', color: '#C0392B' }} onClick={() => handleDelete(product.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};