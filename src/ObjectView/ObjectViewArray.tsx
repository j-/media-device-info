import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { ObjectView } from '.';
import Box from '@mui/material/Box';

export const ObjectViewArray: FC<{ value: unknown[] }> = ({ value }) => (
  <>
    <Typography component="span" color="gray.300" fontFamily="monospace">
      {'['}
    </Typography>

    <Box component="ul" p={0} m={0} ml="2ch">
      {Array.from(value).map((value, i, arr) => [
        <Box
          key={i}
          component="li"
          display="inline"
          value={i}
          sx={{ listStyle: 'none' }}
        >
          <ObjectView value={value} />
        </Box>,

        i < arr.length - 1 ? (
          <Typography
            key={i + ','}
            component="span"
            color="gray.300"
            fontFamily="monospace"
          >
            {', '}
          </Typography>
        ) : null,
      ])}
    </Box>

    <Typography component="span" color="gray.300" fontFamily="monospace">
      {']'}
    </Typography>
  </>
);
