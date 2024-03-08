
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.variable}`}
    >
      <h1 className="text-4xl font-bold">Farcaster Recover</h1>
      <div className="flex flex-row items-center justify-evenly">

      </div>
    </main>
  );
}
