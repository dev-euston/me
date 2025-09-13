import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-8">
      <div className="flex flex-col items-center gap-6">
        <span className="text-6xl animate-bounce">🚧</span>
        <h1 className="text-3xl font-bold text-yellow-900 text-center">
          Under Construction
        </h1>
        <p className="text-lg text-yellow-800 text-center max-w-md">
          Wow you are early, <span className="font-semibold">Euston</span> will attend to you shortly.<br />
          Please check back soon for something awesome! 🛠️
        </p>
        <Image
          src="/construction-cat.png"
          alt="Cute construction cat"
          width={180}
          height={180}
          className="rounded-lg shadow-lg border-4 border-yellow-200"
        />
      </div>
      <footer className="mt-16 text-yellow-700 text-sm">
        &copy; {new Date().getFullYear()} Euston Lee. All rights reserved.
      </footer>
    </div>
  );
}
