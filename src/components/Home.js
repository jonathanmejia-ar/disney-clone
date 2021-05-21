import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import db from '../firebase';
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Recommends from './Recommends';
import Trending from './Trending';
import Viewers from './Viewers';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';


const Home = () => {
    const dispatch = useDispatch();
    const username = useSelector(selectUserName);
    let recommends = [];
    let newDisney = [];
    let originals = [];
    let trending = [];

    useEffect(() => {
        const selectCat = {
            'recommend': (doc) => {
                recommends.push({ id: doc.id, ...doc.data() });
            },
            'new': (doc) => {
                newDisney.push({ id: doc.id, ...doc.data() });
            },
            'original': (doc) => {
                originals.push({ id: doc.id, ...doc.data() });
            },
            'trending': (doc) => {
                trending.push({ id: doc.id, ...doc.data() });
            }
        };
        db.collection('movies').onSnapshot((snapshot) => {
            snapshot.docs.map(doc => selectCat[doc.data().type](doc));
            console.log(recommends);

            dispatch(setMovies({
                recommend: recommends,
                newDisney: newDisney,
                originals: originals,
                trending: trending
            }));
        });

    }, [username]);

    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommends />
            <NewDisney />
            <Originals />
            <Trending />
        </Container>
    )
}

export default Home;

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);

    &:after{
        background: url('/images/home-background.png') center center / cover no-repeat fixed;
        content: '';
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }
`;