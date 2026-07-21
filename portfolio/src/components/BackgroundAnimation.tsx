//  import { useEffect, useRef } from "react";
// import "./BackgroundAnimation.css";

// interface Particle {
//   x: number;
//   y: number;
//   velocityX: number;
//   velocityY: number;
//   size: number;
//   opacity: number;
// }

// function BackgroundAnimation() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (!canvas) {
//       return;
//     }

//     const context = canvas.getContext("2d");

//     if (!context) {
//       return;
//     }

//     const reducedMotionQuery = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     );

//     const prefersReducedMotion = reducedMotionQuery.matches;

//     let animationFrameId: number | null = null;
//     let particles: Particle[] = [];

//     let screenWidth = window.innerWidth;
//     let screenHeight = window.innerHeight;
//     let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

//     let mouseX = screenWidth / 2;
//     let mouseY = screenHeight / 2;

//     const particleCount = prefersReducedMotion ? 25 : 55;
//     const connectionDistance = 140;
//     const mouseDistanceLimit = 180;

//     const accentColor = {
//       red: 124,
//       green: 108,
//       blue: 255,
//     };

//     function createParticles(): void {
//       particles = Array.from(
//         { length: particleCount },
//         (): Particle => ({
//           x: Math.random() * screenWidth,
//           y: Math.random() * screenHeight,

//           velocityX: (Math.random() - 0.5) * 0.35,
//           velocityY: (Math.random() - 0.5) * 0.35,

//           size: Math.random() * 2 + 1,
//           opacity: Math.random() * 0.45 + 0.15,
//         }),
//       );
//     }

//     function resizeCanvas(): void {
//       screenWidth = window.innerWidth;
//       screenHeight = window.innerHeight;
//       pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

//       canvas.width = Math.floor(screenWidth * pixelRatio);
//       canvas.height = Math.floor(screenHeight * pixelRatio);

//       canvas.style.width = `${screenWidth}px`;
//       canvas.style.height = `${screenHeight}px`;

//       context.setTransform(
//         pixelRatio,
//         0,
//         0,
//         pixelRatio,
//         0,
//         0,
//       );

//       mouseX = screenWidth / 2;
//       mouseY = screenHeight / 2;

//       createParticles();
//     }

//     function updateParticle(particle: Particle): void {
//       if (prefersReducedMotion) {
//         return;
//       }

//       particle.x += particle.velocityX;
//       particle.y += particle.velocityY;

//       const distanceX = mouseX - particle.x;
//       const distanceY = mouseY - particle.y;

//       const distanceFromMouse = Math.hypot(
//         distanceX,
//         distanceY,
//       );

//       if (
//         distanceFromMouse < mouseDistanceLimit &&
//         distanceFromMouse > 0
//       ) {
//         particle.x -= distanceX * 0.0008;
//         particle.y -= distanceY * 0.0008;
//       }

//       if (particle.x <= 0) {
//         particle.x = 0;
//         particle.velocityX = Math.abs(particle.velocityX);
//       }

//       if (particle.x >= screenWidth) {
//         particle.x = screenWidth;
//         particle.velocityX = -Math.abs(particle.velocityX);
//       }

//       if (particle.y <= 0) {
//         particle.y = 0;
//         particle.velocityY = Math.abs(particle.velocityY);
//       }

//       if (particle.y >= screenHeight) {
//         particle.y = screenHeight;
//         particle.velocityY = -Math.abs(particle.velocityY);
//       }
//     }

//     function drawParticle(particle: Particle): void {
//       context.beginPath();

//       context.arc(
//         particle.x,
//         particle.y,
//         particle.size,
//         0,
//         Math.PI * 2,
//       );

//       context.fillStyle = `rgba(
//         ${accentColor.red},
//         ${accentColor.green},
//         ${accentColor.blue},
//         ${particle.opacity}
//       )`;

//       context.fill();
//     }

//     function drawConnections(
//       currentParticle: Particle,
//       currentIndex: number,
//     ): void {
//       for (
//         let otherIndex = currentIndex + 1;
//         otherIndex < particles.length;
//         otherIndex += 1
//       ) {
//         const otherParticle = particles[otherIndex];

//         /*
//           TypeScript may think the array position
//           could be undefined. This check fixes that.
//         */
//         if (!otherParticle) {
//           continue;
//         }

//         const lineDistance = Math.hypot(
//           currentParticle.x - otherParticle.x,
//           currentParticle.y - otherParticle.y,
//         );

//         if (lineDistance >= connectionDistance) {
//           continue;
//         }

//         const lineOpacity =
//           (1 - lineDistance / connectionDistance) *
//           0.18 *
//           currentParticle.opacity;

//         context.beginPath();

//         context.moveTo(
//           currentParticle.x,
//           currentParticle.y,
//         );

//         context.lineTo(
//           otherParticle.x,
//           otherParticle.y,
//         );

//         context.strokeStyle = `rgba(
//           ${accentColor.red},
//           ${accentColor.green},
//           ${accentColor.blue},
//           ${lineOpacity}
//         )`;

