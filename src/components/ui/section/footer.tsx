import * as React from "react";
import * as Primitive from "../card";

export const Footer = (props: React.ComponentProps<"div"> & { asChild?: boolean }) =>
  <Primitive.CardFooter {...props} />;
