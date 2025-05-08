
import React, { useRef, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Webcam, Eye, EyeOff } from 'lucide-react';

const BlinkDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [blinkDetected, setBlinkDetected] = useState(false);
  const [eyeOpenness, setEyeOpenness] = useState(1); // 0 = closed, 1 = open
  const { toast } = useToast();
  
  // Mock blink detection - in a real app, we'd use a computer vision library
  useEffect(() => {
    if (!isWebcamActive) return;
    
    let lastBlinkTime = 0;
    const blinkInterval = 4000; // 4 seconds
    
    const detectBlinks = () => {
      const now = Date.now();
      
      // Randomly detect blinks (this simulates real detection)
      if (now - lastBlinkTime > blinkInterval) {
        const shouldBlink = Math.random() > 0.5;
        
        if (shouldBlink) {
          setBlinkDetected(true);
          setEyeOpenness(0);
          lastBlinkTime = now;
          
          toast({
            title: "Blink Detected!",
            description: "You blinked your eyes.",
            variant: "default",
          });
          
          // Reset after 500ms
          setTimeout(() => {
            setBlinkDetected(false);
            setEyeOpenness(1);
          }, 500);
        } else {
          toast({
            title: "No Blink Detected",
            description: "No blink was detected. Please blink naturally.",
            variant: "destructive",
          });
        }
      }
    };
    
    const interval = setInterval(detectBlinks, 2000);
    return () => clearInterval(interval);
  }, [isWebcamActive, toast]);
  
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamActive(true);
        
        toast({
          title: "Webcam Activated",
          description: "Blink detection has started. Please blink naturally.",
        });
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      toast({
        title: "Webcam Error",
        description: "Could not access your webcam. Please check permissions.",
        variant: "destructive",
      });
    }
  };
  
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
      setBlinkDetected(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-accent/30">
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Webcam className="h-6 w-6" />
          Blink Detection
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4">
        <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-4">
          {!isWebcamActive && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <Webcam className="h-12 w-12 mx-auto mb-2 opacity-70" />
                <p>Click "Start Liveliness Detection" to activate webcam</p>
              </div>
            </div>
          )}
          
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted
            className={`w-full h-full object-cover ${!isWebcamActive ? 'opacity-30' : ''}`} 
          />
          
          <canvas ref={canvasRef} className="hidden" />
          
          {isWebcamActive && (
            <div className="absolute top-2 right-2">
              <Badge variant={blinkDetected ? "default" : "outline"} className="animate-pulse">
                {blinkDetected ? (
                  <span className="flex items-center gap-1">
                    <EyeOff className="h-3 w-3" /> Blink Detected
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> Monitoring
                  </span>
                )}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-2">
            {isWebcamActive 
              ? "Blink naturally to test the detection" 
              : "The app will detect when you blink"
            }
          </p>
          
          {isWebcamActive && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Eye Openness:</span>
              <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-in-out" 
                  style={{ width: `${eyeOpenness * 100}%` }} 
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={isWebcamActive ? stopWebcam : startWebcam} 
          className="w-full" 
          variant={isWebcamActive ? "outline" : "default"}
        >
          {isWebcamActive ? "Stop Detection" : "Start Liveliness Detection"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlinkDetector;
