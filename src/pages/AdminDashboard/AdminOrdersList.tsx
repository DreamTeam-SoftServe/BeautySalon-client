import { useEffect, useState } from 'react';
import { api } from '../../shared/api/api';
import type { OrderData } from '../../shared/api/api';

// Назви статусів відповідно до вашого бекенд Enum (OrderStatus)
const STATUS_LABELS: Record<number, string> = {
    0: "Pending",
    1: "Confirmed",
    2: "Shipped",
    3: "Completed",
    4: "Cancelled"
};

export const AdminOrdersList = () => {
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
        <div>Test</div>
    );
};