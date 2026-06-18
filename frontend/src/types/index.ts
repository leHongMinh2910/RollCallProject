export type Role = 'admin' | 'teacher' | 'student';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'pending';

export interface User { id: number; username: string; email: string; address?: string; role: Role; }
export interface Subject { id: number; name: string; }
export interface ClassItem { id: number; name: string; code: string; subjectId: number; teacherId: number; subject?: Subject; teacher?: User; students?: User[]; }
export interface Lesson { id: number; name: string; lessonDate: string; isOpen: boolean; classId: number; class?: ClassItem; }
export interface Attendance { id: number; status: AttendanceStatus; lessonId: number; studentId: number; lesson?: Lesson; student?: User; }
export interface LeaveRequest { id: number; reason: string; status: 'pending' | 'approved' | 'rejected'; lessonId: number; studentId: number; lesson?: Lesson; student?: User; }
export interface NotificationItem { id: number; title: string; message: string; read: boolean; createdAt: string; }
