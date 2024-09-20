import React from 'react';
// import { Button, Card, Grid, Typography, Box } from '@material-ui/core';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Delete, Edit } from '@mui/icons-material';

import { FlipCard } from '../General';
import { useGetEnvironmentConnectionsQuery } from '../../../rtk-query/environments';
// import classNames from 'classnames';
import CAN from '@/utils/can';
import { keys } from '@/utils/permission_constants';
// import { Checkbox, Button, Card, Grid, Typography, Box } from '@layer5/sistent';
import { Grid } from '@layer5/sistent';
import { UsesSistent } from '@/components/SistentWrapper';
import {
  PopupButton,
  TabCount,
  CardWrapper,
  TabTitle,
  Name,
  IconButton,
  EmptyDescription,
  DescriptionLabel,
  AllocationButton,
  BulkSelectCheckbox,
  CardTitle,
  DateLabel,
} from './styles';

export const formattoLongDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const TransferButton = ({ title, count, onAssign, disabled }) => {
  return (
    <UsesSistent>
      <PopupButton
        disabled={disabled}
        onClick={onAssign}
        sx={{
          color: '#3C494F',
          backgroundColor: '#ffffff',
          margin: '0px 0px 10px',
          padding: '20px 10px',
          '&:hover': {
            backgroundColor: '#ffffff',
            boxShadow: 'none',
          },
        }}
      >
        <Grid>
          <TabCount>{count}</TabCount>
          <TabTitle>{title}</TabTitle>
          <SyncAltIcon
            sx={{ position: 'absolute', top: '10px', right: '10px', color: '#607d8b' }}
          />
        </Grid>
      </PopupButton>
    </UsesSistent>
  );
};

/**
 * Renders a environment card component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.environmentDetails - The details of the environment.
 * @param {string} props.environmentDetails.name - The name of the environment.
 * @param {string} props.environmentDetails.description - The description of the environment.
 * @param {Function} props.onDelete - Function to delete the environment.
 * @param {Function} props.onEdit - Function to edit the environment.
 * @param {Function} props.onSelect - Function to select environment for bulk actions.
 * @param {Function} props.onAssignConnection - Function to open connection assignment modal open.
 * @param {Array} props.selectedEnvironments - Selected environments list for delete.
 * @param {String} props.classes - Styles property names for classes.
 *
 */

const EnvironmentCard = ({
  environmentDetails,
  selectedEnvironments,
  onDelete,
  onEdit,
  onSelect,
  onAssignConnection,
}) => {
  const { data: environmentConnections } = useGetEnvironmentConnectionsQuery(
    {
      environmentId: environmentDetails.id,
    },
    { skip: !environmentDetails.id },
  );
  const environmentConnectionsCount = environmentConnections?.total_count || 0;

  const deleted = environmentDetails.deleted_at.Valid;

  return (
    <FlipCard
      disableFlip={
        selectedEnvironments?.filter((id) => id == environmentDetails.id).length === 1
          ? true
          : false
      }
      frontComponents={
        <CardWrapper
          // className={classes.cardWrapper}
          sx={{
            minHeight: '320px',
            height: '320px',
            borderRadius: 2,
          }}
        >
          <Grid sx={{ display: 'flex', flexDirection: 'row', pb: 1 }}>
            <Name variant="body2" onClick={(e) => e.stopPropagation()}>
              {environmentDetails?.name}
            </Name>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Grid xs={12} sm={9} md={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              {environmentDetails.description ? (
                <DescriptionLabel
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    marginBottom: { xs: 2, sm: 0 },
                    paddingRight: { sm: 2, lg: 0 },
                    marginTop: '0px',
                  }}
                >
                  {environmentDetails.description}
                </DescriptionLabel>
              ) : (
                <EmptyDescription
                  onClick={(e) => e.stopPropagation()}
                  sx={{ color: 'rgba(122,132,142,1)' }}
                >
                  No description
                </EmptyDescription>
              )}
            </Grid>
            <Grid
              xs={12}
              sx={{
                paddingTop: '15px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                gap: '10px',
              }}
            >
              <AllocationButton onClick={(e) => e.stopPropagation()}>
                <TransferButton
                  title="Assigned Connections"
                  count={environmentConnectionsCount}
                  onAssign={onAssignConnection}
                  disabled={!CAN(keys.VIEW_CONNECTIONS.action, keys.VIEW_CONNECTIONS.subject)}
                />
              </AllocationButton>
              {/* temporary disable workspace allocation button  */}
              {false && (
                <AllocationButton onClick={(e) => e.stopPropagation()}>
                  <TransferButton
                    title="Assigned Workspaces"
                    count={
                      environmentDetails.workspaces ? environmentDetails.workspaces?.length : 0
                    }
                    onAssign={onAssignConnection}
                    disabled={!CAN(keys.VIEW_WORKSPACE.action, keys.VIEW_WORKSPACE.subject)}
                  />
                </AllocationButton>
              )}
            </Grid>
          </Grid>
        </CardWrapper>
      }
      backComponents={
        <CardWrapper
          elevation={2}
          // className={classes.cardWrapper}
          sx={{
            minHeight: '320px',
            background: 'linear-gradient(180deg, #007366 0%, #000 100%)',
          }}
        >
          <Grid xs={12} sx={{ display: 'flex', flexDirection: 'row', height: '40px' }}>
            <Grid xs={6} sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <UsesSistent>
                <BulkSelectCheckbox
                  // className={classes.bulkSelectCheckbox}
                  onClick={(e) => e.stopPropagation()}
                  onChange={onSelect}
                  disabled={deleted ? true : false}
                />
              </UsesSistent>
              <CardTitle
                // className={classes.cardTitle}
                sx={{ color: 'white' }}
                variant="body2"
                onClick={(e) => e.stopPropagation()}
              >
                {environmentDetails?.name}
              </CardTitle>
            </Grid>
            <Grid
              xs={6}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton
                // className={classes.iconButton}
                onClick={onEdit}
                disabled={
                  selectedEnvironments?.filter((id) => id == environmentDetails.id).length === 1
                    ? true
                    : !CAN(keys.EDIT_ENVIRONMENT.action, keys.EDIT_ENVIRONMENT.subject)
                }
              >
                <Edit sx={{ color: 'white', margin: '0 2px' }} />
              </IconButton>
              <IconButton
                // className={classes.iconButton}
                onClick={onDelete}
                disabled={
                  selectedEnvironments?.filter((id) => id == environmentDetails.id).length === 1
                    ? true
                    : !CAN(keys.DELETE_ENVIRONMENT.action, keys.DELETE_ENVIRONMENT.subject)
                }
              >
                <Delete sx={{ color: 'white', margin: '0 2px' }} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid sx={{ display: 'flex', flexDirection: 'row', color: 'white' }}>
            <Grid xs={6} sx={{ textAlign: 'left' }}>
              <DateLabel
                // className={classes.dateLabel}
                variant="span"
                onClick={(e) => e.stopPropagation()}
              >
                Updated At: {formattoLongDate(environmentDetails?.updated_at)}
              </DateLabel>
            </Grid>
            <Grid xs={6} sx={{ textAlign: 'left' }}>
              <DateLabel
                // className={classes.dateLabel}
                variant="span"
                onClick={(e) => e.stopPropagation()}
              >
                Created At: {formattoLongDate(environmentDetails?.created_at)}
              </DateLabel>
            </Grid>
          </Grid>
        </CardWrapper>
      }
    />
  );
};

export default EnvironmentCard;
