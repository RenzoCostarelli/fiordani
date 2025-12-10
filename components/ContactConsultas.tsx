"use client";
import {
  ContactoEmailsSliceDefaultPrimaryEmailItem,
  Simplify,
} from "@/prismicio-types";
import { GroupField } from "@prismicio/client";

export default function ContactConsultas({
  emails,
}: {
  emails: GroupField<Simplify<ContactoEmailsSliceDefaultPrimaryEmailItem>>;
}) {
  const groupEmailByAreas = () => {
    return emails.reduce<Record<string, string[]>>(
      (acc, { area, email_direction }) => {
        if (!area || !email_direction) return acc;

        (acc[area] ||= []).push(String(email_direction));

        return acc;
      },
      {}
    );
  };

  const groupedEmails = groupEmailByAreas();

  return (
    <section className="bg-[#f2f1ee] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif mb-8">Consultas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left side - Consultas */}
          <div className="text-[#49614e]">
            <div className="space-y-6">
              {Object.entries(groupedEmails)
                .slice(0, 3)
                .map(([area, emails]) => (
                  <div key={area}>
                    <h3 className="uppercase mb-2">{area}</h3>
                    <ul className="space-y-1 text-sm">
                      {emails.map((email) => (
                        <li key={email}>{email}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>

          {/* Right side - More sections */}
          <div className="text-[#49614e]">
            <div className="space-y-6 mt-16 md:mt-0">
              {Object.entries(groupedEmails)
                .slice(3, 9)
                .map(([area, emails]) => (
                  <div key={area}>
                    <h3 className="uppercase mb-2">{area}</h3>
                    <ul className="space-y-1 text-sm">
                      {emails.map((email) => (
                        <li key={email}>{email}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-serif mb-8 text-[#49614e]">
              Cómo llegar?
            </h2>

            <div className="grid grid-cols-1 gap-12">
              {/* Left side - Locations */}
              <div className="text-[#49614e] space-y-8">
                <div>
                  <h3 className="font-bold uppercase mb-2">ADMINISTRACIÓN</h3>
                  <p className="text-sm">Gödeken, Calle 11 Nº598, Santa Fe</p>
                </div>

                <div>
                  <h3 className="font-bold uppercase mb-2">PLANTA ACOPIO</h3>
                  <p className="text-sm">Gödeken, Calle 23 s/n °, Santa Fe</p>
                </div>

                <div>
                  <h3 className="font-bold uppercase mb-2">SUCURSAL</h3>
                  <p className="text-sm">
                    Los Quirquinchos, 25 de Mayo y Villeweeder, Santa Fe
                  </p>
                </div>
              </div>

              {/* Right side - Map placeholder */}
              <div className="w-full h-[200px] bg-[#49614e] rounded-lg relative">
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-serif">
                  <iframe
                    id="idmaps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5601.907081597465!2d-61.84964523849389!3d-33.39941094753097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c845784eaf9bf9%3A0x2cd382ae417793a9!2sFiordani+Renzi+Cereales+S.A!5e0!3m2!1ses!2sar!4v1562775156630!5m2!1ses!2sar"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="border-0"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
