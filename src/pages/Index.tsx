
import VerificationSuccess from "@/components/VerificationSuccess";
import BlinkDetector from "@/components/BlinkDetector";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 py-10">
      <VerificationSuccess />
      <div className="mt-10 px-4 max-w-lg mx-auto">
        <BlinkDetector />
      </div>
    </div>
  );
};

export default Index;
