import React, {useState, createContext} from "react"

// Create Context Object
const AppContext = createContext();

// Create a provider for components to consume and subscribe to changes
function AppContextProvider(props) {

    const[modalVisible, setModalVisible] = useState(false);
    const[modalVisibleHome, setModalVisibleHome] = useState(false);
    const[userData, setUserData] = useState({});

    const[plants, setPlants] = useState([]);

    return(
        <AppContext.Provider value = {
                {
                    plantArray:[plants,setPlants], 
                    modal:[modalVisible,setModalVisible],
                    homeModal:[modalVisibleHome, setModalVisibleHome],
                    userCookie:[userData, setUserData]
                }
        }>
            {props.children}
        </AppContext.Provider>
    )
}

export{AppContext, AppContextProvider};


// {
//     id:0,
//     nickname:'Carrot',
//     species:'Cilantro',
//     date:'3/8/2019',
//     classification:[{id:0, name:'Herb', selected:false},{id:1, name:'Apple', selected:false},{id:2, name:'Other', selected:false}],
//     water:7,
//     image:require('../assets/carrot.png'),
//     notes:'This is my favorite carrot'
// },