import Navbar from "@/components/Navbar";
import FormComponent from "@/components/Step/Form";
import Initial from "@/components/Step/Initial";
import Signing from "@/components/Step/Signing";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function Home() {
  const [step, setStep] = useState(0);
  const [fid, setFid] = useState<Number>(0);
  const [phrase, setPhrase] = useState<string>("");
  const [isPhrase, setIsPhrase] = useState<Boolean>(false);

  const clearState = () => {
    setStep(0);
    setFid(0);
    setPhrase("");
    setIsPhrase(false);
  }

  return (
    <div>
      <Head>
        <title>Farcaster Recovery</title>
      </Head>
      <Navbar />
      <main
        className={`flex flex-col items-center justify-center p-24 ${inter.variable}`}
      >
        {step == 0 && <Initial setStep={setStep} />}
        {step == 1 && (
          <FormComponent
            isPhrase={isPhrase}
            setIsPhrase={setIsPhrase}
            setFid={setFid}
            setStep={setStep}
            setPhrase={setPhrase}
          />
        )}
        {step == 2 && <Signing fid={fid} phrase={phrase} clearState={clearState} />}
      </main>
    </div>
  );
}
