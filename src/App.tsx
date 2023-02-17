import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/Home";
import Resume from "./pages/Resume";

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
