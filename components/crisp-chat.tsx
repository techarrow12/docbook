"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("60fd96b2-9012-4e08-beeb-39ed5a937f43");
  }, []);

  return null;
};