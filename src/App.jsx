import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import ProtectRoute from "components/routes/ProtectRoute";
import api_service from "./api/api_service";

import SignIn from "views/auth/SignIn";
import Dashboard from "views/admin/default";
import Lessons from "views/admin/lesson";
import Stagges from "views/admin/stagges";
import Quizzes from "views/admin/quizzes";
import Questions from "views/admin/questions";
import Category from "views/admin/category";
import Users from "views/admin/users";
import CreateLesson from "views/admin/lesson/create";

const App = () => {
  const authme = async () => {
    try {
      const res = await api_service.get("/admin/auth");
      localStorage.setItem("token", res.token);
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      authme();
    }
  }, []);
  return (
    <Routes>
      <Route
        path="auth/sign-in"
        element={<AuthLayout children={<SignIn />} />}
      />
      <Route path="admin">
        <Route
          path="dashboard"
          element={
            <ProtectRoute
              children={
                <AdminLayout current="Dashboard" children={<Dashboard />} />
              }
            />
          }
        />
        <Route
          path="lesson"
          element={
            <ProtectRoute
              children={
                <AdminLayout current="Lessons" children={<Lessons />} />
              }
            />
          }
        />
        <Route
          path="/admin/lesson/create"
          element={
            <ProtectRoute
              children={
                <AdminLayout
                  current="Lesson / Create"
                  children={<CreateLesson />}
                />
              }
            />
          }
        />
        <Route
          path="stagges"
          element={
            <ProtectRoute
              children={
                <AdminLayout current="Stagges" children={<Stagges />} />
              }
            />
          }
        />
        <Route
          path="quizzes"
          element={
            <ProtectRoute
              children={
                <AdminLayout current="Quizzes" children={<Quizzes />} />
              }
            />
          }
        />
        <Route
          path="questions"
          element={
            <ProtectRoute
              children={
                <AdminLayout current="Questions" children={<Questions />} />
              }
            />
          }
        />
        <Route
          path="category"
          element={
            <ProtectRoute
              children={
                <AdminLayout current="Category" children={<Category />} />
              }
            />
          }
        />
        <Route
          path="users"
          element={
            <ProtectRoute
              children={<AdminLayout current="Users" children={<Users />} />}
            />
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default App;
