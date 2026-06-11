import { useEffect, useState } from 'react';
import { api } from '../../../shared/api/api';
import type { OrderData } from '../../../shared/api/api';

// Назви статусів відповідно до вашого бекенд Enum (OrderStatus)
const STATUS_LABELS: Record<number, string> = {
    0: "Pending",
    1: "Confirmed",
    2: "Shipped",
    3: "Completed",
    4: "Cancelled"
};

export const OrdersTab = () => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Додаємо стан помилки

    const fetchOrders = async () => { // Робимо асинхронною
        try {
            setLoading(true);
            const res = await api.getOrdersAdmin();
            setOrders(Array.isArray(res) ? res : []); // Перевіряємо, чи це масив
        } catch (err) {
            console.error(err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: number) => {
        try {
            await api.updateOrderStatus(orderId, newStatus);
            fetchOrders(); // Оновлюємо таблицю після зміни статусу
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
    if (!orders || orders.length === 0) return <div style={{ padding: '20px' }}>No orders found.</div>;

    // Сортуємо: найновіші замовлення зверху
    const sortedOrders = [...orders].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div style={{ marginTop: '20px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Store Orders</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: '#7A7A7A' }}>
                            <th style={{ padding: '12px' }}>Date</th>
                            <th style={{ padding: '12px' }}>Customer</th>
                            <th style={{ padding: '12px' }}>Items</th>
                            <th style={{ padding: '12px' }}>Delivery</th>
                            <th style={{ padding: '12px' }}>Total</th>
                            <th style={{ padding: '12px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px', verticalAlign: 'top' }}>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                    <div style={{ fontSize: '12px', color: '#A0A0A0' }}>
                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>
                                <td style={{ padding: '12px', verticalAlign: 'top' }}>
                                    <div style={{ fontWeight: 500 }}>{order.firstName} {order.lastName}</div>
                                    <div style={{ color: '#7A7A7A' }}>{order.phoneNumber}</div>
                                </td>
                                <td style={{ padding: '12px', verticalAlign: 'top' }}>
                                    <ul style={{ margin: 0, paddingLeft: '16px', color: '#555' }}>
                                        {order.items.map((item, idx) => (
                                            <li key={idx}>
                                                {item.productName} 
                                                <span style={{ color: '#A0A0A0' }}> x{item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td style={{ padding: '12px', verticalAlign: 'top' }}>
                                    <span style={{ padding: '4px 8px', backgroundColor: '#F9F9F9', borderRadius: '4px', border: '1px solid #EEE' }}>
                                        {order.deliveryType}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', verticalAlign: 'top', fontWeight: 600 }}>
                                    {order.totalPrice.toFixed(2)} UAH
                                </td>
                                <td style={{ padding: '12px', verticalAlign: 'top' }}>
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, parseInt(e.target.value))}
                                        style={{ 
                                            padding: '6px', 
                                            borderRadius: '4px', 
                                            border: '1px solid #D4C5A0',
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {Object.entries(STATUS_LABELS).map(([val, label]) => (
                                            <option key={val} value={val}>{label}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>

    );
};