//         context.lineWidth = 0.8;
//         context.stroke();
//       }
//     }

//     function clearCanvas(): void {
//       /*
//         Reset the transform temporarily so the complete
//         physical canvas is cleared correctly.
//       */
//       context.setTransform(1, 0, 0, 1, 0, 0);

//       context.clearRect(
//         0,
//         0,
//         canvas.width,
//         canvas.height,
//       );

//       context.setTransform(
//         pixelRatio,
//         0,
//         0,
//         pixelRatio,
//         0,
//         0,
//       );
//     }

//     function renderFrame(): void {
//       clearCanvas();

//       for (
//         let particleIndex = 0;
//         particleIndex < particles.length;
//         particleIndex += 1
//       ) {
//         const particle = particles[particleIndex];

//         /*
//           This check prevents the TypeScript error:
//           "particle is possibly undefined."
//         */
//         if (!particle) {
//           continue;
//         }

//         updateParticle(particle);
//         drawParticle(particle);
//         drawConnections(particle, particleIndex);
//       }
//     }

//     function animate(): void {
//       renderFrame();

//       animationFrameId =
//         window.requestAnimationFrame(animate);
//     }

//     function handleMouseMove(event: MouseEvent): void {
//       mouseX = event.clientX;
//       mouseY = event.clientY;
//     }

//     function handleMouseLeave(): void {
//       mouseX = screenWidth / 2;
//       mouseY = screenHeight / 2;
//     }

//     function handleResize(): void {
//       resizeCanvas();

//       if (prefersReducedMotion) {
//         renderFrame();
//       }
//     }

//     resizeCanvas();

//     window.addEventListener("resize", handleResize);

//     if (prefersReducedMotion) {
//       /*
//         Draw only once when the user has requested
//         reduced animation.
//       */
//       renderFrame();
//     } else {
//       window.addEventListener(
//         "mousemove",
//         handleMouseMove,
//       );

//       window.addEventListener(
//         "mouseleave",
//         handleMouseLeave,
//       );

//       animate();
//     }

//     /*
//       Cleanup runs when the component is removed.
//       It prevents memory and performance problems.
//     */
//     return () => {
//       if (animationFrameId !== null) {
//         window.cancelAnimationFrame(animationFrameId);
//       }

//       window.removeEventListener(
//         "resize",
//         handleResize,
//       );

//       window.removeEventListener(
//         "mousemove",
//         handleMouseMove,
//       );

//       window.removeEventListener(
//         "mouseleave",
//         handleMouseLeave,
//       );
//     };
//   }, []);

//   return (
//     <div
//       className="background-animation"
//       aria-hidden="true"
//     >
//       <div className="bg-gradient-mesh" />

//       <div className="bg-orb bg-orb--one" />
//       <div className="bg-orb bg-orb--two" />
//       <div className="bg-orb bg-orb--three" />

//       <div className="bg-grid" />

//       <canvas
//         ref={canvasRef}
//         className="bg-canvas"
//       />

//       <div className="bg-vignette" />
//     </div>
//   );
// }

// export default BackgroundAnimation;
import { useEffect, useRef } from "react";
import "./BackgroundAnimation.css";

interface Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  opacity: number;
}

