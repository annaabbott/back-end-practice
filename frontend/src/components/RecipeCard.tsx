import { Recipe } from "../types"

interface Props {
    recipe: Recipe;
    onClick: () => void;

}


const RecipeCard = ({recipe, onClick}: Props) => {
return(
    <div className="recipeCard" onClick={onClick}>
        <img src={recipe.image}></img>
        <div className="recipeCardTitle">
            <h3>{recipe.title}</h3>
        </div>
    </div>
);
};

export default RecipeCard;