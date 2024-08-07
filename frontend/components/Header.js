import React, { useEffect, useState } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useRouter } from 'next/router'
import request from '../utils/request'
import { apiUrl } from '../config';

const Header = ({ currentBalance }) => {
  const signOut = useSignOut();
  const [authUser, setAuthUser] = useState({});
  const [authHeader, setAuthHeader] = useState('');
  const router = useRouter();

  useEffect(() => {
    setAuthUser(JSON.parse(localStorage.getItem('_authUser')));
    setAuthHeader(localStorage.getItem('_authHeader'));

    const isAuthenticated = !!localStorage.getItem('_authHeader');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  const logout = async () => {
    const url = `${apiUrl}/logout`;
    await request(url, { method: 'POST', headers: { 'Authorization': authHeader } });
    await signOut();
    localStorage.removeItem('_authUser');
    localStorage.removeItem('_authHeader');
    router.push('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/calculator">Calculator</a>
        <a className="nav-link" href="/transactions">My transactions</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">{authUser.username} - ${currentBalance || '0.0'}</a>
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
