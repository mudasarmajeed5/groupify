import { ThemeSwitcher } from "./theme-switcher";
import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
            <p>
                Powered by{" "}
                <a
                    href="https://github.com/mudasarmajeed5"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    Mudassar Majeed
                </a>
            </p>
            <ThemeSwitcher />
        </footer>
    )
}

export default Footer