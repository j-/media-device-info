import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { ObjectView } from '.';
import { ObjectViewFunction } from './ObjectViewFunction';

function allKeys<T>(obj: T): (keyof T)[] {
  const keys: (keyof T)[] = [];
  for (const key in obj) {
    keys.push(key);
  }
  return keys;
}

function orderedKeys<T>(obj: T): (keyof T)[] {
  const all = allKeys(obj);
  const allSet = new Set(all);
  const fnKeys = all.filter((key) => typeof obj[key] === 'function');
  const restSet = allSet.difference(new Set(fnKeys));

  const restSorted = [...restSet].sort();
  const fnSorted = [...fnKeys].sort();

  return [...restSorted, ...fnSorted];
}

export const ObjectViewObject: FC<{ value: Record<string, object> }> = ({
  value: parent,
}) => {
  const keys = orderedKeys(parent);

  if (keys.length === 0) {
    return (
      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'{}'}
      </Typography>
    );
  }

  return (
    <>
      <Typography
        component="span"
        fontFamily="monospace"
        fontStyle="italic"
        color="hsl(150, 40%, 40%)"
      >
        {parent.__proto__.constructor.name}{' '}
      </Typography>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'{'}
      </Typography>

      <Box component="ul" p={0} m={0} ml="2ch">
        {keys.map((key, i, arr) => [
          <Box
            key={key}
            component="li"
            sx={{ display: 'inline', listStyle: 'none', whiteSpace: 'nowrap' }}
          >
            <Typography
              component="span"
              color="gray.300"
              fontFamily="monospace"
            >
              {key}
              {': '}
            </Typography>

            {typeof parent[key] === 'function' ? (
              <ObjectViewFunction
                value={parent[key]}
                onClick={async () => console.log(await parent[key]())}
              />
            ) : (
              <ObjectView value={parent[key]} />
            )}
          </Box>,

          i < arr.length - 1 ? (
            <Typography
              key={i + ','}
              component="span"
              color="gray.300"
              fontFamily="monospace"
            >
              {','}
              <br />
            </Typography>
          ) : null,
        ])}
      </Box>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'}'}
      </Typography>
    </>
  );
};
