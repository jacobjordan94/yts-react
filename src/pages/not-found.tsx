import { Button } from "@/components/ui/button";
import { Film, Home } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <main className="flex flex-col items-center justify-center h-full text-center px-6 space-y-6">
            <div className="space-y-2">
                <Film className="size-24 mx-auto text-muted-foreground/50" />
                <h1 className="text-6xl font-bold">404</h1>
                <h2 className="text-2xl font-semibold">Page Not Found</h2>
                <p className="text-muted-foreground max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                </p>
            </div>
            <Link to="/">
                <Button size="lg">
                    <Home />
                    Back to Home
                </Button>
            </Link>
        </main>
    );
};

export default NotFoundPage;
