import { snacksData } from "./db/snacks";
import "./App.css";
import { useState } from "react";

function App() {
    const [snacks, setSnacks] = useState(snacksData);
    const [sortData, setSortData] = useState({
        column: 0,
        sortLowToHigh: false,
        sortHighToLow: false,
    });

    const [searchQuery, setSearchQuery] = useState("");

    const isPresentInIngredients = (snack) => {
        return snack.ingredients.some((ingredient) => {
            return ingredient.toLowerCase().includes(searchQuery.toLowerCase());
        });
    };

    let filteredSnacks = snacks;

    filteredSnacks = snacks.filter((snack) => {
        return (
            snack.product_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            isPresentInIngredients(snack)
        );
    });

    if (sortData.sortLowToHigh) {
        filteredSnacks.sort((a, b) => a[sortData.column] - b[sortData.column]);
    } else {
        filteredSnacks.sort((b, a) => a[sortData.column] - b[sortData.column]);
    }

    return (
        <div className="App">
            <h1>Snack Table</h1>
            <input
                type="search"
                name="search"
                onChange={(event) => setSearchQuery(event.target.value)}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th
                            value="id"
                            onClick={(event) =>
                                setSortData((sortData) => ({
                                    column: "id",
                                    sortLowToHigh:
                                        event.target.value === sortData.column
                                            ? !sortData.sortLowToHigh
                                            : false,
                                }))
                            }
                        >
                            ID
                        </th>
                        <th
                            name="product__name"
                            onClick={(event) =>
                                setSortData((sortData) => {
                                    console.log(sortData.column);
                                    console.log(event.target.value);
                                    return {
                                        column: "product__name",
                                        sortLowToHigh:
                                            event.target.value ===
                                            sortData.column
                                                ? !sortData.sortLowToHigh
                                                : false,
                                    };
                                })
                            }
                        >
                            Product Name
                        </th>
                        <th>Product Weight</th>
                        <th>Price (INR)</th>
                        <th>Calories</th>
                        <th>Ingredients</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSnacks?.map((snack) => (
                        <tr key={snack.id}>
                            <th>{snack.id}</th>
                            <th>{snack.product_name}</th>
                            <th>{snack.product_weight}</th>
                            <th>{snack.price}</th>
                            <th>{snack.calories}</th>
                            <th>
                                {snack.ingredients.map((ingredient, index) => (
                                    <span key={index}>
                                        {ingredient}
                                        {snacks[index].ingredients.length -
                                            1 ===
                                        index
                                            ? ""
                                            : ", "}
                                    </span>
                                ))}
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
