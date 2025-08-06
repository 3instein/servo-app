import { formatDate } from "../lib/utils";
import { getTodayEvents } from "../lib/services";
import ImageCarousel from "./components/ImageCarousel";
import EventPagination from "./components/EventPagination";

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
            <EventPagination events={events} />
          </div>
        </div>
        <div className="w-2/5 h-full relative overflow-hidden">
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
}
