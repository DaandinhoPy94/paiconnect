import React from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { ArrowLeft } from "lucide-react";

const AIToolDetail = () => {
  const { toolName } = useParams<{ toolName: string }>();

  const toolData = {
    claude: {
      name: "Claude",
      category: "Large Language Models",
      description: "Claude is Anthropic's advanced AI assistant that excels at complex reasoning, creative writing, and detailed analysis. With its constitutional AI training, Claude provides helpful, harmless, and honest responses while maintaining conversational fluency. It's particularly strong at understanding context, following instructions precisely, and providing nuanced explanations across diverse topics from technical documentation to creative storytelling.",
      features: ["Advanced reasoning capabilities", "Long-form content generation", "Code analysis and debugging", "Research assistance", "Creative writing support"]
    },
    chatgpt: {
      name: "ChatGPT",
      category: "Large Language Models",
      description: "ChatGPT by OpenAI is one of the most widely-used conversational AI models, trained on diverse internet text to assist with a broad range of tasks. From answering questions and writing content to coding assistance and brainstorming, ChatGPT offers versatile AI capabilities. Its iterative training approach allows it to engage in multi-turn conversations while maintaining context and providing relevant, helpful responses.",
      features: ["Conversational AI interface", "Multi-topic expertise", "Code generation and debugging", "Content creation", "Problem-solving assistance"]
    },
    gemini: {
      name: "Gemini",
      category: "Large Language Models",
      description: "Google's Gemini is a multimodal AI model that seamlessly integrates text, image, and code understanding. Built to compete with the most advanced AI systems, Gemini excels at complex reasoning tasks, mathematical problem-solving, and code generation. Its multimodal capabilities allow it to understand and generate content across different formats, making it particularly powerful for technical applications and creative projects.",
      features: ["Multimodal processing", "Advanced mathematical reasoning", "Code generation and optimization", "Image understanding", "Integration with Google services"]
    },
    midjourney: {
      name: "Midjourney",
      category: "Image AI",
      description: "Midjourney is a pioneering AI image generation platform known for producing stunning, artistic visuals from text descriptions. The platform has gained popularity for its ability to create everything from photorealistic images to fantastical artistic compositions. With continuous model improvements, Midjourney offers fine-grained control over artistic styles, compositions, and visual aesthetics, making it a favorite among digital artists and content creators.",
      features: ["High-quality image generation", "Artistic style control", "Discord-based interface", "Community galleries", "Advanced prompt engineering"]
    },
    flux: {
      name: "Flux",
      category: "Image AI",
      description: "Flux represents the next generation of AI image generation technology, offering exceptional realism and detail in generated images. With advanced understanding of lighting, composition, and photographic principles, Flux can create images that are virtually indistinguishable from photographs. It excels at both artistic and commercial applications, providing precise control over image parameters and consistently high-quality outputs.",
      features: ["Photorealistic image generation", "Advanced lighting simulation", "Composition control", "High-resolution outputs", "Commercial-grade quality"]
    },
    dalle: {
      name: "DALL-E",
      category: "Image AI",
      description: "DALL-E by OpenAI revolutionized AI image generation by demonstrating the ability to create images from textual descriptions with remarkable creativity and accuracy. The latest versions offer improved resolution, better understanding of complex prompts, and enhanced artistic capabilities. DALL-E is particularly strong at combining concepts in novel ways and understanding detailed instructions for image composition and style.",
      features: ["Text-to-image generation", "Creative concept combination", "Style versatility", "High-resolution outputs", "User-friendly interface"]
    },
    veo3: {
      name: "Veo3",
      category: "Video AI",
      description: "Google's Veo3 represents the cutting edge of AI video generation technology, capable of creating high-quality, realistic videos from simple text descriptions. With advanced understanding of motion, physics, and cinematic principles, Veo3 can generate everything from short clips to longer sequences with consistent quality. The model excels at maintaining temporal coherence and creating visually compelling content for various applications.",
      features: ["Text-to-video generation", "High-quality output", "Motion consistency", "Cinematic understanding", "Temporal coherence"]
    },
    kling: {
      name: "Kling",
      category: "Video AI",
      description: "Kling is a powerful Chinese AI platform specializing in high-quality video content creation. The platform offers advanced video generation capabilities with strong attention to detail and motion realism. Kling has gained recognition for its ability to create professional-grade video content, making it a valuable tool for content creators, marketers, and video production professionals seeking AI-assisted video creation.",
      features: ["Professional video generation", "Motion realism", "Content creation tools", "High production value", "Commercial applications"]
    },
    heygen: {
      name: "HeyGen",
      category: "Video AI",
      description: "HeyGen specializes in AI-powered video creation with a focus on human avatars and professional presentations. The platform allows users to create videos featuring realistic AI avatars that can speak in multiple languages and deliver presentations with natural gestures and expressions. HeyGen is particularly popular for business communications, training videos, and educational content where a human presenter is desired.",
      features: ["AI avatar creation", "Multi-language support", "Professional presentations", "Natural expressions", "Business communications"]
    },
    suno: {
      name: "Suno",
      category: "Music AI",
      description: "Suno is revolutionizing music creation with AI technology that can generate complete songs from simple text prompts. The platform can create music across various genres, complete with vocals, instrumentation, and professional production quality. Suno's AI understands musical structure, harmony, and rhythm, making it possible for anyone to create original music without traditional musical training or expensive equipment.",
      features: ["Complete song generation", "Multiple genres", "Vocal synthesis", "Professional quality", "No musical training required"]
    },
    aiva: {
      name: "Aiva",
      category: "Music AI",
      description: "AIVA (Artificial Intelligence Virtual Artist) is an AI composer trained on classical music and designed to create emotional, sophisticated musical compositions. Recognized as the world's first AI composer to be officially recognized by a music society, AIVA specializes in creating classical and cinematic music for films, video games, and other media. The platform offers fine control over musical elements and can compose in various classical styles.",
      features: ["Classical composition", "Cinematic scoring", "Emotional music", "Professional recognition", "Media applications"]
    },
    mubert: {
      name: "Mubert",
      category: "Music AI",
      description: "Mubert provides real-time AI music generation designed specifically for content creators, streamers, and businesses. The platform creates royalty-free music that adapts to content needs, whether for videos, podcasts, live streams, or background music. Mubert's AI can generate music in real-time based on mood, genre, and duration requirements, making it an ideal solution for dynamic content creation.",
      features: ["Real-time generation", "Royalty-free music", "Content adaptation", "Multiple genres", "Commercial licensing"]
    },
    elevenlabs: {
      name: "ElevenLabs",
      category: "Text-to-Speech",
      description: "ElevenLabs has set new standards in AI voice synthesis with technology that creates incredibly realistic human speech. The platform offers voice cloning capabilities that can replicate individual voices with remarkable accuracy, as well as generate entirely new voices. ElevenLabs is widely used for audiobook narration, podcast creation, and any application requiring high-quality, natural-sounding speech synthesis.",
      features: ["Realistic voice synthesis", "Voice cloning technology", "Multiple languages", "Emotional expression", "Professional audio quality"]
    },
    playht: {
      name: "Play.ht",
      category: "Text-to-Speech",
      description: "Play.ht offers advanced AI voice generation technology designed for professional content creation. The platform provides a wide range of realistic voices across multiple languages and accents, making it ideal for podcasts, audiobooks, and professional presentations. Play.ht focuses on delivering studio-quality voice synthesis with easy-to-use tools for content creators and businesses.",
      features: ["Studio-quality voices", "Multiple languages", "Content creation tools", "Professional applications", "Easy integration"]
    },
    murf: {
      name: "Murf",
      category: "Text-to-Speech",
      description: "Murf provides professional-grade AI voice generation specifically designed for business presentations, e-learning, and marketing content. The platform offers a comprehensive suite of voices with different ages, accents, and speaking styles, allowing users to create compelling voiceovers without hiring voice actors. Murf emphasizes ease of use and professional output quality for business applications.",
      features: ["Business-focused voices", "Professional presentations", "E-learning content", "Marketing applications", "User-friendly interface"]
    },
    cursor: {
      name: "Cursor",
      category: "Code/Automation",
      description: "Cursor is an AI-powered code editor that transforms the development experience by providing intelligent code completion, generation, and editing capabilities. Built on advanced language models, Cursor understands context and can help developers write, debug, and optimize code more efficiently. The editor integrates seamlessly with existing workflows while providing powerful AI assistance for faster, smarter development.",
      features: ["AI-powered coding", "Intelligent completion", "Code generation", "Debugging assistance", "Workflow integration"]
    },
    lovable: {
      name: "Lovable",
      category: "Code/Automation",
      description: "Lovable revolutionizes web application development by enabling users to create fully functional web apps through natural language conversations. The platform combines AI-driven development with professional coding practices, allowing both technical and non-technical users to build sophisticated applications. Lovable handles the complexity of modern web development while maintaining code quality and best practices.",
      features: ["No-code web development", "Natural language interface", "Professional code output", "Full-stack applications", "AI-driven development"]
    },
    n8n: {
      name: "n8n",
      category: "Code/Automation",
      description: "n8n is a powerful workflow automation platform that allows users to connect different services and automate complex business processes. With its visual workflow editor and extensive integration capabilities, n8n enables businesses to automate repetitive tasks, synchronize data between systems, and create sophisticated automation workflows without extensive coding knowledge.",
      features: ["Visual workflow editor", "Extensive integrations", "Business automation", "Data synchronization", "Self-hosted option"]
    }
  };

  const tool = toolData[toolName as keyof typeof toolData];

  if (!tool) {
    return (
      <>
        <SEOHead 
          title="AI Tool niet gevonden – PaiConnect"
          description="De opgevraagde AI tool kon niet worden gevonden."
          canonical={`https://paiconnect.nl/ai-info/${toolName}`}
        />
        <div>
          <Navigation />
          <main className="py-16 md:py-24">
            <div className="container">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Tool niet gevonden</h1>
                <Link to="/ai-info" className="text-primary hover:underline">
                  ← Terug naar AI Info
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${tool.name}: ${tool.category} AI Tool – PaiConnect`}
        description={tool.description.slice(0, 160)}
        canonical={`https://paiconnect.nl/ai-info/${toolName}`}
      />
      
      <div>
        <Navigation />
        
        <main className="py-16 md:py-24">
          <div className="container">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link 
                to="/ai-info" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Terug naar AI Info
              </Link>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                  {tool.name}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {tool.description}
                </p>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Belangrijkste functies</h2>
                  <ul className="space-y-3">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Wil je meer weten over hoe {tool.name} jouw bedrijf kan helpen? 
                    Plan een kennismakingsgesprek en ontdek de mogelijkheden.
                  </p>
                  <Link 
                    to="/booking" 
                    className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-sm border border-primary/20 rounded-lg text-foreground font-medium hover:border-primary/40 hover:bg-white/40 transition-all duration-300"
                  >
                    Plan een kennismaking →
                  </Link>
                </div>
              </div>

              {/* Right Column - Image Placeholder */}
              <div className="lg:sticky lg:top-24">
                <div className="aspect-square bg-gradient-subtle rounded-lg flex items-center justify-center border border-primary/10">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center text-2xl">
                      🤖
                    </div>
                    <p className="text-muted-foreground text-sm">
                      AI Tool Afbeelding<br />
                      <span className="text-xs">Placeholder voor {tool.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AIToolDetail;