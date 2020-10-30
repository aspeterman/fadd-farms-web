import { Accordion, AccordionActions, AccordionSummary, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Filter, Settings, Sort } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles({
    list: {
        width: 400,
    },
    fullList: {
        width: 'auto',
    },
    accordion: {
        width: 'auto',
        boxShadow: 'none'
    }
});

export default function FilterSideBar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemIcon><Filter /></ListItemIcon>
                            <ListItemText>Filter</ListItemText>
                        </AccordionSummary>
                        <AccordionActions>
                            {props.showing === 'active' ?
                                <Button variant="outlined" color="primary" value="all" className={classes.button} onClick={props.handleShowAll}>Show All</Button>
                                :
                                <Button variant="outlined" color="primary" value="active" className={classes.button} onClick={props.handleShowActive}>Show Active</Button>
                            }
                            {/* <Select options={props.plants.map(plant => { if (plant.category !== '') return { label: plant.category, value: plant.category } })}
                                onChange={opt => props.filterCategory(opt.value)} /> */}
                        </AccordionActions>
                    </Accordion>
                </ListItem>
                <ListItem button>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemIcon><Sort /></ListItemIcon>
                            <ListItemText>Sort By</ListItemText>
                        </AccordionSummary>
                        <AccordionActions>

                        </AccordionActions>
                    </Accordion>

                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><Settings /></Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}