// StatItem: โครงสร้างข้อมูลสำหรับเก็บข้อมูลสถิติแต่ละรายการ
export interface StatItem {
    value: number;
    suffix: string;
    label: string;
    labelKey: string;
    iconKey: string;
}

// ParticleData: โครงสร้างข้อมูลสำหรับจัดเก็บค่าต่าง ๆ ของแต่ละอนุภาค (Particle) ใน Canvas
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