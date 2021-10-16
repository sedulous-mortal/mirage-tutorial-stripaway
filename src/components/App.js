import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Banners from "./Banners";
import { Link } from "./UI";

export default function App() {
  let location = useLocation();
  let aboutIsActive = location.pathname.match("/about");
  let bannersIsActive = !aboutIsActive;

  return (
    <div className="pt-12">
      <main className="mt-10">
        <Banners />
      </main>
    </div>
  );
}
