import * as React from "react";
import * as Primitive from "../card";
import { cn } from "@/lib/utils";

export const Title = (props: React.ComponentProps<"div"> & { asChild?: boolean }) =>
  <Primitive.CardTitle {...props} className={cn("text-3xl", props.className)} />;
