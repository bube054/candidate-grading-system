import React from "react";
import { Heading1, Heading2 } from "@/app/components/Text";
import { Button } from "@/app/components/Button";
import { FaShieldAlt, FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-foreground p-2 sm:px-0">
      <div className="flex items-center justify-between sm:container sm:max-w-7xl sm:mx-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <FaShieldAlt color="#16A34A" size={30} className="hidden sm:inline"/>
          <div>
            <Heading1 className="mb-1 sm:mb-0">Nigerian Correctional Services</Heading1>
            <Heading2>Result management system</Heading2>
          </div>
        </div>
        <Button>
          <FaUser color="#fff" size={20} className="hidden sm:inline"/>
          <span className="">Admin Panel</span>
        </Button>
      </div>
    </nav>
  );
}
