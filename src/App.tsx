import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">הדף לא נמצא</p>
        <a href="/" className="text-primary underline hover:text-primary/90">חזרה לדף הבית</a>
      </div>
    </div>
  );
};

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <main className="h-screen w-full bg-background">
            <div className="h-full max-w-3xl mx-auto">
              <ChatContainer />
            </div>
          </main>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
