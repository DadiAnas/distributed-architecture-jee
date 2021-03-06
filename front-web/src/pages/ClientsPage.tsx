import React, { useEffect, useState } from "react";
import HomeLayoutComponent from "../components/Home/HomeLayoutComponent";
import "../components/css/ClientsPageStyle.css";
import ClientsTableComponent from "../components/clients/ClientsTableComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../redux/actions/models";
import PlusButton from "../components/svgs/PlusButton";
import ClientsCreateModalComponent from "../components/clients/ClientsCreateModalComponent";

function Clients() {
  const [visible, showModal] = useState(false);
  const dispatch = useDispatch();
  const comptes: any = useSelector((state: any) => state.models["comptes"]);
  useEffect(() => {
    dispatch(fetchAll("comptes"));
  }, []);

  return (
    <HomeLayoutComponent>
      <div className="site-card-wrapper">
        {Clients && <ClientsTableComponent comptes={comptes} />}
      </div>
      <div className="footer">
        <PlusButton showModal={() => showModal(!visible)} />
      </div>
      <ClientsCreateModalComponent visible={visible} showModal={showModal} />
    </HomeLayoutComponent>
  );
}

export default Clients;
