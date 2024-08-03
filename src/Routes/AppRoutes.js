import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../Pages/Auth";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Post from "../Pages/Dashboard/Post/Post";
import ProtectedRoute from "../Utils/ProtectedRoute";
import Artist from "../Pages/Dashboard/Artist/Artist";
import Profile from "../Pages/Dashboard/Profile";
import Setting from "../Pages/Dashboard/Setting";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/dashboard/posts" element={<ProtectedRoute element={<Post />} />} />
            <Route path="/dashboard/artists" element={<ProtectedRoute element={<Artist />} />} />
            <Route path="/dashboard/settings" element={<ProtectedRoute element={<Setting />} />} />
            <Route path="/dashboard/profile" element={<ProtectedRoute element={<Profile />} />} />
        </Routes>
    );
}

export default AppRoutes;
