import { useEffect, useState } from 'react';
import { api } from '../../../shared/api/api';
import type { OrderData } from '../../../shared/api/api';
import { useI18n } from '../../../shared/i18n'; // ДОДАНО: Імпорт хука локалізації

export const OrdersTab = () => {
    const { t } = useI18n(); // ДОДАНО: Отримуємо об'єкт з перекладами
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await api.getOrdersAdmin();
            setOrders(Array.isArray(res) ? res : []); 
        } catch (err) {
            console.error(err);
            setError(t.admin.orders.errorLoad); // Переклад помилки
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
            fetchOrders(); 
        } catch (error) {
            console.error("Failed to update status", error);
            alert(t.admin.orders.errorUpdate); // Переклад алерта
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>{t.admin.orders.loading}</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
    if (!orders || orders.length === 0) return <div style={{ padding: '20px' }}>{t.admin.orders.noOrders}</div>;

    const sortedOrders = [...orders].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 20px 0' }}>{t.admin.orders.title}</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: '#7A7A7A' }}>
                                <th style={{ padding: '12px' }}>{t.admin.orders.table.date}</th>
                                <th style={{ padding: '12px' }}>{t.admin.orders.table.customer}</th>
                                <th style={{ padding: '12px' }}>{t.admin.orders.table.items}</th>
                                <th style={{ padding: '12px' }}>{t.admin.orders.table.delivery}</th>
                                <th style={{ padding: '12px' }}>{t.admin.orders.table.total}</th>
                                <th style={{ padding: '12px' }}>{t.admin.orders.table.status}</th>
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
                                        <div style={{ marginBottom: '6px' }}>
                                            <span style={{ padding: '4px 8px', backgroundColor: '#F9F9F9', borderRadius: '4px', border: '1px solid #EEE' }}>
                                                {order.deliveryType}
                                            </span>
                                        </div>
                                        
                                        {/* Відображення міста та адреси */}
                                        {order.deliveryType === "Nova Poshta Delivery" && order.deliveryCity && (
                                            <div style={{ fontSize: '13px', color: '#555', marginTop: '6px' }}>
                                                <strong style={{ color: '#1A1A1A', fontWeight: 500 }}>{t.admin.orders.delivery.address}</strong> <br/>
                                                {order.deliveryCity}, {order.deliveryAddress}
                                            </div>
                                        )}

                                        {/* Відображення даних отримувача */}
                                        {order.guestFirstName && (
                                            <div style={{ fontSize: '12px', color: '#7A7A7A', marginTop: '6px', borderTop: '1px solid #eee', paddingTop: '4px' }}>
                                                <strong style={{ color: '#1A1A1A', fontWeight: 500 }}>{t.admin.orders.delivery.receiver}</strong> <br/>
                                                {order.guestFirstName} {order.guestLastName} <br/>
                                                {order.guestPhone}
                                            </div>
                                        )}
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
                                            {/* Динамічний рендер статусів з файлу перекладів */}
                                            {Object.entries(t.admin.orders.statuses).map(([val, label]) => (
                                                <option key={val} value={val}>{label as string}</option>
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