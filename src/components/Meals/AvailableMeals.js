import classes from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import {useEffect, useState} from "react";


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [httpError, setHttpError] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-bb519-default-rtdb.firebaseio.com/meals.json')
            if (!response.ok) {
                throw new Error('SomeThing went wrong');
            }
            const responseData = await response.json();
            let loadedMeals = [];
            for (let key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            setisLoading(false);
            setMeals(loadedMeals);
        }
        fetchData().catch((error) => {
            setisLoading(false);
            setHttpError(error.message)
        })

    }, [])
    if (isLoading) {
        return <h3 style={ {textAlign:"center",  color: "white"} }>Waiting to get your Data</h3>
    }
    if (httpError) {
        return <h3 style={ {textAlign:"center",  color: "darkred"} }>Failed to fetch Data</h3>
    }

    const mealsItems = meals.map((meal) => {
        return <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    });
    return <Card className={classes.meals}>
        <ul>
            {mealsItems}
        </ul>
    </Card>

}

export default AvailableMeals;