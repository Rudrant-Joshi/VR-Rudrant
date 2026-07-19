import { motion } from "motion/react";

const NEURAL_NODES = [
  { x: 260, y: 180, r: 2.5, delay: 0.1, duration: 1.5 },
  { x: 280, y: 160, r: 1.5, delay: 0.5, duration: 2.0 },
  { x: 300, y: 150, r: 3, delay: 0.8, duration: 1.8 },
  { x: 320, y: 145, r: 2, delay: 1.2, duration: 2.2 },
  { x: 340, y: 155, r: 2.5, delay: 0.3, duration: 1.6 },
  { x: 360, y: 170, r: 1.5, delay: 0.7, duration: 1.9 },
  { x: 370, y: 190, r: 2, delay: 1.5, duration: 2.5 },
  { x: 250, y: 210, r: 1.5, delay: 0.9, duration: 2.1 },
  { x: 275, y: 200, r: 2.5, delay: 0.2, duration: 1.7 },
  { x: 295, y: 185, r: 1.5, delay: 1.1, duration: 2.3 },
  { x: 315, y: 175, r: 3, delay: 0.4, duration: 1.5 },
  { x: 335, y: 180, r: 2, delay: 1.3, duration: 2.4 },
  { x: 355, y: 195, r: 2.5, delay: 0.6, duration: 1.8 },
  { x: 285, y: 220, r: 2, delay: 1.0, duration: 2.0 },
  { x: 310, y: 210, r: 1.5, delay: 0.3, duration: 1.7 },
  { x: 330, y: 215, r: 2.5, delay: 0.8, duration: 2.2 },
  { x: 350, y: 225, r: 1.5, delay: 1.4, duration: 1.9 },
];

const NEURAL_CONNECTIONS = [
  { from: 0, to: 8 },
  { from: 8, to: 9 },
  { from: 9, to: 10 },
  { from: 10, to: 11 },
  { from: 11, to: 12 },
  { from: 1, to: 9 },
  { from: 2, to: 10 },
  { from: 3, to: 11 },
  { from: 4, to: 12 },
  { from: 5, to: 6 },
  { from: 13, to: 14 },
  { from: 14, to: 15 },
  { from: 15, to: 16 },
];

