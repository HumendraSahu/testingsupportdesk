import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

const SubMenu = ({ label, icon, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li className="nav-item" onClick={() => setOpen(!open)}>
        <span className="nav-link d-flex align-items-center" role="button">
          <i className={`bi bi-${icon} me-2`}></i>
          <span>{label}</span>
          <i className={`bi bi-chevron-${open ? 'up' : 'down'} ms-auto`}></i>
        </span>
      </li>
      <Collapse in={open}>
        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-4">
          {children}
        </ul>
      </Collapse>
    </>
  );
};

export default SubMenu;
