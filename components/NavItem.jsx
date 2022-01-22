import React from "react";
import { useRouter } from "next/router";

const NavItem = ({ item }) => {
  const router = useRouter();
  return <>{router.pathname === "/" ? item : ""}</>;
};

export default NavItem;

NavItem.propTypes = {
  item: propTypes.string,
};