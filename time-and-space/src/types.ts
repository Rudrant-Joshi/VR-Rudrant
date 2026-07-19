/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Particle3D {
  pos: Point3D;
  color: string;
  size: number;
  type: 'core' | 'spike' | 'sparkle';
  angle?: number;
  length?: number;
  speedMultiplier: number;
  phase: number;
}

export interface TubeSegment3D {
  center: Point3D;
  normal: Point3D;
  radius: number;
  index: number;
}

export interface Drawable {
  z: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}
