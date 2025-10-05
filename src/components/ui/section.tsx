import * as React from "react";
import * as Primitive from "./card";
import { cn } from "@/lib/utils";

const Base = (props: React.ComponentProps<"div">) => <Primitive.Card {...props} />;
const Header = (props: React.ComponentProps<"div">) => <Primitive.CardHeader {...props} />;
const Title = (props: React.ComponentProps<"div">) => <Primitive.CardTitle {...props} className={cn("text-3xl", props.className)} />;
const Description = (props: React.ComponentProps<"div">) => <Primitive.CardDescription {...props} />;
const Action = (props: React.ComponentProps<"div">) => <Primitive.CardAction {...props} />;
const Content = (props: React.ComponentProps<"div">) => <Primitive.CardContent {...props} />;
const Footer = (props: React.ComponentProps<"div">) => <Primitive.CardFooter {...props} />;

export default { Base, Header, Title, Description, Action, Content, Footer };