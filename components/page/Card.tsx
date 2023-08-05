const Card = ({ children }: { children: React.ReactNode }) => {
  return <section className="m-0 md:m-8 bg-gray-900/70 p-4 md:p-8 rounded-xl">{children}</section>;
};
export { Card };
