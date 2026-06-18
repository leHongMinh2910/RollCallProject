import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { io } from 'socket.io-client';
import { API_URL } from '../api/client';
import { teacherApi } from '../api/teacher';
import type { NotificationItem } from '../types';

export function NotificationBell() {
  const [items, setItems] = useState<NotificationItem[]>([]);

  useEffect(() => {
    teacherApi.notifications().then(setItems);
    const token = localStorage.getItem('token');
    const socket = io(API_URL.replace('/api', ''), { auth: { token } });
    socket.on('notification:new', (item: NotificationItem) => setItems((prev) => [item, ...prev]));
    return () => { socket.disconnect(); };
  }, []);

  const unread = items.filter((item) => !item.read).length;
  return (
    <details className="notifications">
      <summary><Bell size={18} /> {unread}</summary>
      <div className="notifications__panel">
        {items.length === 0 && <p>No notifications</p>}
        {items.map((item) => <p key={item.id}><strong>{item.title}</strong><br />{item.message}</p>)}
      </div>
    </details>
  );
}
