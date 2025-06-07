import React from "react";
import { Heading1, Paragraph1 } from "@/app/components/Text";

export default function Footer() {
  return (
    <footer className="bg-foreground p-2 sm:p-0">
      <Heading1 className="text-center">Attah Gbubemi David (08120989558)</Heading1>
      <Paragraph1 className="text-center">
        © {new Date().getFullYear()} Nigerian Correctional Service. All rights
        reserved.
      </Paragraph1>
    </footer>
  );
}
