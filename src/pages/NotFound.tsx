import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { BANNER_LANGER_URL } from "@/lib/constants";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div
        className="w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${BANNER_LANGER_URL})` }}
      >
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-white/40"></div>
          <div className="relative">
            <main className="container mx-auto px-4 py-16 md:py-24">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">404</h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                  Oeps! Deze pagina bestaat niet
                </p>
                <a 
                  href="/" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  Terug naar Home
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
