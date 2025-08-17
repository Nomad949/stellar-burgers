import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  let currentId = useParams().id;
  const [ingredientData] = ingredients.filter((item) => item._id === currentId);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [ingredients.length]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
