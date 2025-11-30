import Link from "next/link";
import LogoSvg from "./Logo";
import FacebookIcon from "./ui/FacebookIcon";
import InstagramIcon from "./ui/InstagramIcon";
import WhatsappIcon from "./ui/WhatsappIcon";
import YoutubeIcon from "./ui/YoutubeIcon";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#41614b] py-8 w-full">
      <div className="flex justify-between w-[1200px] mx-auto items-center">
        <div className="flex items-center justify-between gap-6 ">
          <div className="relative w-12">
            <LogoSvg />
          </div>
          <div className="flex flex-col gap-2 text-white">
            <div className="flex items-center font-light gap-5">
              <p>info@fiordanirenzi.com.ar</p>
              <div className="flex items-center gap-2">
                <Link
                  href="https://web.whatsapp.com/send?phone=543465666129&text=Hola!,%20Tengo%20una%20consulta%20sobre..."
                  className="w-6 h-6"
                >
                  <WhatsappIcon />
                </Link>
                <Link
                  href="https://www.instagram.com/fiordanirenzicereales"
                  target="_blank"
                  className="w-6 h-6"
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="https://www.youtube.com/results?search_query=fiordani+renzi+cereales"
                  target="_blank"
                  className="w-6 h-6"
                >
                  <YoutubeIcon />
                </Link>
                <Link
                  href="https://www.facebook.com/fiordanirenzicerealessa"
                  target="_blank"
                  className="w-6 h-6"
                >
                  <FacebookIcon />
                </Link>
              </div>
            </div>
            <div>
              <p className="font-light text-sm">
                COPYRIGHT 2025 / TODOS LOS DERECHOS RESERVADOS
              </p>
            </div>
          </div>
        </div>
        <div className="w-74">
          <Image
            src={"/ampersand_logo.svg"}
            alt="Ampersand Group Logo"
            width={600}
            height={100}
            className="w-full h-auto"
          />
        </div>
      </div>
    </footer>
  );
}
