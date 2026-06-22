import * as React from 'react';

// อินเตอร์เฟซสำหรับ Props ทั่วไปของ Controlled State
interface CommonControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
}

// คัสตอมฮุกสำหรับจัดการค่าสถานะที่ควบคุมได้ (Controlled) หรือควบคุมเองภายใน (Uncontrolled)
export function useControlledState<T, Rest extends unknown[] = []>(
  props: CommonControlledStateProps<T> & {
    onChange?: (value: T, ...args: Rest) => void;
  },
): readonly [T, (next: T, ...args: Rest) => void] {
  const { value, defaultValue, onChange } = props;

  // กำหนดสถานะภายในเริ่มต้น โดยเลือกใช้ค่าควบคุมจากภายนอกหากถูกส่งเข้ามา
  const [state, setInternalState] = React.useState<T>(
    value !== undefined ? value : (defaultValue as T),
  );

  // คอยอัปเดตสถานะภายในเมื่อค่าจากภายนอก (value) มีการเปลี่ยนแปลง
  React.useEffect(() => {
    if (value !== undefined) setInternalState(value);
  }, [value]);

  // ฟังก์ชันสำหรับเปลี่ยนค่าสถานะและเรียกคอลแบ็ก onChange ของภายนอก
  const setState = React.useCallback(
    (next: T, ...args: Rest) => {
      setInternalState(next);
      onChange?.(next, ...args);
    },
    [onChange],
  );

  return [state, setState] as const;
}
