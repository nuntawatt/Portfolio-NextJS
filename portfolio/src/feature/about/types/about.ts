export interface StatItem {
    value: number;
    suffix: string;
    label: string;
    labelKey: string;
    iconKey: string;
}

export interface ParticleData {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    size: number;
    opacity: number;
    colorIdx: number;
}