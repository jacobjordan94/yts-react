import * as React from "react";
import * as Primitive from "./card";
import { cn } from "@/lib/utils";

const Base = (props: React.ComponentProps<"div"> & { asChild?: boolean }) => <Primitive.Card {...props} className={cn("border-0", props.className)} />;
const Header = (props: React.ComponentProps<"div"> & { asChild?: boolean }) => <Primitive.CardHeader {...props} />;
const Title = (props: React.ComponentProps<"div"> & { asChild?: boolean }) => <Primitive.CardTitle {...props} className={cn("text-3xl", props.className)} />;
const Description = (props: React.ComponentProps<"div"> & { asChild?: boolean }) => <Primitive.CardDescription {...props} />;
const Action = (props: React.ComponentProps<"div"> & { asChild?: boolean }) => <Primitive.CardAction {...props} />;
const Content = (props: React.ComponentProps<"div"> & { asChild?: boolean }) => <Primitive.CardContent {...props} />;
const Footer = (props: React.ComponentProps<"div"> & { asChild?: boolean }) => <Primitive.CardFooter {...props} />;

export default { Base, Header, Title, Description, Action, Content, Footer };