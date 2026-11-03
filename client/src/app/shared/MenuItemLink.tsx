import { MenuItem } from "@mui/material";
import { NavLink } from "react-router";

export default function MenuItemLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      sx={{
        fontSize: "1.2rem",
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "inherit",
        "&.active": {
          color: "yellow",
        },
      }}
    >
      {children}
    </MenuItem>
  );
}
