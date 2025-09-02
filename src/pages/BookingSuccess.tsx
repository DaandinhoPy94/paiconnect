import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home, Mail, Phone } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BookingSuccess = () => {
  return (
    <>
      <SEOHead
        title="Boeking Bevestigd - PaiConnect"
        description="Bedankt voor uw boeking. Wij nemen spoedig contact met u op."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold gradient-text mb-4">
                Bedankt voor uw aanvraag!
              </h1>
              <p className="text-xl text-muted-foreground">
                Uw intake is gepland. We nemen binnen 4 uur contact op om de agenda af te stemmen.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Wat gebeurt er nu?</CardTitle>
                <CardDescription>
                  De volgende stappen in het proces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Bevestiging ontvangen</h3>
                    <p className="text-sm text-muted-foreground">
                      Uw aanvraag is succesvol ontvangen en wordt verwerkt.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Contact binnen 4 uur</h3>
                    <p className="text-sm text-muted-foreground">
                      Een specialist belt u vandaag nog voor agendafstemming. Verwacht een calendar invite binnen 24 uur.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Planning & voorbereiding</h3>
                    <p className="text-sm text-muted-foreground">
                      Samen plannen we de details en bereiden we alles voor.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Heeft u vragen of wilt u direct contact opnemen?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="tech" asChild>
                  <a href="mailto:tech@paiconnect.nl" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    tech@paiconnect.nl
                  </a>
                </Button>
                
                <Button variant="outline" asChild>
                  <a href="tel:+31612345678" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    +31 6 1234 5678
                  </a>
                </Button>
              </div>
              
              <div className="pt-8">
                <Button asChild variant="cta">
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Terug naar Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BookingSuccess;