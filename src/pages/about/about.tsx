import { Button } from "@/components/ui/button";
import { AlertCircleIcon, ExternalLink, Github, Home } from "lucide-react";
import { Link } from "react-router";
import Seo from "@/components/seo";

const AboutPage = () => {
    return (
        <>
            <Seo
                title="About - YTS Movie Browser"
                description="Learn about YTS Movie Browser - a portfolio project showcasing modern web development with React, TypeScript, and Tailwind CSS."
                pathname="/about"
            />
            <main className="container max-w-4xl mx-auto px-6 py-12 space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">About This Project</h1>
                    <p className="text-xl text-muted-foreground">
                        A modern movie browsing interface built as a portfolio demonstration
                    </p>
                </div>

                <div className="space-y-6">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">What is this?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            This is a <strong>portfolio project</strong> that demonstrates modern web development
                            practices using React 19, TypeScript, and Tailwind CSS. It provides a clean, responsive
                            interface for browsing movie information from the YTS API.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-4">
                            <span><AlertCircleIcon /></span> 
                            <span>Important Disclaimer</span>
                        </h2>
                        <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-3">
                            <p className="text-muted-foreground leading-relaxed">
                                This website is a <strong>read-only mirror</strong> of publicly available data from YTS.mx.
                                It does not host, store, or distribute any copyrighted content or torrent files.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                All movie information, images, and metadata are fetched directly from the YTS public API.
                                This project was created solely for educational and portfolio purposes to showcase
                                technical skills in front-end development.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                The developer does not condone or encourage piracy. Please respect copyright laws
                                in your jurisdiction.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Technical Stack</h2>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>React 19</strong> with React Compiler for automatic optimizations</li>
                            <li><strong>TypeScript 5.9</strong> for type safety</li>
                            <li><strong>Vite 7</strong> for fast builds and development</li>
                            <li><strong>Tailwind CSS 4</strong> for styling</li>
                            <li><strong>Radix UI</strong> for accessible component primitives</li>
                            <li><strong>React Router 7</strong> for client-side routing</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Links</h2>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://yts.mx"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline">
                                    <ExternalLink />
                                    Visit YTS.mx
                                </Button>
                            </a>
                            <a
                                href="https://github.com/jacobjordan94/yts-react"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline">
                                    <Github />
                                    View Source Code
                                </Button>
                            </a>
                            <Link to="/">
                                <Button variant="outline">
                                    <Home />
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Developer</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Built by <strong>Jacob Jordan</strong> as a demonstration of modern React development
                            and UI/UX design skills.
                        </p>
                        <a
                            href="https://jacob-jordan.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                            jacob-jordan.me
                            <ExternalLink className="size-4" />
                        </a>
                    </section>
                </div>
            </main>
        </>
    );
};

export default AboutPage;
