import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, type ReactNode } from 'react';

export default function InlineDropDown({ name, children }: { name: ReactNode, children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <div className="inlineDropDown">
        <span onClick={handleClick}><FontAwesomeIcon icon={open ? "caret-down" : "caret-right"} /> {name}</span>
        {open ? children : null}
      </div>
    </>
  );
}