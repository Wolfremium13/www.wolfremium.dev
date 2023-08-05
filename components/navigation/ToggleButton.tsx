import { Dispatch, SetStateAction } from "react";
import { GiAbstract062, GiSplitCross } from "react-icons/gi";

type ToggleButtonProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ setIsOpen, isOpen }) => {
  return (
    <button
      aria-expanded="false"
      type="button"
      onClick={() => setIsOpen((prevState) => !prevState)}
      data-testid="navbar-toggle-button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-lightGreen hover:text-lightViolet rounded-lg md:hidden"
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? <GiSplitCross size={30} /> : <GiAbstract062 size={30} />}
    </button>
  );
};

export { ToggleButton };
