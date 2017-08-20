// @flow

import * as React from 'react';

const Loadable = ({
  loading,
  data,
  LoadingComponent,
  EmptyComponent,
  children
}: {
  loading: boolean,
  data: any,
  LoadingComponent: React.Element<any>,
  EmptyComponent: React.Element<any>,
  children: React.Node
}) => {
  if (loading) {
    return LoadingComponent;
  } else {
    if (data && (!(data instanceof Array) || data.length > 0)) {
      return children;
    } else {
      return EmptyComponent;
    }
  }
};

export default Loadable;
