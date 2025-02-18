import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import styles from './Home.css'
import Paginate from "./Paginate";
import Card from "./Card"
import { getGames } from "../actions";

export default function Home(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGames());
    }, [dispatch]);

    const games = useSelector(state => state.games);
    let gamesForFilter = Object.assign({}, games);

    const [keny, setKeny] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);    
    const [gamesPerPage, setGamesPerPage] = useState(10); 
    const lastGame = gamesPerPage * currentPage; 
    const firstGame = lastGame - gamesPerPage; 
    const currentGames = gamesForFilter.length > 0 ? gamesForFilter.slice(firstGame, lastGame) : []; 

    const paginate = (pageNum) => {
        setCurrentPage(pageNum)
    };
    
    return(
        <div className="divhomeprincipal">
            <NavBar/>
            <div>
                <Paginate
                    gamesPerPage={gamesPerPage}
                    allgames={gamesForFilter.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <div className="Cp">
                    {
                        currentGames && currentGames.map(game => {
                            return (
                                <Card 
                                imagen={game.imagen} 
                                name={game.name} 
                                id={game.id} 
                                generos={game.genrs}/>
                            )
                        })
                    } 
                </div>
            </div>
        </div>
    )

}