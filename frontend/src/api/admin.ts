import { api } from './client';
import type { ClassItem, Subject, User } from '../types';

export const adminApi = {
  users: (role?: string) => api.get<User[]>('/admin/users', { params: { role } }).then(r => r.data),
  createUser: (payload: Partial<User> & { password?: string }) => api.post<User>('/admin/users', payload).then(r => r.data),
  updateUser: (id: number, payload: Partial<User>) => api.put<User>(`/admin/users/${id}`, payload).then(r => r.data),
  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),
  subjects: () => api.get<Subject[]>('/admin/subjects').then(r => r.data),
  createSubject: (payload: Partial<Subject>) => api.post<Subject>('/admin/subjects', payload).then(r => r.data),
  classes: () => api.get<ClassItem[]>('/admin/classes').then(r => r.data),
  createClass: (payload: Partial<ClassItem>) => api.post<ClassItem>('/admin/classes', payload).then(r => r.data),
  enroll: (classId: number, studentId: number) => api.post(`/admin/classes/${classId}/students`, { studentId })
};
