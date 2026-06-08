"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Início" },
  { href: "/task-3/grupos", label: "Grupos" },
  { href: "/task-3/avaliacoes", label: "Avaliações" },
  { href: "/login", label: "TASK 1" },
  { href: "/cursos", label: "TASK 2" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="nav-bar">
      <strong>SGPI</strong>
      <ul>
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link href={link.href} className={active ? "active" : ""}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
