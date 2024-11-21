import ItemListContainer from "../../components/ItemListContainer/ItemListContainer"
import Carrousel from "../../components/Carrousel/Carrousel"

const Home = () => {

    return (
        <>
            <Carrousel/>
            <ItemListContainer greeting={'Productos Recomendados'}/>
        </>
    )
}

export default Home