import React from "react";
import { Card, CardContent } from "./card";

const IntroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <Card className="max-w-4xl mx-auto card-hover">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
              AI: Van hype naar hulpmiddel
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                Bij PaiConnect geloven we dat AI geen hype is, maar een hulpmiddel. Wij helpen bedrijven om processen slimmer te maken, medewerkers te trainen en inspiratie te bieden via lezingen.
              </p>
              <p>
                Of je nu tijd wilt besparen, creatiever wilt werken of meer wilt automatiseren: wij laten zien wat AI écht kan. Met concrete voorbeelden, workshops en praktische implementaties zorgen wij dat jouw organisatie niet achterblijft, maar vooruitloopt.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IntroSection;