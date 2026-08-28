"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { Size } from "./size";
import { Variant } from "./variant";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  size?: Size;
  variant?: Variant;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  className = "",
  onClick,
  href,
  size = Size.MEDIUM,
  variant = Variant.PRIMARY,
  type = "button",
}: ButtonProps) => {
  const sizeClasses =
    size === Size.SMALL
      ? "px-3 py-1 text-sm"
      : size === Size.LARGE
        ? "px-6 py-3 text-lg"
        : "px-4 py-2 text-base";

  const variantClasses =
    variant === Variant.SECONDARY
      ? "bg-purple-1000 text-white hover:opacity-90 active:opacity-80"
      : variant === Variant.TERTIARY
        ? "bg-red-1000 text-white hover:opacity-90 active:opacity-80"
        : "bg-blue-1000 text-white hover:opacity-90 active:opacity-80";

  const classes = `${sizeClasses} ${variantClasses} rounded-md shadow transition cursor-pointer focus:outline-2 focus:outline-offset-2 ${className}`;

  return href ? (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
