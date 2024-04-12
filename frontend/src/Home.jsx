import React from "react";
import LineChat from "./LineChat";
import PieChart from "./PieChart";

function Home() {
  return (
    <div className="p-3 bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className=" col-12 col-sm-6 col-md-4 col-lg-3 p-3  bg-light">
            <div className="d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-currency-dollar fs-1 text-success"></i>
              <div>
                <span>Sales</span>
                <h2>234</h2>
              </div>
            </div>
          </div>
          <div className=" col-12 col-sm-6 col-md-4 col-lg-3 p-3  bg-light">
            <div className="d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-graph-up-arrow fs-1 text-primary"></i>
              <div>
                <span>Increase</span>
                <h2>24%</h2>
              </div>
            </div>
          </div>
          <div className=" col-12 col-sm-6 col-md-4 col-lg-3 p-3  bg-light">
            <div className="d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-truck fs-1 text-danger"></i>
              <div>
                <span>Delivery</span>
                <h2>240</h2>
              </div>
            </div>
          </div>
          <div className=" col-12 col-sm-6 col-md-4 col-lg-3 p-3  bg-light">
            <div className="d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-truck fs-1 text-warning"></i>
              <div>
                <span>Delivery</span>
                <h2>240</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 p-3">
            <LineChat />
          </div>
          <div className="col-12 col-md-4 p-3">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;