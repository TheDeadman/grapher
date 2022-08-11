# Links

<https://redux-toolkit.js.org/>
<https://redux.js.org/style-guide/>
<https://reactjs.org/>
<https://testing-library.com/docs/react-testing-library/intro/>

install react-devtools and redux-devtools!

1. ~~Basic~~

2. Example - Parent component with Open / Close "state" variable and "expensive" array mapping... show that opening / closing for one component causes the expensive array stuff to run again and be problematic...

   - Multiple ways to address... useMemo properly... state management...

3. Separating components is not just for re-use. Composition... More efficient

4. setState with callback vs direct value

4. Context vs Redux

5. createSlice should be your go to for state management. You probably won't ever need to use "createReducer"

6. createSlice reducers have "immer" built in. You don't need to worry about using immer outside of createSlice.

7. <https://reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes>

8. memo-izing... problems with passing down functions.. when a parent re-renders

9. Arrays / objects making new versions

10. keys

11. Logic in reducers

12. useAppDispatch

13. Testing... Write tests like users would interact with the app
