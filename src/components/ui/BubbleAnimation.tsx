"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

export function BubbleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Base brand colors - brighter but still clean
    const colors = [
      "rgba(0, 82, 255, 0.18)", // baseBlue with brighter opacity
      "rgba(229, 233, 255, 0.14)", // baseBlueLight with brighter opacity
      "rgba(0, 82, 255, 0.12)", // lighter baseBlue
    ];

    // Create bubbles function
    const createBubbles = () => {
      const bubbles: Bubble[] = [];
      const bubbleCount = Math.min(25, Math.floor((canvas.width * canvas.height) / 60000));

      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 35 + 15, // Smaller bubbles: 15-50px
          vx: (Math.random() - 0.5) * 0.4, // Slower, smoother movement
          vy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.3 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      bubblesRef.current = bubbles;
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recreate bubbles on resize
      createBubbles();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    createBubbles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Bounce off edges
        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) {
          bubble.vx *= -1;
        }
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) {
          bubble.vy *= -1;
        }

        // Keep bubbles in bounds
        bubble.x = Math.max(bubble.radius, Math.min(canvas.width - bubble.radius, bubble.x));
        bubble.y = Math.max(bubble.radius, Math.min(canvas.height - bubble.radius, bubble.y));

        // Draw bubble with clean, subtle gradient
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.2,
          bubble.y - bubble.radius * 0.2,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );

        const colorMatch = bubble.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (colorMatch) {
          const [, r, g, b, a] = colorMatch;
          const baseOpacity = parseFloat(a);
          // Brighter gradient for more visibility
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${baseOpacity * 1.0})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${baseOpacity * 0.5})`);
          gradient.addColorStop(0.9, `rgba(${r}, ${g}, ${b}, ${baseOpacity * 0.15})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        }

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add subtle anti-aliasing
        ctx.globalCompositeOperation = "source-over";
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
      }}
    />
  );
}

