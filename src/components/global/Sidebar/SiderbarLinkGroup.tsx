import { ReactNode, useState } from "react";

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition?: boolean;
}

const SidebarLinkGroup = ({
  children,
  activeCondition
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<any>(activeCondition || null);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
}

export default SidebarLinkGroup;