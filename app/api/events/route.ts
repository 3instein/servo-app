import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching today\'s events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch today\'s events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, date, startTime, endTime, location } = body;

    // Validate required fields
    if (!name || !date || !startTime || !endTime || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        name,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 