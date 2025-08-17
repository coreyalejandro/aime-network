import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import GravesDiseaseTour from "./components/GravesDiseaseTour";
import CookingShow from "./components/CookingShow";
import RecipeBrowser from "./components/RecipeBrowser";
import AvatarCustomizer from "./components/AvatarCustomizer";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-2xl">Loading Dr. FeelGood's Guide...</p>
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
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
