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
    return <div>Test</div>;
};