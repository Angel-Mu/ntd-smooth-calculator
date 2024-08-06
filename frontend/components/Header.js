import React, { useEffect, useState } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useRouter } from 'next/router'
import request from '../utils/request'
import { apiUrl } from '../config';

const Header = ({ currentBalance }) => {
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(authUser);
  }, [authUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  const logout = async () => {
    const url = `${apiUrl}/logout`;
    await request(url, { method: 'POST', headers: { 'Authorization': authHeader } });
    await signOut();
    router.push('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Calculator</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">{currentUser.username} - ${currentBalance || '0.0'}</a>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header;
