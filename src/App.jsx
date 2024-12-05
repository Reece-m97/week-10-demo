import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BasicExample from "./pages/BasicExample";
import AlternativeExample from "./pages/AlternativeExample";
import UploadModal from "./pages/UploadModal";
import Layout from "./components/Layout";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BasicExample />} />
          <Route path="/alternative-example" element={<AlternativeExample />} />
          <Route path="/upload-modal" element={<UploadModal />} />
        </Route>
      </Routes>
    </Router>
  );
}
