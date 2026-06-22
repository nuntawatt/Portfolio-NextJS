// ฟังก์ชันยูทิลิตี้สำหรับการส่งคำขอข้อมูลแบบ GET (HTTP GET Request)
// รองรับการแปลงรูปแบบข้อมูลส่งคืนเป็นรูปแบบ Generic Type (T) และจะโยนข้อผิดพลาดหากเกิดข้อผิดพลาดในการดึงข้อมูล
export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}
