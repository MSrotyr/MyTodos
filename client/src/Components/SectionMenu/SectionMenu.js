import './SectionMenu.css';
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
import { deleteSectionAsync, selectCurrentList } from '../../Containers/AllLists/allListsSlice';
import { UserIdContext } from '../../App'; // eslint-disable-line

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export function SectionMenu({ sectionId }) {
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

  // Handle deleting section
  const dispatch = useDispatch();

  const currentList = useSelector(selectCurrentList);
  function deleteSectionClickHandler(e) {
    handleClose(e);
    dispatch(deleteSectionAsync({
      userId,
      listId: currentList._id,
      sectionId,
    }));
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
          <MoreVertIcon fontSize="small" />
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
                    <MenuItem onClick={deleteSectionClickHandler}>Delete section</MenuItem>
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
