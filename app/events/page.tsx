import EventTable from '../components/EventTable';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
          <p className="mt-2 text-gray-600">View all scheduled events in the system</p>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <EventTable />
        </div>
      </div>
    </div>
  );
}
