import React from 'react';
import { ProvideAuth } from './auth-provider';
import { ProvideRecommends } from './recommend-provider';
import { ProvideUsers } from './user-provider';

function Providers({ children }) {
  return (
    <ProvideAuth>
      <ProvideRecommends>
        <ProvideUsers>{children}</ProvideUsers>
      </ProvideRecommends>
    </ProvideAuth>
  );
}

export default Providers;
