import { FormEvent, useEffect, useState } from 'react';
import { teacherApi } from '../api/teacher';
import type { Attendance, AttendanceStatus, ClassItem, LeaveRequest, Lesson } from '../types';

export function TeacherDashboard() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  async function load() {
    const [c, l, lr] = await Promise.all([teacherApi.classes(), teacherApi.lessons(), teacherApi.leaveRequests()]);
    setClasses(c); setLessons(l); setLeaveRequests(lr);
  }
  useEffect(() => { load(); }, []);

  async function createLesson(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await teacherApi.createLesson({ name: String(f.get('name')), lessonDate: String(f.get('lessonDate')), classId: Number(f.get('classId')), isOpen: true });
    e.currentTarget.reset(); load();
  }

  async function openAttendance(lessonId: number) {
    setAttendances(await teacherApi.attendances(lessonId));
  }

  async function mark(a: Attendance, status: AttendanceStatus) {
    await teacherApi.mark(a.lessonId, a.studentId, status);
    openAttendance(a.lessonId);
  }

  return (
    <main className="page grid-page">
      <section><h2>Create lesson</h2><form onSubmit={createLesson} className="inline-form"><input name="name" placeholder="Lesson name" /><input type="date" name="lessonDate" /><select name="classId">{classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><button>Create</button></form></section>
      <section><h2>Lessons</h2>{lessons.map(l => <p key={l.id}>{l.name} - {l.lessonDate} - {l.class?.name} <button onClick={() => openAttendance(l.id)}>Attendance</button></p>)}</section>
      <section><h2>Attendance</h2>{attendances.map(a => <p key={a.id}>{a.student?.username}: <select value={a.status} onChange={(e) => mark(a, e.target.value as AttendanceStatus)}><option value="pending">Pending</option><option value="present">Present</option><option value="absent">Absent</option><option value="late">Late</option><option value="excused">Excused</option></select></p>)}</section>
      <section><h2>Leave requests</h2>{leaveRequests.map(r => <p key={r.id}>{r.student?.username}: {r.reason} [{r.status}] <button onClick={() => teacherApi.updateLeave(r.id, 'approved').then(load)}>Approve</button> <button onClick={() => teacherApi.updateLeave(r.id, 'rejected').then(load)}>Reject</button></p>)}</section>
    </main>
  );
}
