import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-4/5 max-w-4xl aspect-[2/1] flex rounded-xs overflow-hidden">
        <div className="w-2/3 flex flex-col h-full">
          <div className="bg-[#0044ce] px-10 py-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white">JADWAL HARI INI</h1>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-[#09fcb7]">26 JULI 2025</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black px-10 py-10 flex-1">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-[#09fcb7]">PMC BATCH 3</h2>
                <div className="flex flex-row text-white">
                  <h3 className="flex-1 font-bold">EAGLEKIDZ 1</h3>
                  <h3 className="flex-1 flex justify-center">
                    <span className="font-bold">1</span>
                    FL
                  </h3>
                  <h3 className="flex-1">
                    <span className="font-bold">13:00 - 20:00</span>
                    <span className="text-[0.7rem] ml-1">WIB</span>
                    </h3>
                </div>
              </div>
              <hr className="my-4 border-white" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-[#09fcb7]">IBADAH AOG YOUTH</h2>
                <div className="flex flex-row text-white">
                  <h3 className="flex-1 font-bold">MAINHALL</h3>
                  <h3 className="flex-1 flex justify-center">
                    <span className="font-bold">2M</span>
                    FL
                  </h3>
                  <h3 className="flex-1">
                    <span className="font-bold">18:30 - 21:00</span>
                    <span className="text-[0.7rem] ml-1">WIB</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 relative">
          <Image src="https://cf-assets.gms.church/21cc86a3-67df-487b-e88f-1b7bc16f7600/1024" alt="PMC BATCH 3" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
