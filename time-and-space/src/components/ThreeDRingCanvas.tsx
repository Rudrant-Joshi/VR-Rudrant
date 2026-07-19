/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Point3D, Particle3D, TubeSegment3D, Drawable } from '../types';

export default function ThreeDRingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D rotation angles
  const angleXRef = useRef<number>(0.2);
  const angleYRef = useRef<number>(0.4);
  const angleZRef = useRef<number>(0.0);

  // Mouse tracking for interactive rotation
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotationSpeedX = useRef<number>(0.005);
  const targetRotationSpeedY = useRef<number>(0.008);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Dimensions
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  // Handle resizing of the canvas container dynamically and robustly
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      
      // Debounce slightly or update smoothly
      const size = Math.max(280, Math.min(width, height, 700));
      setDimensions({ width: size, height: size });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Set up the particles inside the 3D loop
  const particlesRef = useRef<Particle3D[]>([]);

  useEffect(() => {
    // Generate particles representing the core and the spikes along the torus knot path
    const count = 350;
    const tempParticles: Particle3D[] = [];

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      // Core particle placement with a slight random offset
      tempParticles.push({
        pos: { x: 0, y: 0, z: 0 }, // Will be calculated along path dynamically
        color: i % 3 === 0 ? '#ff4500' : i % 3 === 1 ? '#ff7f00' : '#ffa500',
        size: Math.random() * 2 + 1,
        type: Math.random() > 0.8 ? 'sparkle' : 'core',
        speedMultiplier: Math.random() * 0.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
      });

      // Spiky thorn particles pointing outwards from the central core
      if (i % 2 === 0) {
        tempParticles.push({
          pos: { x: 0, y: 0, z: 0 },
          color: i % 4 === 0 ? '#ff1e00' : '#ff5500',
          size: Math.random() * 1.5 + 0.5,
          type: 'spike',
          angle: Math.random() * Math.PI * 2,
          length: Math.random() * 14 + 6, // Length of the thorns/spikes
          speedMultiplier: Math.random() * 0.8 + 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    particlesRef.current = tempParticles;
  }, []);

  // Main 3D Rendering and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let localTime = 0;

    // A beautiful 2,3-torus knot path equation (creates the intertwined double-ring)
    const getTorusKnotPoint = (t: number): Point3D => {
      // Trefoil / Torus Knot formulation
      const p = 2;
      const q = 3;
      const r = 1.05 + 0.35 * Math.cos(q * t);
      const x = r * Math.cos(p * t);
      const y = r * Math.sin(p * t);
      const z = 0.38 * Math.sin(q * t);
      
      // Scaling factor
      const scaleFactor = 110;
      return {
        x: x * scaleFactor,
        y: y * scaleFactor,
        z: z * scaleFactor,
      };
    };

    // Derivative/tangent of the torus knot path
    const getTorusKnotTangent = (t: number): Point3D => {
      const delta = 0.005;
      const p1 = getTorusKnotPoint(t - delta);
      const p2 = getTorusKnotPoint(t + delta);
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dz = p2.z - p1.z;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      return {
        x: dx / (len || 1),
        y: dy / (len || 1),
        z: dz / (len || 1),
      };
    };

    const render = () => {
      localTime += 0.012;

      // Slowly increment automatic rotation if user is not actively dragging
      if (!isDraggingRef.current) {
        angleXRef.current += targetRotationSpeedX.current;
        angleYRef.current += targetRotationSpeedY.current;
        // Damp down rotation speed if it was accelerated
        targetRotationSpeedX.current += (0.002 - targetRotationSpeedX.current) * 0.02;
        targetRotationSpeedY.current += (0.003 - targetRotationSpeedY.current) * 0.02;
      }

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;

      // Clear with plane black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const cosX = Math.cos(angleXRef.current);
      const sinX = Math.sin(angleXRef.current);
      const cosY = Math.cos(angleYRef.current);
      const sinY = Math.sin(angleYRef.current);
      const cosZ = Math.cos(angleZRef.current);
      const sinZ = Math.sin(angleZRef.current);

      // 3D rotation projection helper
      const projectPoint = (point: Point3D) => {
        // Rotate Y
        let x1 = point.x * cosY - point.z * sinY;
        let z1 = point.x * sinY + point.z * cosY;

        // Rotate X
        let y2 = point.y * cosX - z1 * sinX;
        let z2 = point.y * sinX + z1 * cosX;

        // Rotate Z
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;

        // Perspective projection
        const d = 400; // Camera distance
        const perspective = d / (d + z2);

        return {
          sx: cx + x3 * perspective,
          sy: cy + y3 * perspective,
          sz: z2, // Store depth for z-sorting
          szOriginal: z1,
          scale: perspective,
        };
      };

      // Drawables collection for depth sorting
      const drawables: Drawable[] = [];

      // 1. Generate Glass Tube Segments
      const tubeSegmentsCount = 180;
      for (let i = 0; i < tubeSegmentsCount; i++) {
        const t = (i / tubeSegmentsCount) * Math.PI * 2;
        const center = getTorusKnotPoint(t);
        const tangent = getTorusKnotTangent(t);
        
        const proj = projectPoint(center);

        // Define a vector perpendicular to the tangent to find the normal ring offsets
        const normal: Point3D = {
          x: -tangent.y,
          y: tangent.x,
          z: 0
        };
        const normalLen = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
        if (normalLen > 0) {
          normal.x /= normalLen;
          normal.y /= normalLen;
        }

        // Add glass segment drawable
        drawables.push({
          z: proj.sz,
          draw: (c) => {
            const tubeRadius = 24 * proj.scale;
            
            // Draw glass outer capsule/rim
            c.beginPath();
            c.arc(proj.sx, proj.sy, tubeRadius, 0, Math.PI * 2);
            
            // Translucent glass fill
            const glassGrad = c.createRadialGradient(
              proj.sx - tubeRadius * 0.3, 
              proj.sy - tubeRadius * 0.3, 
              0, 
              proj.sx, 
              proj.sy, 
              tubeRadius
            );
            glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
            glassGrad.addColorStop(0.7, 'rgba(100, 150, 255, 0.05)');
            glassGrad.addColorStop(0.9, 'rgba(255, 255, 255, 0.22)'); // Light highlight at border for glass effect
            glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
            
            c.fillStyle = glassGrad;
            c.fill();

            // Glass stroke/outline (highlights the glossy ring boundaries)
            c.strokeStyle = 'rgba(255, 255, 255, 0.09)';
            c.lineWidth = 0.5 + proj.scale * 0.5;
            c.stroke();

            // Add light refraction/sheen on the glass surface
            c.beginPath();
            c.ellipse(
              proj.sx - tubeRadius * 0.4,
              proj.sy - tubeRadius * 0.4,
              tubeRadius * 0.2,
              tubeRadius * 0.4,
              Math.PI / 4,
              0,
              Math.PI * 2
            );
            c.fillStyle = 'rgba(255, 255, 255, 0.12)';
            c.fill();
          }
        });
      }

      // 2. Map and generate particles along the torus knot path
      particlesRef.current.forEach((p, idx) => {
        // Distribute particle coordinates smoothly along the loop
        const t = (idx / particlesRef.current.length) * Math.PI * 2;
        const center = getTorusKnotPoint(t);
        const tangent = getTorusKnotTangent(t);

        // Create perpendicular vectors for spiky direction
        let perpX = -tangent.y;
        let perpY = tangent.x;
        let perpZ = -tangent.z;
        const len = Math.sqrt(perpX * perpX + perpY * perpY + perpZ * perpZ);
        if (len > 0) {
          perpX /= len;
          perpY /= len;
          perpZ /= len;
        }

        // Particle core movement/pulse animation
        const pulse = Math.sin(localTime * p.speedMultiplier * 5 + p.phase);
        const ringInnerRadius = 8;
        
        let particlePos: Point3D = { ...center };

        if (p.type === 'core') {
          // Wrap core closely around central loop
          const offsetDist = (pulse * 3) + 2;
          const angle = p.phase + localTime * p.speedMultiplier;
          particlePos.x += (Math.cos(angle) * perpX) * offsetDist;
          particlePos.y += (Math.sin(angle) * perpY) * offsetDist;
          particlePos.z += (Math.cos(angle) * perpZ) * offsetDist;

          const proj = projectPoint(particlePos);
          drawables.push({
            z: proj.sz,
            draw: (c) => {
              c.beginPath();
              c.arc(proj.sx, proj.sy, p.size * proj.scale, 0, Math.PI * 2);
              
              const particleGrad = c.createRadialGradient(
                proj.sx, proj.sy, 0,
                proj.sx, proj.sy, p.size * proj.scale * 2
              );
              particleGrad.addColorStop(0, '#ffffff');
              particleGrad.addColorStop(0.3, p.color);
              particleGrad.addColorStop(1, 'rgba(255, 69, 0, 0)');

              c.fillStyle = particleGrad;
              c.fill();
            }
          });

        } else if (p.type === 'spike') {
          // Spiky thorns shooting out from the loop core
          const spikeAngle = p.angle || 0;
          const maxLen = (p.length || 10) * (1.0 + 0.25 * pulse); // pulse thorn length
          
          // Vector direction for this spike
          const dirX = Math.cos(spikeAngle) * perpX - Math.sin(spikeAngle) * perpY;
          const dirY = Math.cos(spikeAngle) * perpY + Math.sin(spikeAngle) * perpX;
          const dirZ = Math.sin(spikeAngle) * perpZ;

          const spikeBase = {
            x: center.x + dirX * ringInnerRadius * 0.5,
            y: center.y + dirY * ringInnerRadius * 0.5,
            z: center.z + dirZ * ringInnerRadius * 0.5,
          };

          const spikeTip = {
            x: center.x + dirX * maxLen,
            y: center.y + dirY * maxLen,
            z: center.z + dirZ * maxLen,
          };

          const projBase = projectPoint(spikeBase);
          const projTip = projectPoint(spikeTip);

          drawables.push({
            z: (projBase.sz + projTip.sz) / 2,
            draw: (c) => {
              // Draw the core glowing spike line
              const grad = c.createLinearGradient(projBase.sx, projBase.sy, projTip.sx, projTip.sy);
              grad.addColorStop(0, '#ffffff');
              grad.addColorStop(0.2, '#ffaa00');
              grad.addColorStop(0.5, '#ff4500');
              grad.addColorStop(1, 'rgba(255, 30, 0, 0)');

              c.beginPath();
              c.moveTo(projBase.sx, projBase.sy);
              
              // Give it a slightly thorny, curved organic structure
              const midX = (projBase.sx + projTip.sx) / 2 + (Math.sin(localTime * 10 + idx) * 3 * projBase.scale);
              const midY = (projBase.sx + projTip.sy) / 2 + (Math.cos(localTime * 10 + idx) * 3 * projBase.scale);
              
              c.quadraticCurveTo(midX, midY, projTip.sx, projTip.sy);

              c.strokeStyle = grad;
              c.lineWidth = (1.5 + Math.abs(pulse) * 1.5) * projBase.scale;
              c.lineCap = 'round';
              c.stroke();

              // Tiny glow at the tip of the spike
              c.beginPath();
              c.arc(projTip.sx, projTip.sy, 1.5 * projTip.scale, 0, Math.PI * 2);
              c.fillStyle = 'rgba(255, 120, 0, 0.4)';
              c.fill();
            }
          });

        } else if (p.type === 'sparkle') {
          // Sparkle drift animation escaping the glass
          const driftPhase = (localTime * p.speedMultiplier * 0.4) % 1;
          const angle = p.phase;
          const driftDist = ringInnerRadius + driftPhase * 28;

          particlePos.x += Math.cos(angle) * perpX * driftDist;
          particlePos.y += Math.sin(angle) * perpY * driftDist;
          particlePos.z += Math.sin(angle) * perpZ * driftDist;

          const proj = projectPoint(particlePos);
          const opacity = 1 - driftPhase; // Fade out

          drawables.push({
            z: proj.sz,
            draw: (c) => {
              c.beginPath();
              c.arc(proj.sx, proj.sy, (p.size * 0.8) * proj.scale, 0, Math.PI * 2);
              c.fillStyle = `rgba(255, 230, 180, ${opacity * 0.85})`;
              c.fill();

              // Radial sparkle glow
              if (driftPhase < 0.3) {
                c.beginPath();
                c.moveTo(proj.sx - 3, proj.sy);
                c.lineTo(proj.sx + 3, proj.sy);
                c.moveTo(proj.sx, proj.sy - 3);
                c.lineTo(proj.sx, proj.sy + 3);
                c.strokeStyle = `rgba(255, 255, 255, ${(1 - driftPhase / 0.3) * 0.5})`;
                c.lineWidth = 0.5;
                c.stroke();
              }
            }
          });
        }
      });

      // 3. Sort by Z depth (Largest Z is furthest back -> rendered first)
      drawables.sort((a, b) => b.z - a.z);

      // 4. Render all Drawables in depth-sorted sequence
      drawables.forEach((drawable) => drawable.draw(ctx));

      // Draw subtle light flare at the center to tie the infinity rings together
      const centralGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      centralGlow.addColorStop(0, 'rgba(255, 80, 0, 0.05)');
      centralGlow.addColorStop(0.5, 'rgba(255, 40, 0, 0.01)');
      centralGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centralGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions]);

  // Mouse drag handlers to rotate 3D ring manually
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      // Adjust angles based on mouse drag delta
      angleYRef.current += deltaX * 0.008;
      angleXRef.current += deltaY * 0.008;

      previousMousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };

      // Set speed refs to match drag direction for momentum after release
      targetRotationSpeedY.current = deltaX * 0.0015;
      targetRotationSpeedX.current = deltaY * 0.0015;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Touch controls for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingRef.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      angleYRef.current += deltaX * 0.01;
      angleXRef.current += deltaY * 0.01;

      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      targetRotationSpeedY.current = deltaX * 0.002;
      targetRotationSpeedX.current = deltaY * 0.002;
    }
  };

  return (
    <div
      id="three-d-ring-wrapper"
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={() => {
        handleMouseUpOrLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUpOrLeave}
    >
      {/* 3D Canvas rendering the glossy torus knot ring */}
      <canvas
        id="torus-knot-canvas"
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block rounded-full transition-transform duration-500 ease-out"
        style={{
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
      />

      {/* Interactive hover instruction overlay */}
      <div 
        id="interactive-hint"
        className={`absolute bottom-3 text-[10px] uppercase font-mono tracking-widest text-neutral-500 transition-opacity duration-300 pointer-events-none select-none ${
          isHovered ? 'opacity-60' : 'opacity-0'
        }`}
      >
        Drag to rotate in 3D
      </div>
    </div>
  );
}
