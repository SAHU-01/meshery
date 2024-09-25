import React, { useEffect } from 'react';
import { NoSsr } from '@mui/material';
import { styled } from '@mui/material/styles';
import MesheryFilters from '../../components/Filters';
import { updatepagepath } from '../../lib/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import { getPath } from '../../lib/path';
import { Box } from '@mui/material';

const StyledBox = styled(Box)(() => ({
  maxWidth: '90%',
  margin: 'auto',
  overflow: 'hidden',
}));

function NewFilters(props) {
  useEffect(() => {
    props.updatepagepath({ path: getPath() });
  }, [props]);

  return (
    <NoSsr>
      <Head>
        <title>Filters | Meshery</title>
      </Head>
      <StyledBox>
        <MesheryFilters />
      </StyledBox>
    </NoSsr>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updatepagepath: bindActionCreators(updatepagepath, dispatch),
});

const ConnectedNewFilters = connect(null, mapDispatchToProps)(NewFilters);

export default ConnectedNewFilters;
