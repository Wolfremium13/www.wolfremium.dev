import React from "react";

export type SocialMediaButtonProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  classes?: string;
};

export const SocialMediaButton = ({
  href,
  icon,
  label,
  classes = "text-lightGreen hover:text-lightViolet",
}: SocialMediaButtonProps) => {
  return (
    <a href={href} className={classes} target="_blank" title={label}>
      {icon}
    </a>
  );
};
