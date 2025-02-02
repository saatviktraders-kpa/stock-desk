import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { Outlet } from "react-router-dom";
import Dashboard from './layout/Dashboard';
import Home from './pages/Home'
const ProductList = lazy(() => import('./pages/product/List'));
const ProductDetail = lazy(() => import('./pages/product/Detail'));
import { Spin } from "antd";
const BillingList = lazy(() => import("./pages/billing/List"));
const BillingCreate = lazy(() => import("./pages/billing/Create"));
const BillingUpdate = lazy(() => import("./pages/billing/Update"));
const BillingDetail = lazy(() => import("./pages/billing/Detail"));

function RouteController() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path='product' element={<Suspense fallback={<Spin />}><Outlet /></Suspense>}>
          <Route index element={<ProductList />} />
          <Route path=':_id' element={<ProductDetail />} />
        </Route>
        <Route path='billing' element={<Suspense fallback={<Spin />}><Outlet /></Suspense>}>
          <Route index element={<BillingList />} />
          <Route path='create' element={<BillingCreate />} />
          <Route path=':id' element={<BillingDetail />} />
          <Route path='update/:id' element={<BillingUpdate />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default RouteController;