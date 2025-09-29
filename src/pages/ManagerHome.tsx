import React from "react";
import PendingRequests from "../manager/PendingRequests";
import ApprovedMissions from "../manager/ApprovedMissions";
import TotalSpend from "../manager/TotalSpend";
import MissionsInProgress from "../manager/MissionsInProgress";
import MissionPurpose from "../manager/chart/MissionPurpose";
import MissionsPerEmployee from "../manager/chart/MissionsPerEmployee";
import QuickLinks from "../manager/QuickLinks";
import RecentActivities from "../manager/RecentActivities";
import TeamMembers from "../manager/TeamMembers";
import ManagerSidebar from "../manager/ManagerSideBar";
import HeaderManager from "../manager/HeaderManager";

const ManagerHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E6EAF5] flex">
 <div className="flex flex-col mt-20 ml-75 mr-8">
      <HeaderManager/>
      <ManagerSidebar/>
      {/* Header Section */}
      <div className=" mx-auto py-2 mt-5 w-full px-6 bg-gradient-to-l from-accent-10 to-primaryColor-50 rounded-md shadow-sm">
        <h1 className="font-bold text-xl">
          Hello Manager, Here’s Mission Requests Overview
        </h1>
      </div>

      {/* Main Dashboard */}
      <main className=" mx-auto py-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PendingRequests />
          <ApprovedMissions />
          <MissionsInProgress />
          <TotalSpend />
        </div>

        {/* Charts + Team Section */}
        <div className="flex gap-6 max-sm:flex-col mt-8">
          {/* Left: Charts & Quick Links */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:w-[700px] lg:w-190 md:grid-cols-2 gap-6">
            <MissionPurpose />
            <MissionsPerEmployee />
            <QuickLinks />
            <RecentActivities />
          </div>

          {/* Right: Team Members */}
          <div className=" ">
            <TeamMembers />
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default ManagerHome;