export default function AgentVisual() {
  return (
    <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center">
      {/* Subtle ambient light glow underneath the visor area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />
      
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full drop-shadow-[0_0_50px_rgba(255,90,0,0.05)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Head profile dark gradient */}
          <linearGradient id="headGrad" x1="200" y1="120" x2="400" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#121212" />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>

          {/* Glowing back-rim highlighting */}
          <linearGradient id="rimGrad" x1="180" y1="150" x2="350" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff5500" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ff4400" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          {/* Visor fill gradient */}
          <linearGradient id="visorFillGrad" x1="260" y1="240" x2="450" y2="295" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff3c00" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ff6a00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffb300" stopOpacity="0.8" />
          </linearGradient>

          {/* Visor border gradient */}
          <linearGradient id="visorBorderGrad" x1="260" y1="240" x2="450" y2="295" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff3c00" />
            <stop offset="50%" stopColor="#ffaa00" />
            <stop offset="100%" stopColor="#ffe600" />
          </linearGradient>

          {/* Visor reflection pattern overlay */}
          <linearGradient id="reflectionGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Neon glow filters */}
          <filter id="neonVisorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neonNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. NECK & SHOULDER BASES */}
        <path
          d="M 215 360 C 200 420, 180 480, 160 520 L 370 520 C 360 480, 350 430, 345 375 Z"
          fill="url(#headGrad)"
        />
        {/* Subtle orange rim light on back neck */}
        <path
          d="M 215 360 C 200 420, 180 480, 160 520"
          stroke="url(#rimGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* 2. HEAD SILHOUETTE */}
        {/* This path outlines a beautiful humanoid profile facing right */}
        <path
          id="headSilhouette"
          d="M 250 150 
             C 300 120, 375 140, 395 210 
             C 398 220, 401 228, 404 235 
             C 412 243, 424 248, 424 258 
             C 424 265, 412 268, 408 271 
             C 404 274, 408 280, 404 286 
             C 400 291, 392 293, 392 297 
             C 392 303, 396 310, 390 316 
             C 380 326, 362 334, 345 338 
             C 310 346, 280 334, 260 310 
             C 215 260, 215 180, 250 150 Z"
          fill="url(#headGrad)"
        />

        {/* 3. NEURAL NETWORK CONNECTIONS (Twinkling lines inside brain) */}
        <g opacity="0.45">
          {NEURAL_CONNECTIONS.map((conn, idx) => {
            const p1 = NEURAL_NODES[conn.from];
            const p2 = NEURAL_NODES[conn.to];
            return (
              <motion.line
                key={`line-${idx}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#ff7a00"
                strokeWidth="0.75"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.6, 0.1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: (idx * 0.15) % 1.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </g>

        {/* 4. NEURAL NODES (Brain thinking lights) */}
        <g>
          {NEURAL_NODES.map((node, idx) => (
            <g key={`node-${idx}`}>
              {/* Outer pulsing glow */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r + 2}
                fill="#ff5500"
                opacity="0.15"
                filter="url(#neonNodeGlow)"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.08, 0.25, 0.08],
                }}
                transition={{
                  duration: node.duration,
                  repeat: Infinity,
                  delay: node.delay,
                  ease: "easeInOut",
                }}
              />
              {/* Solid core node */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={idx % 3 === 0 ? "#ffb300" : "#ff5500"}
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: node.duration,
                  repeat: Infinity,
                  delay: node.delay,
                  ease: "easeInOut",
                }}
              />
            </g>
          ))}
        </g>

        {/* 5. THE GLOWING NEON VISOR */}
        {/* Underlayer extreme blur shadow */}
        <path
          d="M 245 228 
             C 290 218, 350 228, 410 242 
             L 435 252 
             C 440 257, 440 266, 430 274 
             L 405 280 
             C 350 266, 290 256, 245 248 Z"
          fill="#ff4400"
          opacity="0.3"
          filter="url(#neonVisorGlow)"
        />

        {/* Actual Visor body */}
        <g filter="url(#neonVisorGlow)">
          <path
            d="M 245 228 
               C 290 218, 350 228, 410 242 
               L 435 252 
               C 440 257, 440 266, 430 274 
               L 405 280 
               C 350 266, 290 256, 245 248 Z"
            fill="url(#visorFillGrad)"
            stroke="url(#visorBorderGrad)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Visor technical internal lines */}
        <path
          d="M 255 233 C 300 224, 350 234, 400 247 M 250 241 C 295 232, 345 242, 395 255"
          stroke="#ffe600"
          strokeWidth="0.5"
          strokeDasharray="4 2"
          opacity="0.4"
        />

        {/* 6. GLORIOUS REFLECTION SWEEP ANIMATION */}
        {/* We mask this reflection sweep inside the visor path shape */}
        <mask id="visorMask">
          <path
            d="M 245 228 
               C 290 218, 350 228, 410 242 
               L 435 252 
               C 440 257, 440 266, 430 274 
               L 405 280 
               C 350 266, 290 256, 245 248 Z"
            fill="#ffffff"
          />
        </mask>

        <g mask="url(#visorMask)">
          <motion.rect
            x="100"
            y="180"
            width="250"
            height="150"
            fill="url(#reflectionGrad)"
            transform="skewX(-25)"
            animate={{
              x: [-150, 450],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />
        </g>

        {/* Ambient visor glow on front facial features (Rim light) */}
        <path
          d="M 404 235 C 412 243, 424 248, 424 258 C 424 265, 412 268, 408 271"
          stroke="#ff6a00"
          strokeWidth="1.5"
          opacity="0.5"
          filter="url(#neonNodeGlow)"
          fill="none"
        />
      </svg>
    </div>
  );
}
