import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, Clock, Building2, Calendar, User, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Step schemas for validation
const step1Schema = z.object({
  type: z.array(z.string()).min(1, "Selecteer minimaal één service"),
});

const step2Schema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Ongeldig emailadres"),
  company: z.string().optional(),
  phone: z.string().optional(),
  preferredDate: z.string().optional(),
  details: z.string().optional(),
});

const fullSchema = step1Schema.merge(step2Schema);

type BookingFormData = z.infer<typeof fullSchema>;

const serviceTypes = [
  { 
    id: "lezing", 
    label: "AI Lezing & Keynote", 
    description: "Inspirerende presentatie over AI-toepassingen voor uw organisatie",
    duration: "1-2 uur",
    price: "Vanaf €500"
  },
  { 
    id: "workshop", 
    label: "Hands-on AI Workshop", 
    description: "Praktische training waarin uw team direct aan de slag gaat",
    duration: "Halve/hele dag",
    price: "Vanaf €750"
  },
  { 
    id: "automatisering", 
    label: "Automatisering & Consultancy", 
    description: "Procesanalyse en implementatie van AI-oplossingen",
    duration: "Op maat",
    price: "Op aanvraag"
  },
];

const steps = [
  { id: 1, title: "Kies service", description: "Selecteer gewenste dienstverlening" },
  { id: 2, title: "Uw gegevens", description: "Contactgegevens en details" },
  { id: 3, title: "Bevestigen", description: "Controleer en verstuur aanvraag" },
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Consultation Booking",
    "description": "Book a consultation for AI lectures, workshops or automation audit. Free intake call with PaiConnect experts.",
    "provider": {
      "@type": "Organization",
      "name": "PaiConnect",
      "url": "https://paiconnect.nl"
    },
    "offers": {
      "@type": "Offer",
      "description": "Free consultation call to discuss AI implementation needs",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "bookingAgent": {
      "@type": "Organization", 
      "name": "PaiConnect"
    },
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://paiconnect.nl/boeken",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "AI Consultation Booking"
      }
    }
  };

  const form = useForm<BookingFormData>({
    resolver: zodResolver(currentStep === 1 ? step1Schema : currentStep === 2 ? step2Schema : fullSchema),
    defaultValues: {
      name: "",
      email: "",
      type: [],
      details: "",
      company: "",
      phone: "",
      preferredDate: "",
    },
    mode: "onChange"
  });

  // Capture URL parameters on load
  useEffect(() => {
    const capturedParams = {
      offer: searchParams.get('offer'),
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      referrer: document.referrer,
      landing_path: window.location.pathname + window.location.search,
    };
    
    // Store in session storage for later use
    sessionStorage.setItem('bookingParams', JSON.stringify(capturedParams));
  }, [searchParams]);

  const nextStep = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await form.trigger(["type"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["name", "email"]);
    }
    
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Get captured parameters
      const storedParams = sessionStorage.getItem('bookingParams');
      const urlParams = storedParams ? JSON.parse(storedParams) : {};
      
      const bookingData = {
        name: data.name,
        email: data.email,
        type: data.type,
        details: data.details || `Gewenste datum: ${data.preferredDate || 'Niet opgegeven'}`,
        company: data.company || null,
        phone: data.phone || null,
        source: urlParams.offer || 'booking_form',
        payment_status: 'pending',
        // Store additional metadata in details field
        metadata: {
          utm_source: urlParams.utm_source,
          utm_medium: urlParams.utm_medium,
          utm_campaign: urlParams.utm_campaign,
          referrer: urlParams.referrer,
          landing_path: urlParams.landing_path,
          preferred_date: data.preferredDate,
        }
      };

      console.log('Submitting booking with metadata:', bookingData);

      const { data: result, error } = await supabase.functions.invoke('secure-booking', {
        body: { bookingData }
      });

      if (error) {
        console.error('Function error:', error);
        throw error;
      }

      if (!result?.success) {
        throw new Error(result?.error || 'Booking failed');
      }
      
      // Clear stored parameters
      sessionStorage.removeItem('bookingParams');
      
      toast({
        title: "Aanvraag verzonden!",
        description: "We nemen binnen 4 uur contact met je op.",
      });

      navigate("/booking-success");
    } catch (error: any) {
      console.error('Booking error:', error);
      
      let errorMessage = "Probeer het opnieuw of neem contact met ons op.";
      
      if (error.message?.includes('Rate limit') || error.message?.includes('Too many')) {
        errorMessage = "Te veel aanvragen. Probeer het later opnieuw.";
      } else if (error.message?.includes('Invalid') || error.message?.includes('validation')) {
        errorMessage = "Controleer je gegevens en probeer opnieuw.";
      }
      
      toast({
        title: "Er ging iets mis",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Book AI lecture or workshop - PaiConnect consultation"
        description="Schedule your AI consultation: book inspiring lectures, hands-on workshops or workflow automation audit. Free intake call with PaiConnect experts."
        canonical="https://paiconnect.nl/boeken"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Plan uw AI-kennismaking
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                In drie stappen naar een vrijblijvend gesprek over AI-oplossingen voor uw bedrijf.
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted bg-background text-muted-foreground"
                    )}>
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                    
                    <div className="ml-2 hidden sm:block">
                      <div className={cn(
                        "text-sm font-medium transition-colors",
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {step.description}
                      </div>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-colors",
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 1 && <Building2 className="h-5 w-5" />}
                  {currentStep === 2 && <User className="h-5 w-5" />}
                  {currentStep === 3 && <Check className="h-5 w-5" />}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Step 1: Service Selection */}
                    {currentStep === 1 && (
                      <FormField
                        control={form.control}
                        name="type"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-base">Welke dienst heeft uw interesse? *</FormLabel>
                            <FormDescription>
                              Selecteer één of meerdere opties die aansluiten bij uw behoeften
                            </FormDescription>
                            <div className="space-y-4">
                              {serviceTypes.map((type) => (
                                <FormField
                                  key={type.id}
                                  control={form.control}
                                  name="type"
                                  render={({ field }) => {
                                    const isSelected = field.value?.includes(type.id);
                                    return (
                                      <div
                                        className={cn(
                                          "border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/50",
                                          isSelected ? "border-primary bg-primary/5" : "border-border"
                                        )}
                                        onClick={() => {
                                          const newValue = isSelected
                                            ? field.value?.filter(value => value !== type.id) || []
                                            : [...(field.value || []), type.id];
                                          field.onChange(newValue);
                                        }}
                                      >
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                          <FormControl>
                                            <Checkbox
                                              checked={isSelected}
                                              className="mt-1"
                                            />
                                          </FormControl>
                                          <div className="flex-1">
                                            <FormLabel className="font-semibold cursor-pointer">
                                              {type.label}
                                            </FormLabel>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              {type.description}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                              <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {type.duration}
                                              </span>
                                              <span className="font-medium text-primary">
                                                {type.price}
                                              </span>
                                            </div>
                                          </div>
                                        </FormItem>
                                      </div>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Step 2: Contact Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Volledige naam *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Uw naam" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>E-mailadres *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="naam@bedrijf.nl" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bedrijfsnaam</FormLabel>
                                <FormControl>
                                  <Input placeholder="Uw bedrijf" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefoonnummer</FormLabel>
                                <FormControl>
                                  <Input placeholder="+31 6 1234 5678" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gewenste periode</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Bijvoorbeeld: volgende week, begin december, januari 2024" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Geef een indicatie wanneer het u uitkomt - we stemmen de exacte datum later af
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="details"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Aanvullende informatie</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Vertel ons meer over uw situatie, wensen of vragen..."
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Hoe meer we weten, hoe beter we kunnen voorbereiden (optioneel)
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                          <h3 className="font-semibold">Overzicht van uw aanvraag:</h3>
                          
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium">Gekozen services:</span>
                              <div className="ml-4 mt-1">
                                {form.watch("type")?.map(typeId => {
                                  const service = serviceTypes.find(s => s.id === typeId);
                                  return (
                                    <div key={typeId} className="flex items-center gap-2">
                                      <Check className="h-3 w-3 text-primary" />
                                      {service?.label}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            <div>
                              <span className="font-medium">Contactgegevens:</span>
                              <div className="ml-4 mt-1 space-y-1">
                                <div>{form.watch("name")}</div>
                                <div>{form.watch("email")}</div>
                                {form.watch("company") && <div>{form.watch("company")}</div>}
                                {form.watch("phone") && <div>{form.watch("phone")}</div>}
                              </div>
                            </div>
                            
                            {form.watch("preferredDate") && (
                              <div>
                                <span className="font-medium">Gewenste periode:</span>
                                <div className="ml-4 mt-1">{form.watch("preferredDate")}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Privacy notice */}
                        <div className="bg-muted/30 rounded-lg p-4 border border-muted">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-primary mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium mb-1">Privacy & gegevensverwerking</p>
                              <p className="text-muted-foreground">
                                Uw gegevens worden uitsluitend gebruikt voor het opvolgen van deze aanvraag. 
                                We bewaren geen onnodige informatie en delen niets met derden.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={currentStep === 1 ? "invisible" : ""}
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Vorige
                      </Button>
                      
                      {currentStep < 3 ? (
                        <Button type="button" onClick={nextStep} variant="tech">
                          Volgende
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          variant="tech"
                          className="min-w-[120px]"
                        >
                          {isSubmitting ? "Versturen..." : "Verzenden"}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Booking;