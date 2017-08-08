import React from 'react';

const Loadable = ({
                    loading,
                    data,
                    LoadingComponent,
                    EmptyComponent,
                    children
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