import FullScreenLoader from '@/core/components/FullScreenLoader';
import { Suspense } from 'react';

export const Loadable =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };
