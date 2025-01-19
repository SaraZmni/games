

// types.ts

// Define the properties for a single circle
export interface CircleType {
  x: number;      // X-coordinate of the circle
  y: number;      // Y-coordinate of the circle
  bgColor: string; // Background color of the circle
}

export interface CircleFullType extends CircleType {
  id: number;     // Unique identifier for the circle
}

// Define the props for the Circles component
export interface CirclesProps {
  circles: CircleFullType[]; // Array of circles
}