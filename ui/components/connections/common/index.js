import { CustomTextTooltip } from '@/components/MesheryMeshInterface/PatternService/CustomTextTooltip';
import { Grid, TableCell, TableSortLabel, Typography } from '@layer5/sistent';
import { UsesSistent } from '@/components/SistentWrapper';

export const SortableTableCell = ({ index, columnData, columnMeta, onSort, icon, tooltip }) => {
  return (
    <UsesSistent>
      <TableCell key={index} onClick={onSort}>
        <Grid sx={{ display: 'flex' }}>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>
              <b>{columnData.label}</b>
            </Typography>
            {icon ? (
              <CustomTextTooltip interactive={true} title={tooltip ? tooltip : ''} placement="top">
                <Typography sx={{ display: 'flex', marginLeft: '5px' }} variant="span">
                  {icon}
                </Typography>
              </CustomTextTooltip>
            ) : (
              ''
            )}
          </Grid>
          <TableSortLabel
            active={columnMeta.name === columnData.name}
            direction={columnMeta.direction || 'asc'}
          ></TableSortLabel>
        </Grid>
      </TableCell>
    </UsesSistent>
  );
};

export const DefaultTableCell = ({ columnData, icon, tooltip }) => {
  return (
    <UsesSistent>
      <TableCell>
        <Grid sx={{ display: 'flex' }}>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>
              <b>{columnData.label}</b>
            </Typography>
            {icon ? (
              <CustomTextTooltip interactive={true} title={tooltip ? tooltip : ''} placement="top">
                <Typography sx={{ display: 'flex', marginLeft: '5px' }} variant="span">
                  {icon}
                </Typography>
              </CustomTextTooltip>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </TableCell>
    </UsesSistent>
  );
};
