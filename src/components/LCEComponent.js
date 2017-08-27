// @flow

import * as React from 'react';

//LCE: Loading-Content-Error
const LCEComponent = ({
  loading,
  data,
  error,
  LoadingComponent,
  EmptyComponent,
  ErrorComponent,
  children
}: {
  loading: boolean,
  data: any,
  error: any,
  LoadingComponent: React.Element<any>,
  EmptyComponent: React.Element<any>,
  ErrorComponent: React.Element<any>,
  children: React.Node
}) => {
  if (error) {
    return ErrorComponent;
  }

  if (loading) {
    return LoadingComponent;
  }

  if (data && (!(data instanceof Array) || data.length > 0)) {
    return children;
  } else {
    return EmptyComponent;
  }
};

export default LCEComponent;
