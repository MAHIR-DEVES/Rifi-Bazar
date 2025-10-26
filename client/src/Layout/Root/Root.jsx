import React from 'react';

import { Outlet } from 'react-router';

const Root = () => {
  return (
    <>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Root;
