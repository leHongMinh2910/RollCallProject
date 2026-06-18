import { FormEvent, useEffect, useState } from 'react';
import { studentApi } from '../api/student';
import type { Attendance, ClassItem, LeaveRequest } from '../types';

export function StudentDashboard() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  async function load() {
    const [c, a, l] = await Promise.all([studentApi.classes(), studentApi.attendances(), studentApi.leaveRequests()]);
    setClasses(c); setAttendances(a); setLeaveRequests(l);
  }
  useEffect(() => { load(); }, []);

  async function requestLeave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await studentApi.createLeave(Number(f.get('lessonId')), String(f.get('reason')));
    e.currentTarget.reset(); load();
  }

  return (
    <main className="page grid-page">
      <section><h2>My classes</h2>{classes.map(c => <p key={c.id}>{c.name} - {c.subject?.name} - Teacher: {c.teacher?.username}</p>)}</section>
      <section><h2>Attendance status</h2>{attendances.map(a => <p key={a.id}>{a.lesson?.name} ({a.lesson?.class?.name}): <strong>{a.status}</strong></p>)}</section>
      <section><h2>Request leave</h2><form onSubmit={requestLeave} className="inline-form"><select name="lessonId">{attendances.map(a => <option value={a.lessonId} key={a.id}>{a.lesson?.name}</option>)}</select><input name="reason" placeholder="Reason or comment" /><button>Send</button></form></section>
      <section><h2>My leave requests</h2>{leaveRequests.map(r => <p key={r.id}>{r.lesson?.name}: {r.reason} [{r.status}]</p>)}</section>
    </main>
  );
}
