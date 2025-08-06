import Image from "next/image";
import { formatTime, formatDate } from "../lib/utils";
import { getTodayEvents } from "../lib/services";

export default async function Home() {
  const events = await getTodayEvents();
  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-4/5 max-w-4xl aspect-[2/1] flex rounded-xs overflow-hidden">
        <div className="w-2/3 flex flex-col h-full">
          <div className="bg-[#0044ce] px-10 py-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white">JADWAL HARI INI</h1>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-[#09fcb7]">{formattedDate}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black px-10 py-10 flex-1">
            <div className="flex flex-col">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <div key={event.id} className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#09fcb7]">{event.name}</h2>
                    <div className="flex flex-row text-white">
                      <h3 className="flex-1 font-bold text-lg">{event.location}</h3>
                      <h3 className="flex-1 flex justify-center">
                        <span className="flex items-center">
                          <span className="font-bold text-lg">{index + 1}</span>
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
                    {index < events.length - 1 && (
                      <hr className="my-4 border-white" />
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <h2 className="text-2xl font-bold text-[#09fcb7] mb-4">TIDAK ADA JADWAL</h2>
                  <p className="text-white text-center">Tidak ada acara yang dijadwalkan untuk hari ini</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-2/5 h-full relative overflow-hidden">
          <Image 
            src="https://cf-assets.gms.church/21cc86a3-67df-487b-e88f-1b7bc16f7600/1024" 
            fill 
            alt="Event Background" 
            className="object-cover" 
          />
        </div>
      </div>
    </div>
  );
}
