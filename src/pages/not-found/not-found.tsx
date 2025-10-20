import { Button } from '@/components/ui/button';
import { Film, Home } from '@/components/icons/lucide';
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
                <div className="space-y-2 font-[Quicksand]">
                    <Film className="size-24 mx-auto text-muted-foreground/50" />
                    <h1 className="text-6xl font-bold">404</h1>
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-md font-[Inter]">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <Button asChild size="lg">
                    <Link to="/">
                        <Home />
                        Back to Home
                    </Link>
                </Button>
            </Page>
        </>
    );
};

export default NotFoundPage;
