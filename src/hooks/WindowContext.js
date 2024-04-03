import {createContext, useContext, useEffect, useState} from "react";

const WindowContext = createContext();

export const WindowProvider = ({children}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            // Cập nhật số lượng slide hiển thị dựa trên kích thước màn hình
            if (window.innerWidth < 700) {
                setWindowWidth(699)
            } else if (window.innerWidth < 1200) {
                setWindowWidth(1199);
            } else {
                setWindowWidth(1600);
            }
        };

        window.addEventListener('resize', handleResize); // Thêm event listener để theo dõi sự thay đổi kích thước màn hình

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup event listener khi component unmount
        };
    }, [])
    return (
        <WindowContext.Provider value={{windowWidth, windowHeight}}>
            {children}
        </WindowContext.Provider>
    )
}

export const useWindow = () => {
    return useContext(WindowContext);
}