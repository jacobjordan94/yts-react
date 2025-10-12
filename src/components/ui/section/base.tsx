import * as React from "react";
import * as Primitive from "../card";
import { cn } from "@/lib/utils";

export const Base = (props: React.ComponentProps<"div"> & { asChild?: boolean }) =>
  <Primitive.Card {...props} className={cn("border-0", props.className)} />;
