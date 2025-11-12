"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const ButtonActionsHome: React.FC<{ text?: string, pathRedirect: string }> = ({ text, pathRedirect }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(pathRedirect);
    };

    return (
        <Button
            variant="default"
            size="lg"
            onClick={handleClick}
        >
            {text}
        </Button>
    );
};

export default ButtonActionsHome;
