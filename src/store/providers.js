import React from 'react';
import { ProvideAuth } from './auth-provider';
import { ProvideRecommends } from './recommend-provider';
import { ProvideUsers } from './user-provider';
import { ProvideIdeas } from './idea-provider';

function Providers({ children }) {
  return (
    <ProvideAuth>
      <ProvideRecommends>
        <ProvideUsers>
          <ProvideIdeas>{children}</ProvideIdeas>
        </ProvideUsers>
      </ProvideRecommends>
    </ProvideAuth>
  );
}

export default Providers;
