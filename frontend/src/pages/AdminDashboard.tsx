import { FormEvent, useEffect, useState } from 'react';
import { adminApi } from '../api/admin';
import type { ClassItem, Subject, User } from '../types';

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);

  async function load() {
    const [u, s, c] = await Promise.all([adminApi.users(), adminApi.subjects(), adminApi.classes()]);
    setUsers(u); setSubjects(s); setClasses(c);
  }
  useEffect(() => { load(); }, []);

  async function addUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await adminApi.createUser({ username: String(f.get('username')), email: String(f.get('email')), password: '123456', role: f.get('role') as User['role'] });
    e.currentTarget.reset(); load();
  }

  async function addSubject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await adminApi.createSubject({ name: String(f.get('name')) });
    e.currentTarget.reset(); load();
  }

  async function addClass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await adminApi.createClass({ name: String(f.get('name')), code: String(f.get('code')), subjectId: Number(f.get('subjectId')), teacherId: Number(f.get('teacherId')) });
    e.currentTarget.reset(); load();
  }

  async function enroll(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await adminApi.enroll(Number(f.get('classId')), Number(f.get('studentId')));
    e.currentTarget.reset(); load();
  }

  return (
    <main className="page grid-page">
      <section><h2>Accounts</h2><form onSubmit={addUser} className="inline-form"><input name="username" placeholder="Name" /><input name="email" placeholder="Email" /><select name="role"><option value="teacher">Teacher</option><option value="student">Student</option></select><button>Add</button></form>{users.map(u => <p key={u.id}>{u.username} - {u.email} - {u.role} <button onClick={() => adminApi.deleteUser(u.id).then(load)}>Delete</button></p>)}</section>
      <section><h2>Subjects</h2><form onSubmit={addSubject} className="inline-form"><input name="name" placeholder="Subject name" /><button>Add</button></form>{subjects.map(s => <p key={s.id}>{s.name}</p>)}</section>
      <section><h2>Classes</h2><form onSubmit={addClass} className="inline-form"><input name="name" placeholder="Class name" /><input name="code" placeholder="Code" /><select name="subjectId">{subjects.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}</select><select name="teacherId">{users.filter(u => u.role === 'teacher').map(t => <option value={t.id} key={t.id}>{t.username}</option>)}</select><button>Add</button></form>{classes.map(c => <p key={c.id}>{c.name} - {c.code} - {c.teacher?.username}</p>)}</section>
      <section><h2>Enroll student</h2><form onSubmit={enroll} className="inline-form"><select name="classId">{classes.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}</select><select name="studentId">{users.filter(u => u.role === 'student').map(s => <option value={s.id} key={s.id}>{s.username}</option>)}</select><button>Enroll</button></form></section>
    </main>
  );
}
