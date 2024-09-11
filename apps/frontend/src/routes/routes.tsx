// routes.js
import React from 'react';
import { BrowserRouter as Router, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Signup from '../pages/auth/signup-page';
import Login from '../pages/auth/login-page';
import GithubTokenInput from '../pages/auth/insert-token';
import Dashboard from '../pages/home-page';

const Routes: React.FC = () =>
{
  return (
    <Router>
      <RouterRoutes>
        <Route path="auth">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="InsertToken" element={<PrivateRoute><GithubTokenInput /></PrivateRoute>} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="auth/login" />} />
      </RouterRoutes>
    </Router>
  );
};

export default Routes;
