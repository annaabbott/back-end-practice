import { useState, useEffect } from "react";

import { RecipeSummary } from "../types";
import { fetchRecipeSummary } from "../api";

interface Props {
  recipeId: string;
  onClose: () => void;
}

const RecipeModal: React.FC<Props> = ({ recipeId, onClose }) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary | null>(
    null
  );

  useEffect(() => {
    if (!recipeId) {
      return;
    }
    fetchRecipeSummary(recipeId)
      .then((result) => setRecipeSummary(result))
      .catch((error) => alert(error.message));
  }, [recipeId]);

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modalContent">
          <div className="modalHeader">
            <h2>{recipeSummary?.title}</h2>
            <span className="closeBtn" onClick={onClose}>
              &times;
            </span>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: recipeSummary?.summary || "" }}
          ></p>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
