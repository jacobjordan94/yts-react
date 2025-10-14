import useLocalStorage from "@/hooks/use-local-storage";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const SiteDisclaimerDialog = () => {
    const [ visited, setVisited ] = useLocalStorage('visited', false);
    const [ declined, setDeclined ] = useState(false);

    if (declined) {
        return (
            <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
                <div className="text-center space-y-4 max-w-md px-6">
                    <h1 className="text-3xl font-bold">Goodbye!</h1>
                    <p className="text-muted-foreground">
                        Thank you for respecting the terms. You can safely close this tab.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Dialog open={!visited} modal>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Not so fast...</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        This website is a <strong>read-only mirror</strong> of publicly available data from YTS.mx.
                        It does not host, store, or distribute any copyrighted content.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        All movie information is fetched directly from the YTS public API. This project was created
                        solely for <strong>educational and portfolio purposes</strong> to showcase technical skills in
                        front-end development.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        The developer does not condone or encourage piracy. Please respect copyright laws in your jurisdiction.
                    </p>
                </div>
                <DialogFooter className="flex-col gap-2">
                    <Button className="flex-1" variant="destructive" onClick={() => setDeclined(true)}>
                        I do not agree
                    </Button>
                    <Button onClick={() => setVisited(true)}>
                        I understand and wish to continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SiteDisclaimerDialog;
