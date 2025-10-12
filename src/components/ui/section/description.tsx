import * as React from "react";
import * as Primitive from "../card";

export const Description = (props: React.ComponentProps<"div"> & { asChild?: boolean }) =>
  <Primitive.CardDescription {...props} />;
