
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Wallet, Bank, CreditCard } from "lucide-react";

interface BankServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BankServiceCard = ({ icon, title, description }: BankServiceProps) => {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Learn More</Button>
      </CardFooter>
    </Card>
  );
};

const BankServices = () => {
  const services = [
    {
      icon: <Wallet />,
      title: "Personal Banking",
      description: "Access your accounts, make transfers, and manage your finances online."
    },
    {
      icon: <Bank />,
      title: "Savings & Investments",
      description: "Grow your wealth with our competitive rates and investment options."
    },
    {
      icon: <CreditCard />,
      title: "Cards & Payments",
      description: "Discover our range of cards and seamless payment solutions."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Our Banking Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <BankServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BankServices;
