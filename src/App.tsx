import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import GravesDiseaseTour from "./components/GravesDiseaseTour";
import CookingShow from "./components/CookingShow";
import RecipeBrowser from "./components/RecipeBrowser";
import AvatarCustomizer from "./components/AvatarCustomizer";
import AuntieMaeAI from "./components/AuntieMaeAI";
import AuntieMaeIntegration from "./components/AuntieMaeIntegration";
import FashionShowComplete from "./components/FashionShowComplete";
import { AuntieMaeProvider } from "./contexts/AuntieMaeContext";

function App() {
  return (
    <AuntieMaeProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <p className="text-2xl">Loading The Black Women's Guide to Graves' Disease...</p>
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/body-tour" element={<GravesDiseaseTour />} />
            <Route path="/cooking-show" element={<CookingShow />} />
            <Route path="/recipes" element={<RecipeBrowser />} />
            <Route path="/customize" element={<AvatarCustomizer />} />
            <Route path="/auntie-mae-ai" element={<AuntieMaeAI />} />
            <Route path="/integration-guide" element={<AuntieMaeIntegration />} />
            <Route path="/fashion-show" element={<FashionShowComplete />} />
          </Routes>
        </>
      </Suspense>
    </AuntieMaeProvider>
  );
}

export default App;