function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    /*
      canvasRef.current can initially be null.

      We first check canvasElement and contextElement.
      After checking, we create strongly typed variables.
    */
    const canvasElement = canvasRef.current;

    if (canvasElement === null) {
      return;
    }

    const contextElement = canvasElement.getContext("2d");

    if (contextElement === null) {
      return;
    }

    /*
      These variables are now guaranteed not to be null.

      Use canvas and context everywhere below instead of
      canvasRef.current or contextElement.
    */
    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = contextElement;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrameId: number | null = null;
    let particles: Particle[] = [];

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    let mouseX = screenWidth / 2;
    let mouseY = screenHeight / 2;

    const particleCount = prefersReducedMotion ? 25 : 55;
    const connectionDistance = 140;
    const mouseReactionDistance = 180;

    const accentColor = {
      red: 124,
      green: 108,
      blue: 255,
    };

    function createParticles(): void {
      particles = Array.from(
        { length: particleCount },
        (): Particle => ({
          x: Math.random() * screenWidth,
          y: Math.random() * screenHeight,

          velocityX: (Math.random() - 0.5) * 0.35,
          velocityY: (Math.random() - 0.5) * 0.35,

          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.45 + 0.15,
        }),
      );
    }

    function resizeCanvas(): void {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;

      pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      /*
        The real canvas resolution is multiplied by
        the pixel ratio so it looks sharp.
      */
      canvas.width = Math.floor(
        screenWidth * pixelRatio,
      );

      canvas.height = Math.floor(
        screenHeight * pixelRatio,
      );

      /*
        The visible CSS size remains equal to the screen.
      */
      canvas.style.width = `${screenWidth}px`;
      canvas.style.height = `${screenHeight}px`;

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0,
      );

      mouseX = screenWidth / 2;
      mouseY = screenHeight / 2;

      createParticles();
    }

    function updateParticle(particle: Particle): void {
      if (prefersReducedMotion) {
        return;
      }

      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      const distanceX = mouseX - particle.x;
      const distanceY = mouseY - particle.y;

      const distanceFromMouse = Math.hypot(
        distanceX,
        distanceY,
      );

      /*
        Move particles slightly away from the mouse.
      */
      if (
        distanceFromMouse < mouseReactionDistance &&
        distanceFromMouse > 0
      ) {
        particle.x -= distanceX * 0.0008;
        particle.y -= distanceY * 0.0008;
      }

      /*
        Keep particles inside the screen.
      */
      if (particle.x <= 0) {
        particle.x = 0;
        particle.velocityX = Math.abs(
          particle.velocityX,
        );
      }

      if (particle.x >= screenWidth) {
        particle.x = screenWidth;
        particle.velocityX = -Math.abs(
          particle.velocityX,
        );
      }

      if (particle.y <= 0) {
        particle.y = 0;
        particle.velocityY = Math.abs(
          particle.velocityY,
        );
      }

      if (particle.y >= screenHeight) {
        particle.y = screenHeight;
        particle.velocityY = -Math.abs(
          particle.velocityY,
        );
      }
    }

    function drawParticle(particle: Particle): void {
      context.beginPath();

      context.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2,
      );

      context.fillStyle = `rgba(${accentColor.red}, ${accentColor.green}, ${accentColor.blue}, ${particle.opacity})`;

      context.fill();
    }

    function drawConnections(
      currentParticle: Particle,
      currentIndex: number,
    ): void {
      for (
        let otherIndex = currentIndex + 1;
        otherIndex < particles.length;
        otherIndex += 1
      ) {
        const otherParticle = particles[otherIndex];

        /*
          This check prevents:
          "otherParticle is possibly undefined."
        */
        if (otherParticle === undefined) {
          continue;
        }

        const distance = Math.hypot(
          currentParticle.x - otherParticle.x,
          currentParticle.y - otherParticle.y,
        );

        if (distance >= connectionDistance) {
          continue;
        }

        const lineOpacity =
          (1 - distance / connectionDistance) *
          0.18 *
          currentParticle.opacity;

        context.beginPath();

        context.moveTo(
          currentParticle.x,
          currentParticle.y,
        );

        context.lineTo(
          otherParticle.x,
          otherParticle.y,
        );

        context.strokeStyle = `rgba(${accentColor.red}, ${accentColor.green}, ${accentColor.blue}, ${lineOpacity})`;

        context.lineWidth = 0.8;
        context.stroke();
      }
    }

    function clearCanvas(): void {
      /*
        Save the current scaled drawing state.
      */
      context.save();

      /*
        Temporarily return to the normal pixel scale.
      */
      context.setTransform(1, 0, 0, 1, 0, 0);

      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      /*
        Restore the previous scaled drawing state.
      */
      context.restore();
    }

    function renderFrame(): void {
      clearCanvas();

      for (
        let particleIndex = 0;
        particleIndex < particles.length;
        particleIndex += 1
      ) {
        const particle = particles[particleIndex];

        /*
          This check prevents:
          "particle is possibly undefined."
        */
        if (particle === undefined) {
          continue;
        }

        updateParticle(particle);
        drawParticle(particle);
        drawConnections(particle, particleIndex);
      }
    }

    function animate(): void {
      renderFrame();

      animationFrameId =
        window.requestAnimationFrame(animate);
    }

    function handleMouseMove(
      event: MouseEvent,
    ): void {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    function handleMouseLeave(): void {
      mouseX = screenWidth / 2;
      mouseY = screenHeight / 2;
    }

    function handleResize(): void {
      resizeCanvas();

      if (prefersReducedMotion) {
        renderFrame();
      }
    }

    /*
      Start the canvas.
    */
    resizeCanvas();

    window.addEventListener(
      "resize",
      handleResize,
    );

    if (prefersReducedMotion) {
      /*
        Draw only once when reduced motion is enabled.
      */
      renderFrame();
    } else {
      window.addEventListener(
        "mousemove",
        handleMouseMove,
      );

      window.addEventListener(
        "mouseleave",
        handleMouseLeave,
      );

      animate();
    }

    /*
      Cleanup when the component is removed.
    */
    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(
          animationFrameId,
        );
      }

      window.removeEventListener(
        "resize",
        handleResize,
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, []);

  return (
    <div
      className="background-animation"
      aria-hidden="true"
    >
      <div className="bg-gradient-mesh" />

      <div className="bg-orb bg-orb--one" />
      <div className="bg-orb bg-orb--two" />
      <div className="bg-orb bg-orb--three" />

      <div className="bg-grid" />

      <canvas
        ref={canvasRef}
        className="bg-canvas"
      />

      <div className="bg-vignette" />
    </div>
  );
}

export default BackgroundAnimation;