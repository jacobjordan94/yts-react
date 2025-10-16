import { Button } from '@/components/ui/button';
import { Film, Home } from 'lucide-react';
import { Link } from 'react-router';
import Seo from '@/components/seo';
import { Page } from '../page';
import { useBackgroundConfig } from '@/contexts/background-config-context';
import { useEffect } from 'react';

const NotFoundPage = () => {
    const { setBackgroundConfig } = useBackgroundConfig();
    useEffect(() => {
        setBackgroundConfig({ image: './kenobi.webp', blur: 20 });
    }, [setBackgroundConfig]);

    return (
        <>
            <Seo
                title="404 - Page Not Found | YTS Movie Browser"
                description="The page you're looking for doesn't exist or has been moved."
            />
            <Page
                layout="centered"
                spacing="none"
                pageName="not-found"
                className="flex-col text-center space-y-6"
            >
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
            </Page>
        </>
    );
};

export default NotFoundPage;
