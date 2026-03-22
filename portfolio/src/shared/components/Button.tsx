"use client";

import type { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return (
    <button
      className={`h-10 rounded-md bg-black px-4 text-white disabled:opacity-50 ${className ?? ""}`}
      {...rest}
    />
  );
}
