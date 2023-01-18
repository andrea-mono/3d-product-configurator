import { Vector3 } from 'three';

export interface Color {
  name: string;
  hex: string;
}

export interface Section {
  title: keyof Settings;
  cameraPosition: Pick<Vector3, 'x' | 'y' | 'z'>;
  colors: Color[];
}

export interface Settings {
  none?: string;
  laces: string;
  caps: string;
  sole: string;
  stripes: string;
  patch: string;
  band: string;
  outer: string;
  inner: string;
}
