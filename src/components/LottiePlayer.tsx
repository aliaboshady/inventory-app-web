"use client";

import Lottie, { LottieComponentProps } from "lottie-react";

type LottiePlayerProps = {
  animation: object;
} & Omit<LottieComponentProps, "animationData">;

export function LottiePlayer({ animation, ...props }: LottiePlayerProps) {
  return <Lottie animationData={animation} {...props} />;
}
