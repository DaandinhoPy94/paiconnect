import React from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BG_URL =
  "https://drive.google.com/uc?export=view&id=1hrzkONCOp6tkJCx5BYyFeY__b4WqDVzJ";

const About = () => {
  return (
    <>
      <SEOHead
        title="Over PaiConnect – AI consultancy"
        description="Ontdek onze missie: bedrijven helpen Automate. Accelerate. Advance. Leer meer over Daan van der Ster en het PaiConnect team."
        canonical="https://paiconnect.nl/over"
      />

      {/* Geen min-h-screen op de buitenste wrapper; zo eindigt de bg bij de footer */}
      <div>
        <Navigation />

        {/* Alleen de content-wrapper krijgt de achtergrond */}
        <div
          className="w-full bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url('${BG_URL}')` }}
        >
          {/* Overlay voor leesbaarheid van tekst op lichte vlakken */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 bg-white/40"></div>

            {/* Alle bestaande content blijft intact */}
            <main className="relative">
              <section className="py-16 md:py-24">
                <div className="container">
                  <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                      Over <span className="gradient-text">PaiConnect</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                      Onze missie is simpel: bedrijven helpen vooruitlopen met
                      praktische AI-implementatie
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                      <Card className="card-hover">
                        <CardContent className="p-8">
                          <h2 className="text-3xl font-bold mb-6 text-primary">
                            Onze missie
                          </h2>
                          <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                              PaiConnect is opgericht door Daan van der Ster, met
                              een passie voor AI en automatisering. Onze missie:
                              bedrijven helpen{" "}
                              <strong className="text-primary">
                                Automate. Accelerate. Advance.
                              </strong>
                            </p>
                            <p>
                              Door kennis, training en uitvoering brengen we AI
                              van hype naar praktische toepassing. We geloven dat
                              elke organisatie, groot of klein, baat heeft bij
                              slimme automatisering.
                            </p>
                            <p>
                              Geen buzzwords of vaag gepraat - wij leveren
                              concrete resultaten die direct impact hebben op de
                              dagelijkse werkprocessen van jouw team.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-3xl">👨‍💼</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          Daan van der Ster
                        </h3>
                        <p className="text-muted-foreground">
                          Founder & AI Consultant
                        </p>
                      </div>

                      <Card className="card-hover">
                        <CardContent className="p-6 text-center">
                          <h4 className="font-semibold mb-3 text-primary">
                            Expertise
                          </h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• 5+ jaar ervaring met procesautomatisering</p>
                            <p>• Expert in make.com, n8n en AI-tools</p>
                            <p>• 100+ bedrijven begeleid in AI-transformatie</p>
                            <p>• Speaker op AI-events en conferenties</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <Card className="card-hover">
                      <CardContent className="p-8 text-center">
                        <div className="text-4xl mb-4">🎯</div>
                        <h3 className="text-xl font-bold mb-4 text-primary">
                          Automate
                        </h3>
                        <p className="text-muted-foreground">
                          Handmatige processen automatiseren voor meer
                          efficiëntie en minder fouten. Van eenvoudige workflows
                          tot complexe integraties.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="card-hover">
                      <CardContent className="p-8 text-center">
                        <div className="text-4xl mb-4">⚡️</div>
                        <h3 className="text-xl font-bold mb-4 text-primary">
                          Accelerate
                        </h3>
                        <p className="text-muted-foreground">
                          Processen versnellen door slimme AI-tools en
                          automatisering. Snellere doorlooptijden en hogere
                          productiviteit.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="card-hover mb-16">
                    <CardContent className="p-8 text-center">
                      <div className="text-4xl mb-4">🚀</div>
                      <h3 className="text-xl font-bold mb-4 text-primary">
                        Advance
                      </h3>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        Vooruitlopen op de concurrentie door early adoption van
                        nieuwe technologieën. Jouw organisatie klaarstomen voor
                        de toekomst van werk.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">
                      Klaar om te starten?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                      Laten we samen ontdekken hoe AI jouw organisatie kan
                      helpen groeien
                    </p>
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/contact">
                        Plan een vrijblijvend kennismakingsgesprek
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;
