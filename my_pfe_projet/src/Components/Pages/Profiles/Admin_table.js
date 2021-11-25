import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./AdminDashboard/home/home";
import Membres from "./AdminDashboard/Membres";
import Instituts from "./AdminDashboard/Instituts";
import Articles from "./AdminDashboard/Articles";
import Actualités from "./AdminDashboard/Actualités";
import Visioconférence from "./AdminDashboard/Visio/Visioconférence";
import VideoCall from "./AdminDashboard/Visio/videoCall";
import Questions from "./AdminDashboard/Questions";
import Sidebar from "./Sidebar";
import Agenda from "../Agenda/Agenda"
import ListeForum from "../Forum/listeForum"

function Admin_table() {
  return (
    <>
      <Sidebar />

      <div id="page-content-wrapper">
        <div class="container-fluid xyz">
          <Switch>
            <Route path="/Admin_table" exact component={Home} />
            <Route path="/Admin_table/membres" component={Membres} />
            <Route path="/Admin_table/Instituts" component={Instituts} />
            <Route path="/Admin_table/Articles" component={Articles} />
            <Route path="/Admin_table/Actualités" component={Actualités} />
            <Route path="/Admin_table/Visioconférence" exact component={Visioconférence} />
            <Route path="/Admin_table/Questions" component={Questions} />
            <Route path="/Admin_table/Agenda" component={Agenda} />
            <Route path="/Admin_table/ListeForum" component={ListeForum} />


          </Switch>
        </div>
      </div>
    </>
  );
}

export default Admin_table;
