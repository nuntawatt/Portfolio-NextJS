"use client";

import type { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      className={`h-10 w-full rounded-md border border-black/10 px-3 outline-none focus:ring-2 focus:ring-black/20 ${className ?? ""}`}
      {...rest}
    />
  );
}
