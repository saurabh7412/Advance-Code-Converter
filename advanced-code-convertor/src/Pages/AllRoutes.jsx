import { Routes, Route } from "react-router-dom";
import { CodeConvertor } from "./CodeConvertor";
import { ContentGenerator } from "./ContentGenerator";
import { Home } from "./Home";
import ProtectedWrapper from "../Components/ProtectedWrapper";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/code-convertor"
          element={
            <ProtectedWrapper>
              <CodeConvertor />
            </ProtectedWrapper>
          }
        />
        <Route path="/content-generator" element={<ContentGenerator />} />
      </Routes>
    </>
  );
};
