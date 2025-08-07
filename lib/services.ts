import { Event, PromoImage } from "./types";

export async function getTodayEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events`, {
      cache: 'no-store', // Disable caching to get fresh data
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching today\'s events:', error);
    return [];
  }
}

export async function getAllEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events?all=true`, {
      cache: 'no-store', // Disable caching to get fresh data
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching all events:', error);
    return [];
  }
}

export async function updateEvent(eventId: string, eventData: {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}): Promise<Event | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const updatedEvent = await response.json();
    return updatedEvent;
  } catch (error) {
    console.error('Error updating event:', error);
    return null;
  }
}

export async function deleteEvent(eventId: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events/${eventId}`, {
      method: 'DELETE',
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
}

export async function getPromoImages(): Promise<PromoImage[]> {
  try {
    const response = await fetch('https://api-ticketing.gms.church/servolution/test-promos', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    const remappedData = data.map((item: { image_url: string }) => ({
      imageUrl: item.image_url,
    }));

    return remappedData;
  } catch (error) {
    console.error('Error fetching promo images:', error);
    return [];
  }
}