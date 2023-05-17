import * as React from "react";
import MainContainer from "./navigation_bar/MainContainer";
import { atom, useAtom } from 'jotai';

export const userIdAtom = atom("");
export const loggedInAtom = atom(false);
function App(){

    return(
        <MainContainer/>
    )
}

export default App;
