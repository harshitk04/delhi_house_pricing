import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       Hi
//     </div>
//   );
// }

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