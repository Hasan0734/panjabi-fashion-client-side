import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddProduct from '../AddProduct/AddProduct';
import { useState } from 'react';
import ManageProduct from '../ManageProduct/ManageProduct';

const drawerWidth = 300;


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',

    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
        color:'black',
    backgroundColor: '#fff',
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
    color: 'white',
      backgroundColor: '#203D37',
      width: drawerWidth,
    },
    drawerHeader: {

      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    list:{ 
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
  
},
    listItem:{
       paddingLeft: '65px'

    },
    icons: {
        marginRight: 'none',
        color: 'white',
        minWidth: "32px",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));
const Admin = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [handleProduct , setHandleProduct] = useState({
        manageProduct: false,
        addProduct: true,
        editProduct: false
    })
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  const handleDrawerClose = () => {
    setOpen(false)
  }
    const handleManageProduct = () =>{
     const manage = {...handleProduct};
     manage.manageProduct = true
     manage.addProduct = false
     manage.editProduct = false
     setHandleProduct(manage)
    }
    const handleAddProduct = () => {
      const manage = {...handleProduct};
      manage.manageProduct = false
      manage.addProduct = true
      manage.editProduct = false
      setHandleProduct(manage)
    }
  
    return (
      
        <div className={classes.root}>
         
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" noWrap>
                {handleProduct.manageProduct ? 'Manage Product': handleProduct.addProduct ? 'Add Product': 'Edit Product'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
          <Typography variant="h5" >Panjabi Fashion</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
           
          </div>
          <Divider />
          <List className={classes.list}>
            {['Manage Product', 'Add Product', 'Edit Product'].map((text, index) => (
              <ListItem onClick={index === 0 ? handleManageProduct : index === 1 && handleAddProduct } className={classes.listItem}  button key={text}>
               <ListItemIcon className={classes.icons} >{index === 0 ? <SettingsIcon  /> : index === 1 ? <AddIcon /> : <EditIcon/>}</ListItemIcon>
                <ListItemText  primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {handleProduct.manageProduct && <ManageProduct/>}
         { handleProduct.addProduct && <AddProduct/>}
       
        </main>
      </div>
     
    );
};

export default Admin;