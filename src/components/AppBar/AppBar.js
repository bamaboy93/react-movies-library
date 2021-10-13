import { NavLink } from 'react-router-dom';

import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/" c>
            <Typography
              variant="h6"
              component="div"
              sx={{ mr: 4, color: 'white' }}
            >
              Home
            </Typography>
          </NavLink>
          <NavLink to="/movies">
            <Typography variant="h6" component="div" sx={{ color: 'white' }}>
              Movies
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// export default function AppBar() {
//   return (
//     <header className={styles.header}>
//       <Navigation />
//     </header>
//   );
// }
