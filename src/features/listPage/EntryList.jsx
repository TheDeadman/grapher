import { Fragment } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntryById, selectDataSets } from '../timelineData/timelineSlice';
import { openNewEntryForm } from './listPageSlice';


export const EntryList = () => {
    const dispatch = useDispatch();
    const dataSets = useSelector(selectDataSets)
    return (
        <>
            <List dense={false} sx={{ width: 600 }}>
                {dataSets.map(({ id, name }, i) => (<Fragment key={`entrylist-${id}`}>
                    {i !== 0 && <Divider variant="inset" component="li" />}
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteEntryById(id))}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <CatchingPokemonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={name}
                        />
                    </ListItem>
                </Fragment>))}


            </List>
            <div className="list-page-buttons">
                <Button variant="outlined" onClick={() => dispatch(openNewEntryForm())}>New Entry</Button>
                <Button variant="outlined">Use Demo Entries</Button>
            </div>
        </>
    )
}