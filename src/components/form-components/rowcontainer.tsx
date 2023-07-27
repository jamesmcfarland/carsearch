import type { ReactNode } from "react";

const RowContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-start items-center gap-4">{children}</div>
  );
};

export default RowContainer;
