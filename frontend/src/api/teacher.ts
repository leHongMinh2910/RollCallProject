import { api } from './client';
import type { Attendance, AttendanceStatus, ClassItem, LeaveRequest, Lesson, NotificationItem } from '../types';

export const teacherApi = {
  classes: () => api.get<ClassItem[]>('/teacher/classes').then(r => r.data),
  lessons: () => api.get<Lesson[]>('/teacher/lessons').then(r => r.data),
  createLesson: (payload: Partial<Lesson>) => api.post<Lesson>('/teacher/lessons', payload).then(r => r.data),
  attendances: (lessonId: number) => api.get<Attendance[]>(`/teacher/lessons/${lessonId}/attendances`).then(r => r.data),
  mark: (lessonId: number, studentId: number, status: AttendanceStatus) => api.post<Attendance>('/teacher/attendances', { lessonId, studentId, status }).then(r => r.data),
  leaveRequests: () => api.get<LeaveRequest[]>('/teacher/leave-requests').then(r => r.data),
  updateLeave: (id: number, status: string) => api.patch<LeaveRequest>(`/teacher/leave-requests/${id}`, { status }).then(r => r.data),
  notifications: () => api.get<NotificationItem[]>('/teacher/notifications').then(r => r.data),
  readNotification: (id: number) => api.patch<NotificationItem>(`/teacher/notifications/${id}/read`).then(r => r.data)
};
