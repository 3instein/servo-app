'use client';

import { useState } from 'react';
import { formatTime } from '../../lib/utils';

interface Event {
  id: string;
  name: string;
  location: string;
  startTime: string;
  endTime: string;
}

interface EventPaginationProps {
  events: Event[];
}

export default function EventPagination({ events }: EventPaginationProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 2;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const startIndex = currentPage * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-[#09fcb7] mb-4">TIDAK ADA JADWAL</h2>
        <p className="text-white text-center">Tidak ada acara yang dijadwalkan untuk hari ini</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Events Display */}
      <div className="flex-1">
        {currentEvents.map((event, index) => (
          <div key={event.id} className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#09fcb7]">{event.name}</h2>
            <div className="flex flex-row text-white">
              <h3 className="flex-1 font-bold text-lg">{event.location}</h3>
              <h3 className="flex-1 flex justify-center">
                <span className="flex items-center">
                  <span className="font-bold text-lg">{startIndex + index + 1}</span>
                  <span className="text-sm ml-0.5">FL</span>
                </span>
              </h3>
              <h3 className="flex-1">
                <span className="font-bold text-lg">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </span>
                <span className="text-[0.7rem] ml-1">WIB</span>
              </h3>
            </div>
            {index < currentEvents.length - 1 && (
              <hr className="my-4 border-white" />
            )}
          </div>
        ))}
      </div>

      {/* Bullet Navigation */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center py-4">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`w-2 h-2 rounded-full hover:cursor-pointer transition-all duration-200 ${
                  currentPage === index
                    ? 'bg-gray-300 scale-110'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 