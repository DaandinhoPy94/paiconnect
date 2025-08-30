import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AIInfo = () => {
  const aiCategories = [
    {
      category: "Large Language Models (LLMs)",
      tools: [
        {
          name: "Claude",
          description: "Geavanceerd AI-model voor complexe tekstanalyse en conversaties",
          icon: "🤖"
        },
        {
          name: "ChatGPT",
          description: "OpenAI's populaire chatbot voor diverse tekstverwerkingstaken",
          icon: "💬"
        },
        {
          name: "Gemini",
          description: "Google's multimodale AI voor tekst, code en beeldverwerking",
          icon: "💎"
        }
      ]
    },
    {
      category: "Image AI",
      tools: [
        {
          name: "Midjourney",
          description: "AI-gedreven beeldgeneratie voor creatieve en professionele ontwerpen",
          icon: "🎨"
        },
        {
          name: "Flux",
          description: "Geavanceerde AI voor realistische beeldcreatie en -bewerking",
          icon: "⚡"
        },
        {
          name: "DALL-E",
          description: "OpenAI's tool voor het genereren van afbeeldingen uit tekstbeschrijvingen",
          icon: "🖼️"
        }
      ]
    },
    {
      category: "Video AI",
      tools: [
        {
          name: "Veo3",
          description: "Google's nieuwste video-AI voor realistische videogeneratie",
          icon: "🎬"
        },
        {
          name: "Kling",
          description: "Chinese AI-platform voor hoogwaardige video-content creatie",
          icon: "📹"
        },
        {
          name: "HeyGen",
          description: "AI-avatars en spraaksynthese voor professionele videopresentaties",
          icon: "👤"
        }
      ]
    },
    {
      category: "Music AI",
      tools: [
        {
          name: "Suno",
          description: "AI-muziekgeneratie voor originele tracks en composities",
          icon: "🎵"
        },
        {
          name: "Aiva",
          description: "AI-componist voor klassieke en emotionele muziekstukken",
          icon: "🎼"
        },
        {
          name: "Mubert",
          description: "Real-time AI-muziekgeneratie voor content creators",
          icon: "🎧"
        }
      ]
    },
    {
      category: "Text-to-Speech",
      tools: [
        {
          name: "ElevenLabs",
          description: "Ultrarrealistische spraaksynthese en voice cloning technologie",
          icon: "🗣️"
        },
        {
          name: "Play.ht",
          description: "AI-stemmen voor podcasts, audioboeken en professionele content",
          icon: "🔊"
        },
        {
          name: "Murf",
          description: "Studio-kwaliteit AI-voiceovers voor bedrijfspresentaties",
          icon: "🎙️"
        }
      ]
    },
    {
      category: "Code/Automation",
      tools: [
        {
          name: "Cursor",
          description: "AI-powered code editor voor snellere en slimmere ontwikkeling",
          icon: "💻"
        },
        {
          name: "Lovable",
          description: "AI-gedreven webapplicatie-ontwikkeling zonder complexe coding",
          icon: "❤️"
        },
        {
          name: "n8n",
          description: "Workflow automation platform voor het verbinden van verschillende services",
          icon: "🔗"
        }
      ]
    }
  ];

  const newsItems = [
    {
      title: "OpenAI lanceert GPT-5: Nieuwe mogelijkheden voor bedrijven",
      date: "15 december 2024",
      description: "De nieuwste versie van GPT biedt verbeterde redenering en multimodale capaciteiten, opening nieuwe deuren voor enterprise toepassingen.",
      category: "LLM Update"
    },
    {
      title: "Google Veo3 revolutioneert video-AI landschap",
      date: "12 december 2024", 
      description: "Google's nieuwste video-AI model kan nu 2-minuut durende, filmkwaliteit video's genereren uit simpele tekstbeschrijvingen.",
      category: "Video AI"
    },
    {
      title: "EU AI Act: Nieuwe regelgeving voor bedrijfs-AI implementatie",
      date: "8 december 2024",
      description: "Europese wetgeving treedt in werking, met belangrijke gevolgen voor hoe bedrijven AI-systemen moeten implementeren en documenteren.",
      category: "Regelgeving"
    }
  ];

  return (
    <>
      <SEOHead 
        title="AI Info: Overzicht van AI-tools en laatste nieuws – PaiConnect"
        description="Ontdek de nieuwste AI-tools per categorie en blijf op de hoogte van het laatste AI-nieuws en ontwikkelingen."
        canonical="https://paiconnect.nl/ai-info"
      />
      
      <div>
        <Navigation />
        
        <main>
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-subtle">
            <div className="container">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="gradient-text">AI Landscape</span> Overzicht
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Ontdek de krachtigste AI-tools per categorie en blijf op de hoogte van de laatste ontwikkelingen in artificial intelligence
                </p>
              </div>
            </div>
          </section>

          {/* AI Categories Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Verschillende soorten AI
                </h2>
                <p className="text-xl text-muted-foreground">
                  Van tekstgeneratie tot video-creatie: ontdek welke AI-tools het best passen bij jouw behoeften
                </p>
              </div>

              <div className="space-y-12">
                {aiCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-2xl font-semibold text-primary mb-6">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.tools.map((tool, toolIndex) => (
                        <Card key={toolIndex} className="relative overflow-hidden bg-white/30 backdrop-blur-sm border-gradient-neon tech-shimmer hover:shadow-lg transition-all duration-300 cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-2xl">
                                {tool.icon}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{tool.name}</CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {tool.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* News Section */}
          <section className="py-16 md:py-24 bg-gradient-subtle">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Laatste AI Nieuws
                </h2>
                <p className="text-xl text-muted-foreground">
                  Blijf op de hoogte van de nieuwste ontwikkelingen in de AI-wereld
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsItems.map((item, index) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground">
                  Wil je meer weten over hoe deze AI-ontwikkelingen jouw bedrijf kunnen helpen?
                </p>
                <div className="flex justify-center mt-4">
                  <Button variant="tech" size="sm" asChild>
                    <Link to="/booking">Plan een kennismakingsgesprek</Link>
                  </Button>
                </div>
                <p className="text-muted-foreground text-center">
                </p>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AIInfo;