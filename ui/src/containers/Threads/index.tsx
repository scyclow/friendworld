import React, { Component } from 'react';

type Props = {
  id: string | void
}

const Thread: React.SFC<Props> = ({ id }) => <div>this is thread: {id}</div>

export default Thread
