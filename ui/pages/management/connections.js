import React from 'react';
import { NoSsr } from '@mui/material';
import { connect } from 'react-redux';
import Head from 'next/head';
import MesheryConnections from '../../components/connections';
import { Box } from '@mui/material';

class Connections extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <NoSsr>
        <Head>
          <title>Connections | Meshery</title>
        </Head>
        <Box sx={{ maxWidth: '90%', margin: 'auto', overflow: 'hidden' }}>
          <MesheryConnections />
        </Box>
      </NoSsr>
    );
  }
}

export default connect(null)(Connections);
