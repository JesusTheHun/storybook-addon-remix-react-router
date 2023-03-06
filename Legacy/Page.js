import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './Header';
import './page.css';
import {Route, Routes, useLocation, useParams, Outlet} from 'react-router-dom';

const ShowParams = ({ showParams }) => {
    const params = useParams();
    const show = {};

    Object.keys(params).forEach(param => {
        if (showParams.includes(param)) show[param] = params[param];
    });

    return (
        <section>
            <h3>Dynamic subpath</h3>
            <pre>
            {JSON.stringify(show)}
            </pre>
        </section>
    );
};

export const Page = ({ user, onLogin, onLogout, onCreateAccount }) => {
  const location = useLocation();

  return (
      <article>
        <Header user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />

        <section>
          <h2>Nested routing in Storybook</h2>

          <p>Current location : {location.pathname}</p>

          <Routes>
            <Route path={'staticsubpath'} element={'foo'} />
            <Route path={':dynamicsubpath'} element={<ShowParams showParams={['dynamicsubpath']}/>} />
          </Routes>

          <Outlet />
        </section>
      </article>
  )
};
Page.propTypes = {
  user: PropTypes.shape({}),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};

Page.defaultProps = {
  user: null,
};
