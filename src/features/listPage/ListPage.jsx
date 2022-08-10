import { EntryList } from "./EntryList"
import { NewEntry } from './newEntry/NewEntry';
import './listPage.css'
import { useSelector } from "react-redux";
import { selectIsNewEntryFormOpen } from "./listPageSlice";

export const ListPage = () => {
    const isNewEntryFormOpen = useSelector(selectIsNewEntryFormOpen);
    return (
        <>
            {!isNewEntryFormOpen && <EntryList />}
            {isNewEntryFormOpen && <NewEntry />}
        </>
    )
}