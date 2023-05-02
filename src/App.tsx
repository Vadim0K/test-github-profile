import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { initializeApp } from "firebase/app";

import Home from "./pages/Home";
import Resume from "./pages/Resume";

const firebaseConfig = {
  apiKey: "AIzaSyDbT3dUljz4KbNl-qMd60U7dw3E7PYUFUM",
  authDomain: "vdmk-github-actions.firebaseapp.com",
  projectId: "vdmk-github-actions",
  storageBucket: "vdmk-github-actions.appspot.com",
  messagingSenderId: "362939499782",
  appId: "1:362939499782:web:1b45951d0be79a1c148a87"
};

const app = initializeApp(firebaseConfig);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <main>
      {app.name}
      Hello 3
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/resume/:nickname" element={<Resume />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </QueryClientProvider>
    </main>
  );
}

export default App;
