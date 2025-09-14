import MatrixRain from "@/components/MatrixRain";
import BreathText from "@/components/typography/BreathText";

export default function Home() {
  return (
    <>
      <MatrixRain />
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-4">
        <BreathText>
          <h1
            className="text-5xl md:text-6xl font-bold mb-2"

          >
            Euston Lee
          </h1>
        </BreathText>
        <p className="text-green-300 text-lg md:text-xl mb-8">
          &gt; Software Engineer • Dreamer • Builder of the Future
        </p>
      </div>
    </>
  );
}
