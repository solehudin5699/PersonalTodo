import React from "react";
import "../../pages/Home/home.css";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { SwipeableDrawer } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./drawer.css";
import userIcon from "../../assets/images/usericon.png";
import { logoutUser } from "../../redux/actions/users/auth";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // backgroundColor: "rgb(245, 36, 203)",
    backgroundColor: "rgb(71, 93, 235, 1)",
  },
  // appBarShift: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // hide: {
  //   display: "none",
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // backgroundColor: "rgb(71, 93, 235, 0.9)",
    color: "white",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    marginBottom: "-25px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    padding: "10px",
  },
  // contentShift: {
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // },
}));

export default function SweapDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={classes.menuButton}
            style={{ outline: "none" }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Personal Todo
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        className={classes.drawer}
        anchor='left'
        open={open}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: "bcgDrawer",
        }}>
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={handleDrawerClose}
            style={{ color: "white", outline: "none" }}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className='profilebox'>
          <div className='profilebox_imageContainer'>
            <img className='profilebox_img' src={userIcon} alt='' />
          </div>
          <h6 className='profilebox_name'>{user.name}</h6>
        </div>
        {/* <Divider /> */}
        <List style={{ color: "#FFFFFF" }}>
          {/* <ListItem button key={"Home"}>
            <ListItemIcon>
              <HomeIcon style={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button key={"All TodoList"}>
            <ListItemIcon>
              <FormatListBulletedIcon style={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText
              style={{ fontSize: "10px" }}
              primary={"All TodoList"}
            />
          </ListItem> */}
          <ListItem button key={"Logout"} onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon style={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
        <Divider />
      </SwipeableDrawer>
    </div>
  );
}
