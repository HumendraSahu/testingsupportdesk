import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
import SidebarItem from './SidebarItem';
import SubMenu from './SubMenu';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.auth.user);

  if (!user || (user.role !== 'admin' && user.role !== 'agent')) {
    return null;
  }

  const toggle = () => setShow(!show);

  return (
    <>
      <button className="btn btn-primary m-2" onClick={toggle}>
        <i className="bi bi-list"></i>
      </button>
      <Offcanvas show={show} onHide={toggle} backdrop={false} className="bg-light" placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <ul className="nav flex-column">
            <SidebarItem to="/dashboard" icon="speedometer2" label="Dashboard" onClick={toggle} />
            <SidebarItem to="/tickets" icon="ticket-perforated" label="Tickets" onClick={toggle} />
            <SubMenu label="User" icon="people">
              <SidebarItem to="/users/contacts" icon="person" label="Contacts" onClick={toggle} />
              <SidebarItem to="/users/companies" icon="building" label="Companies" onClick={toggle} />
            </SubMenu>
            <SidebarItem to="/solutions" icon="journal" label="Solutions" onClick={toggle} />
            <SidebarItem to="/forums" icon="chat" label="Forums" onClick={toggle} />
            <SidebarItem to="/analytics" icon="bar-chart" label="Analytics" onClick={toggle} />
            <SidebarItem to="/admin" icon="gear" label="Admin" onClick={toggle} />
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
