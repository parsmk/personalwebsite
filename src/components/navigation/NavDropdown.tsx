import { useState } from "react";
import { Hamburger } from "../svgs/Hamburger";
import { socialLinks } from "../../lib/links";

export const NavDropdown = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <div className="flex items-center h-full text-white sm:hidden">
      <Hamburger
        className="box-content size-7.5 px-3 shrink-0"
        onClick={() => setDropdown(!dropdown)}
      />
      <div
        className={`
          absolute top-full right-0 grid 
          ${dropdown ? "grid-rows-[1fr] outline-1 outline-accent/30" : "grid-rows-[0fr] outline-transparent"}
          bg-primary rounded-b-lg
          transition-all duration-300
        `}
      >
        <ul className="overflow-hidden min-h-0 divide-y-1 divide-accent/30">
          {Object.entries(socialLinks).map(([label, link]) => (
            <li className="w-full">
              <a
                className="w-full block p-3"
                href={link.href}
                target={link.target}
                onClick={() => setDropdown(!dropdown)}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
