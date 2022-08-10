import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DataIcon from '@mui/icons-material/DataThresholding';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEntryByName, selectEntryNames } from '../timeline/timelineSlice';

export const EntryList = () => {
    const dispatch = useDispatch();
    const entries = useSelector(selectEntryNames)
    return (
        <>
            <List dense={false} sx={{width: 600}}>
                {entries.map((entry, i) => (<>
                    {i !== 0 && <Divider variant="inset" component="li" />}
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteEntryByName(entry))}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <DataIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={entry}
                        />
                    </ListItem>
                </>))}


            </List>
        </>
    )
}