import * as React from 'react';
import { Connect, UrqlProps, query } from 'urql'


const threadQuery = query(`
  threads: threadsList(
    orderBy: [CREATED_AT_DESC]
  ) {
    id
    title
  }
`)

const Forum: React.SFC<{}> = () => (
  <div></div>
)

export default Forum
