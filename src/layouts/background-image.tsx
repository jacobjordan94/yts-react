import { PageBackground } from "@/components/layout/page-background";
import { useState } from "react";
import { Outlet } from "react-router";

interface BackgroundConfig {
    image?: string | undefined;
    darkness?: number | undefined;
    blur?: number | undefined;
};

export default function BackgroundImageLayout({}) {
    const [ backgroundConfig, setBackgroundConfig ] = useState<BackgroundConfig>({});
    return ( 
        <PageBackground { ...backgroundConfig }>
            <div className="max-w-6xl px-6 m-auto">
                <Outlet context={{ setBackgroundConfig }} />
            </div>
        </PageBackground>
    );


}
export type BackgroundImageLayoutContext = {
    setBackgroundConfig: (config: Partial<BackgroundConfig>) => void;
};