import {useState, createContext, useContext, useEffect} from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {

    const [listTrack, setListTrack] = useState([]);
    const [idListTrack, setIdListTrack] = useState('');
    const [nowSong, setNowSong] = useState(-1);
    const [isMute, setMute] = useState(false);
    const [soundValue, setSoundValue] = useState(100);
    const [isPlay, setPlay] = useState(true);
    const [loop, setLoop] = useState(0);
    const [isShuffle, setShuffle] = useState(false);

    const nextSong = () => {
        if (isShuffle) {
            setNowSong(Math.round(Math.random() * (listTrack.length - 1)));
        } else {
            if (nowSong + 1 < listTrack.length) {
                setNowSong((prevSong) => prevSong + 1);
            } else {
                setNowSong(0);
            }
        }
    }

    const prevSong = () => {
        if (nowSong > 0) {
            setNowSong((prevSong) => prevSong - 1);
        } else {
            setNowSong(listTrack.length - 1);
        }
    }

    const autoNext = () => {
        if (loop === 1 && !isShuffle && nowSong === listTrack.length - 1) {
            setNowSong(0);
        } else if (loop === 0) setPlay(false);
        else {
            return(nextSong());
        }
    }

    return (
        <PlayerContext.Provider
            value={{ listTrack, nowSong, setNowSong, setListTrack, idListTrack, setIdListTrack,
                isMute, setMute, soundValue, setSoundValue,
                isPlay, setPlay, loop, setLoop, isShuffle, setShuffle,
                prevSong, nextSong, autoNext
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return (useContext(PlayerContext));
}
