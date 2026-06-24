// ฟังก์ชันสำหรับผสานคลาส CSS (CSS Classnames Merger) โดยกรองค่า Falsy ทั้งหมดออก
export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}
