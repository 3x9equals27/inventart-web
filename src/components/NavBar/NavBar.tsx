import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import styles from './NavBar.module.css';

export default function ButtonAppBar() {
  const history = useHistory();

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            Inventário
          </Typography>
          <Button color="inherit" onClick={()=>{history.push('/Home')}}>Home</Button>
          <Button color="inherit" onClick={()=>{history.push('/Diagnostics')}}>Diagnostics</Button>
          <Button color="inherit" onClick={()=>{history.push('/About')}}>About</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

