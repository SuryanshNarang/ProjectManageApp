"use client";
import React, { Children } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
import { useEffect } from "react";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // adding global states used UseAppselector and we will dispatch them in Navbar file using useAppDispatch
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* sidebar */}
      <Sidebar />
      {/* main is the right side containing navbar and content all the content will be in the children we gave flex-col so that content is vertical on right side */}
      <main
        // when sidebar is collapsed we dont want any padding
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSidebarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

// Making second component here: instead of using it under DashboardLayout we will do that we want to access globalState in the DashboardLayout::
//But now with this dashboard wrapper we are able to look at layout we have our store basically connected to Dashboard Wrapper
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // we are connecting our redux state setup with our application: so now our entire application has access to redux store.
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
// Step 2: use this component under layout.tsx so that it applies to every single page on nextjs
// 3: passed childern in the dashboardWrapper in layout.tsx
// ----------------------------------------------REASON OF MAKING DASHBOARDWRAPPER=-------------------------------------------------------------------------------
// If StoreProvider is inside DashboardLayout, every time the layout component is mounted or re-rendered,
//  React might give the impression of "recreating" the provider, which is unnecessary for static layouts.

// // const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <StoreProvider> {/* StoreProvider is embedded here */}
//       <div>
//         <Sidebar />
//         <main>{children}</main>
//       </div>
//     </StoreProvider>
//   );
// };
// You use DashboardLayout twice in different parts of your app:
// function App() {
//   return (
//     <>
//       <DashboardLayout>
//         <Page1 />
//       </DashboardLayout>
//       <DashboardLayout>
//         <Page2 />
//       </DashboardLayout>
//     </>
//   );
// }
// ere, you’re unintentionally creating two separate StoreProvider instances, which could mean:

// Multiple Redux stores are created.
// State is no longer global because each layout instance is scoped to its own store.
// If you want to use DashboardLayout for a page like AboutPage that doesn’t need Redux:

// tsx
// Copy code
// function AboutPage() {
//   return (
//     <DashboardLayout>
//       <h1>About Us</h1>
//     </DashboardLayout>
//   );
// }
// MAIN POINT::::::: THE ROOT OF THE LAYOUT EXISTS OVER in the layout.tsx so we had to use as there is no way of controling the root : useclient
