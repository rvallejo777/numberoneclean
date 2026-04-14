import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, phone = '', service = '', priority = 'Media' } = data;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const stmt = db.prepare('INSERT INTO leads (name, phone, service, priority) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name, phone, service, priority);

    return NextResponse.json({ 
      success: true, 
      message: 'Lead saved successfully',
      id: info.lastInsertRowid 
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json({ error: 'Error saving lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM leads ORDER BY createdAt DESC');
    const leads = stmt.all();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Error fetching leads' }, { status: 500 });
  }
}
