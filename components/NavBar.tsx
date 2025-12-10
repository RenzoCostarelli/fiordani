"use client";
import { SITE_URL } from "@/lib/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import LogoSvg from "./Logo";
import LogoText from "./LogoText";
import Link from "next/link";
import { X } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Cotizaciones", href: "/cotizaciones" },
  { label: "Servicios", href: `${SITE_URL}/#servicios` },
  { label: "Productos", href: `${SITE_URL}/#productos` },
  { label: "Distribuidores", href: `${SITE_URL}/#distribuidores` },
  { label: "Contacto", href: "/contacto" },
];

export default function NavBar() {
  const navRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // const navTl = gsap.timeline({ paused: true }).to(navRef.current, {
      //   backgroundColor: "rgba(1, 92, 80, 0.5)",
      //   duration: 0.4,
      //   ease: "power2.inOut",
      // });

      // ScrollTrigger.create({
      //   start: "top -50%",
      //   end: "top -40%",
      //   animation: navTl,
      //   scrub: true,
      //   // markers: true,
      // });
      const showNav = gsap
        .from(navRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: "power2.inOut",
          paused: true,
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top -50%",
        end: "max",
        // markers: true,
        onUpdate: (self) => {
          if (self.direction === -1) {
            showNav.play();
          } else {
            showNav.reverse();
          }
        },
      });
    }, navRef);

    return () => {
      ctx.kill();
    };
  }, []);
  return (
    <div
      className="fixed w-full top-0 bg-[#015c50]/50 backdrop-blur-sm py-3 z-50 "
      ref={navRef}
    >
      <div className="flex justify-between container mx-auto items-center px-0">
        {/* Logo */}
        <div className="relative flex items-center gap-2">
          <div className="w-10">
            <LogoSvg />
          </div>
          <div className="text-white w-40">
            <LogoText />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex border border-white rounded-full px-1 py-1 gap-1">
          {MENU_ITEMS.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white text-sm px-2 pt-1.5 pb-1 rounded-full hover:bg-white hover:text-emerald-600 transition-colors font-bold uppercase leading-none"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex text-white font-bold items-center gap-8">
          <button
            role="button"
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex text-xs items-center gap-2"
          >
            <span>INGRESO CLIENTES</span>
            <div className="border-2 rounded-full aspect-square flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="w-5 h-5"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <circle cx="8" cy="6" r="3.25" />
                  <path d="m2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5" />
                </g>
              </svg>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <Link
              href="https://www.instagram.com/fiordanirenzicereales"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                />
              </svg>
            </Link>
            <Link
              href="https://web.whatsapp.com/send?phone=543465666129&text=Hola!,%20Tengo%20una%20consulta%20sobre..."
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 w-full bg-[#015c50] backdrop-blur-sm transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {/* Mobile Menu Items */}
          <div className="flex flex-col gap-2">
            {MENU_ITEMS.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-base px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-bold uppercase border border-white/20"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile User Section */}
          <div className="border-t border-white/20 pt-4 mt-2">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 text-white text-sm py-3 px-4 rounded-lg border border-white/20 hover:bg-white/10 transition-colors w-full"
            >
              <span>INGRESO CLIENTES</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="w-5 h-5"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <circle cx="8" cy="6" r="3.25" />
                  <path d="m2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5" />
                </g>
              </svg>
            </button>
          </div>

          {/* Mobile Social Icons */}
          <div className="flex items-center justify-center gap-6 pb-2">
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed w-full h-screen inset-0 place-content-center bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-max flex flex-col p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-bold text-gray-800">
                Ingreso Clientes
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                aria-label="Close modal"
              >
                <X />
              </button>
            </div>

            {/* Modal Content - Iframe */}
            <div className="overflow-hidden">
              <iframe
                src="https://extranetaco.svrweb4.com.ar/Login?codEmpresa=72"
                className="w-full h-full border-0"
                title="Cliente Login"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
