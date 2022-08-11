import { EntryList } from "./EntryList";
import { NewEntry } from "./newEntry/NewEntry";
import "./listPage.css";
import { selectIsNewEntryFormOpen } from "./listPageSlice";
import { useAppSelector } from "redux/hooks";

export const ListPage = () => {
  const isNewEntryFormOpen = useAppSelector(selectIsNewEntryFormOpen);
  return (
    <>
      {!isNewEntryFormOpen && <EntryList />}
      {isNewEntryFormOpen && <NewEntry />}
    </>
  );
};
