
import BlinkDetector from "@/components/BlinkDetector";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-accent/20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Blink Alert</h1>
          <p className="text-muted-foreground">
            A simple webcam-based blink detection system
          </p>
        </div>
        
        <BlinkDetector />
        
        <p className="text-xs text-center text-muted-foreground">
          This app requires webcam permissions and works best in good lighting conditions.
        </p>
      </div>
    </div>
  );
};

export default Index;
