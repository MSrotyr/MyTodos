import './ListMenu.css';
import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAddSectionForm } from '../../Containers/SelectedList/selectedListSlice';
import { deleteListAsync, selectCurrentList } from '../../Containers/AllLists/allListsSlice';
import { UserIdContext } from '../../App'; // eslint-disable-line

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 'auto',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export function ListMenu() {
  // Material-UI menu
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const userId = useContext(UserIdContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // Handle showing Add Section form
  const dispatch = useDispatch();

  function addSectionClickHandler(e) {
    handleClose(e);
    dispatch(setShowAddSectionForm(true));
  }

  // Handle deleting list
  const currentList = useSelector(selectCurrentList);
  function deleteListClickHandler(e) {
    handleClose(e);
    dispatch(deleteListAsync({ userId, listId: currentList._id }));
  }
  return (
    <div className={classes.root}>
      <div>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertIcon />
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps} // eslint-disable-line
              style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={addSectionClickHandler}>Add section</MenuItem>
                    <MenuItem onClick={deleteListClickHandler}>Delete list</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
