
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import BankServices from "./BankServices";

const VerificationSuccess = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 px-4">
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-[pulse_2s_infinite]">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground mb-2">
            Congratulations!
          </h1>
          <p className="text-2xl font-semibold mb-2 text-center">You are verified</p>
          <p className="text-muted-foreground text-center max-w-md">
            Your identity has been successfully verified. You now have full access to all our banking services.
          </p>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <BankServices />
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            className="bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90 transition-opacity"
            size="lg"
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
