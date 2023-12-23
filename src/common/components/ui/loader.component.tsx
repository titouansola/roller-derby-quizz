import React from 'react';
import { UpdateIcon } from '@radix-ui/react-icons';

export function Loader() {
  return <UpdateIcon className="animate-spin" />;
}

export function LoadableLabel(props: {
  loadingState: boolean;
  idle: React.ReactNode;
}) {
  if (props.loadingState) {
    return <Loader />;
  }
  return props.idle;
}
