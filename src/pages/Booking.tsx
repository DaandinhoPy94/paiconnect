import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Check, Clock, Euro, Mail, Phone, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEOHead from "@/components/ui/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Ongeldig emailadres"),
  type: z.array(z.string()).min(1, "Selecteer minimaal één type"),
  details: z.string().optional(),
  date: z.date().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const predefinedPackages = [
  {
    id: "lezing",
    title: "Lezing",
    description: "Inspirerende presentatie over AI voor uw organisatie",
    price: 500,
    duration: "1-2 uur",
    features: ["Interactieve presentatie", "Q&A sessie", "Handouts"],
  },
  {
    id: "workshop",
    title: "Workshop",
    description: "Hands-on training voor uw team",
    price: 750,
    duration: "Halve dag",
    features: ["Praktische oefeningen", "Persoonlijke begeleiding", "Werkmateriaal"],
  },
  {
    id: "audit",
    title: "Automatisering Audit",
    description: "Analyse van uw processen en AI-mogelijkheden",
    price: 1000,
    duration: "1-2 dagen",
    features: ["Procesanalyse", "AI-potentieelrapport", "Implementatieplan"],
  },
];

const serviceTypes = [
  { id: "lezing", label: "Lezing" },
  { id: "workshop", label: "Workshop" },
  { id: "automatisering", label: "Automatisering" },
];

const Booking = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      type: [],
      details: "",
      company: "",
      phone: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      const bookingData = {
        name: data.name,
        email: data.email,
        type: data.type,
        details: data.details || null,
        date: data.date?.toISOString() || null,
        company: data.company || null,
        phone: data.phone || null,
        source: 'custom_request',
        payment_status: 'pending'
      };

      // Use secure edge function instead of direct database access
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
      
      toast({
        title: "Aanvraag verzonden",
        description: "We nemen binnen 24 uur contact met je op.",
      });

      // Redirect to success page
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
    }
  };

  const handlePackagePayment = async (packageId: string) => {
    setIsProcessingPayment(true);
    try {
      const selectedPkg = predefinedPackages.find(pkg => pkg.id === packageId);
      if (!selectedPkg) throw new Error('Package not found');

      const bookingData = {
        name: `Direct booking - ${selectedPkg.title}`,
        email: 'info@paiconnect.nl', // You may want to collect this from user
        type: [packageId],
        details: `Direct booking for ${selectedPkg.title} package`,
        selected_package: packageId,
        price_cents: selectedPkg.price * 100,
        source: 'direct_booking',
        payment_status: 'completed'
      };

      // Mock iDEAL payment flow
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Use secure edge function for booking
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
      
      toast({
        title: "Betaling succesvol",
        description: "Uw boeking is bevestigd!",
      });

      navigate("/booking-success");
    } catch (error: any) {
      console.error('Payment error:', error);
      
      let errorMessage = "Probeer het opnieuw.";
      
      if (error.message?.includes('Rate limit') || error.message?.includes('Too many')) {
        errorMessage = "Te veel aanvragen. Probeer het later opnieuw.";
      }
      
      toast({
        title: "Betaling mislukt",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Boek een afspraak - PaiConnect"
        description="Boek een lezing, workshop of automatisering audit. Plan uw kennismakingsgesprek over AI-oplossingen voor uw bedrijf."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold gradient-text mb-4">
                Boek uw AI-expertise
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Kies tussen directe boeking van onze standaardpakketten of plan een vrijblijvend kennismakingsgesprek voor maatwerk.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left side - Form and booking options */}
              <div className="space-y-8">
                {/* Direct booking packages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="h-5 w-5" />
                      Direct Boeken
                    </CardTitle>
                    <CardDescription>
                      Kies een van onze standaardpakketten en boek direct met iDEAL
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {predefinedPackages.map((pkg) => (
                      <div key={pkg.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{pkg.title}</h3>
                            <p className="text-sm text-muted-foreground">{pkg.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {pkg.duration}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">€{pkg.price}</div>
                          </div>
                        </div>
                        
                        <ul className="text-sm space-y-1">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          onClick={() => handlePackagePayment(pkg.id)}
                          disabled={isProcessingPayment}
                          className="w-full"
                          variant="tech"
                        >
                          {isProcessingPayment ? "Verwerken..." : "Boek Nu met iDEAL"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Custom booking form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Maatwerk Aanvraag
                    </CardTitle>
                    <CardDescription>
                      Plan een vrijblijvend kennismakingsgesprek voor een oplossing op maat
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Naam *</FormLabel>
                              <FormControl>
                                <Input placeholder="Voeg hier uw volledige naam in" {...field} />
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
                              <FormLabel>E-mail *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Voeg hier uw emailadres in" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bedrijfsnaam</FormLabel>
                              <FormControl>
                                <Input placeholder="Uw bedrijfsnaam (optioneel)" {...field} />
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
                                <Input placeholder="Uw telefoonnummer (optioneel)" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="type"
                          render={() => (
                            <FormItem>
                              <FormLabel>Type dienst *</FormLabel>
                              <FormDescription>
                                Selecteer één of meerdere opties
                              </FormDescription>
                              {serviceTypes.map((type) => (
                                <FormField
                                  key={type.id}
                                  control={form.control}
                                  name="type"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={type.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(type.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, type.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== type.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {type.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Gewenste datum</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Selecteer een datum (optioneel)</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                    className={cn("p-3 pointer-events-auto")}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                Geef uw voorkeursdatum voor de afspraak aan
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="details"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Details</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Geef hier verdere info mee die van belang kan zijn"
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Beschrijf uw specifieke wensen of vragen
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full" variant="tech">
                          Aanvraag Versturen
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              {/* Right side - Image placeholder */}
              <div className="lg:sticky lg:top-8 h-fit">
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="bg-muted/30 rounded-lg h-96 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Building2 className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg font-medium">AI Expertise</p>
                        <p className="text-sm">Voor uw organisatie</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <h3 className="font-semibold text-lg">Waarom PaiConnect?</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          Praktische AI-toepassingen
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          Maatwerkoplossingen
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          Ervaren specialisten
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          Proven resultaten
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Booking;