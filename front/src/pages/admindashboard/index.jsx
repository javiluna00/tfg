import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock2 from "./components/image-block-2";
import GroupChart2 from "./components/group-chart-2";
// import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
// import ProfitChart from "../../components/partials/widget/chart/profit-chart";
// import OrderChart from "../../components/partials/widget/chart/order-chart";
// import EarningChart from "../../components/partials/widget/chart/earning-chart";
// import SelectMonth from "@/components/partials/SelectMonth";
// import Customer from "../../components/partials/widget/customer";
// import RecentOrderTable from "../../components/partials/Table/recentOrder-table";
// import BasicArea from "../chart/appex-chart/BasicArea";
// import VisitorRadar from "../../components/partials/widget/chart/visitor-radar";
// import MostSales2 from "../../components/partials/widget/most-sales2";
// import Products from "../../components/partials/widget/products";
import Button from "@/components/ui/Button";
import { Link, Navigate } from "react-router-dom";


const Admindashboard = () => {
  const [filterMap, setFilterMap] = useState("usa");


  return (
    <div className="bg-slate-50 p-10 min-h-screen">

      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-10">
        Panel de administrador
      </h4>

      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock2 />
        </div>
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <GroupChart2 />
          </div>
        </div>
      </div>

      <Card title="Acciones" className="w-full">
        <div className="grid md:grid-cols-5 grid-cols-1 gap-5 mb-5">
          <Link to="/dashboard/beats"><Button className="h-16 w-full bg-red-500 text-white flex items-center" color="light" icon="heroicons:arrow-left-20-solid">Beats</Button></Link>
          <Link to="/dashboard/mixmaster"><Button className="h-16 w-full bg-red-500 text-white flex items-center" color="light" icon="heroicons:arrow-left-20-solid">Mix & Master</Button></Link>
          <Link to="/dashboard/projects"><Button className="h-16 w-full bg-red-500 text-white flex items-center" color="light" icon="heroicons:arrow-left-20-solid">Proyectos</Button></Link>
          <Link to="/dashboard/contacts"><Button className="h-16 w-full bg-red-500 text-white flex items-center" color="light" icon="heroicons:arrow-left-20-solid">Contacto</Button></Link>
          <Link to="/dashboard/users"><Button className="h-16 w-full bg-red-500 text-white flex items-center" color="light" icon="heroicons:arrow-left-20-solid">Usuarios</Button></Link>
        </div>
      </Card>
      <div className="grid grid-cols-12 gap-5">

        {/* <div className="2xl:col-span-8 lg:col-span-7 col-span-12">
          <Card title="Ingresos">
            <div className="legend-ring">
              <RevenueBarChart height={420} />
            </div>
          </Card>
        </div>

        <div className="2xl:col-span-4 lg:col-span-5 col-span-12">
          <Card title="Statistic" headerslot={<SelectMonth />}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <OrderChart />
              <ProfitChart />
              <div className="md:col-span-2">
                <EarningChart />
              </div>
            </div>
          </Card>
        </div> */}

        {/* <div className="xl:col-span-6 col-span-12">
          <Card title="Customer" headerslot={<SelectMonth />}>
            <Customer />
          </Card>
        </div>

        <div className="xl:col-span-6 col-span-12">
          <Card title="Recent Orders" headerslot={<SelectMonth />} noborder>
            <RecentOrderTable />
          </Card>
        </div>
        
        <div className="xl:col-span-8 lg:col-span-7 col-span-12">
          <Card title="Visitors Report" headerslot={<SelectMonth />}>
            <BasicArea />
          </Card>
        </div>
        <div className="xl:col-span-4 lg:col-span-5 col-span-12">
          <Card title="Visitors By Gender" headerslot={<SelectMonth />}>
            <VisitorRadar />
          </Card>
        </div>
        <div className="xl:col-span-6 col-span-12">
          <Card
            title="Most Sales"
            headerslot={
              <div className="border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded p-1 flex items-center">
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 transition-all duration-150 rounded cursor-pointer
                ${
                  filterMap === "global"
                    ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                    : "dark:text-slate-300"
                }  
                `}
                  onClick={() => setFilterMap("global")}
                >
                  Global
                </span>
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 rounded transition-all duration-150 cursor-pointer
                  ${
                    filterMap === "usa"
                      ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                      : "dark:text-slate-300"
                  }
              `}
                  onClick={() => setFilterMap("usa")}
                >
                  USA
                </span>
              </div>
            }
          >
            <MostSales2 filterMap={filterMap} />
          </Card>
        </div>
        <div className="xl:col-span-6 col-span-12">
          <Card title="Best selling products" headerslot={<SelectMonth />}>
            <Products />
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default Admindashboard;
