import Image from "next/image";

import { NextPage } from "next";
import Navbar from "@/components/Navbar";
import PredictionForm from "@/components/PredictionForm";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar/>
      <PredictionForm/>
    </div>
  );
};

export default Home;