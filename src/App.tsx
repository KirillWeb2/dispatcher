import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InitialData, LCH } from "./components/pages";
import { MainLayout } from "./components/layout/MainLayout";

export const App = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<InitialData />} />
            <Route path="/lch" element={<LCH />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};
