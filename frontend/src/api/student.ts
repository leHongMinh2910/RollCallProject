import { api } from './client';
import type { Attendance, ClassItem, LeaveRequest } from '../types';

export const studentApi = {
  classes: () => api.get<ClassItem[]>('/student/classes').then(r => r.data),
  attendances: () => api.get<Attendance[]>('/student/attendances').then(r => r.data),
  leaveRequests: () => api.get<LeaveRequest[]>('/student/leave-requests').then(r => r.data),
  createLeave: (lessonId: number, reason: string) => api.post<LeaveRequest>('/student/leave-requests', { lessonId, reason }).then(r => r.data)
};
