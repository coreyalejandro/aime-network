import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Users, ChevronRight } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  prepTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  difficulty: "Easy" | "Medium" | "Hard";
}

const RecipeBrowser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for recipes
  const recipes: Recipe[] = [
    {
      id: "1",
      name: "Mary Ann's Butter Chicken Cornbread",
      description:
        "A healing fusion of classic butter chicken with Southern cornbread, dedicated to Mary Ann Davis's birthday",
      category: "Fusion Dishes",
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80",
      prepTime: "45 mins",
      servings: 4,
      ingredients: [
        "2 cups cornmeal",
        "1 cup all-purpose flour",
        "1 lb chicken thighs, boneless",
        "1 cup tomato puree",
        "1/2 cup heavy cream",
        "2 tbsp butter",
        "1 tbsp garam masala",
        "1 tsp turmeric",
      ],
      instructions: [
        "Prepare cornbread batter and set aside",
        "Marinate chicken in yogurt and spices for 30 minutes",
        "Cook chicken in butter until golden brown",
        "Add tomato puree and simmer for 15 minutes",
        "Stir in cream and simmer for another 5 minutes",
        "Pour cornbread batter into a baking dish",
        "Top with butter chicken mixture",
        "Bake at 375°F for 25 minutes until cornbread is done",
      ],
      difficulty: "Medium",
    },
    {
      id: "2",
      name: "Masala Mac and Cheese",
      description: "Creamy mac and cheese with Indian spices and paneer",
      category: "Fusion Dishes",
      image:
        "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=600&q=80",
      prepTime: "30 mins",
      servings: 6,
      ingredients: [
        "1 lb elbow macaroni",
        "2 cups cheddar cheese, shredded",
        "1 cup paneer, cubed",
        "1/2 cup heavy cream",
        "2 tbsp butter",
        "1 tsp cumin",
        "1 tsp coriander",
        "1/2 tsp turmeric",
      ],
      instructions: [
        "Cook macaroni according to package instructions",
        "In a separate pan, melt butter and add spices",
        "Add cream and bring to a simmer",
        "Stir in cheese until melted",
        "Add paneer cubes",
        "Mix sauce with drained macaroni",
        "Garnish with fresh cilantro",
      ],
      difficulty: "Easy",
    },
    {
      id: "3",
      name: "Tandoori Fried Chicken",
      description: "Southern fried chicken with tandoori spices",
      category: "Fusion Dishes",
      image:
        "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80",
      prepTime: "1 hour",
      servings: 4,
      ingredients: [
        "8 chicken pieces, bone-in",
        "2 cups buttermilk",
        "2 cups all-purpose flour",
        "2 tbsp tandoori masala",
        "1 tsp cayenne pepper",
        "1 tsp garlic powder",
        "Oil for frying",
      ],
      instructions: [
        "Marinate chicken in buttermilk and 1 tbsp tandoori masala for at least 4 hours",
        "Mix flour with remaining spices",
        "Dredge marinated chicken in flour mixture",
        "Fry in hot oil until golden and cooked through, about 15 minutes",
        "Drain on paper towels",
        "Serve with mint-yogurt sauce",
      ],
      difficulty: "Medium",
    },
    {
      id: "4",
      name: "Chana Masala",
      description: "Traditional chickpea curry with aromatic spices",
      category: "Traditional Indian",
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
      prepTime: "40 mins",
      servings: 4,
      ingredients: [
        "2 cans chickpeas, drained",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "2 cloves garlic, minced",
        "1 inch ginger, grated",
        "1 tbsp garam masala",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
      ],
      instructions: [
        "Heat oil and add cumin seeds until they splutter",
        "Add onions and sauté until golden brown",
        "Add ginger and garlic, sauté for 1 minute",
        "Add tomatoes and spices, cook until oil separates",
        "Add chickpeas and water, simmer for 15 minutes",
        "Garnish with fresh cilantro and serve with rice or naan",
      ],
      difficulty: "Easy",
    },
    {
      id: "5",
      name: "Soul Food Collard Greens",
      description: "Classic Southern collard greens with smoked turkey",
      category: "Soul Food Classics",
      image:
        "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80",
      prepTime: "1.5 hours",
      servings: 6,
      ingredients: [
        "2 bunches collard greens, cleaned and chopped",
        "1 smoked turkey leg",
        "1 onion, diced",
        "2 cloves garlic, minced",
        "4 cups chicken broth",
        "1 tbsp apple cider vinegar",
        "1 tsp red pepper flakes",
        "Salt and pepper to taste",
      ],
      instructions: [
        "In a large pot, sauté onions and garlic until soft",
        "Add smoked turkey leg and chicken broth",
        "Bring to a simmer and add collard greens",
        "Add vinegar and seasonings",
        "Cover and simmer for 1-2 hours until greens are tender",
        "Remove turkey leg, shred meat and return to pot",
        "Serve with cornbread",
      ],
      difficulty: "Easy",
    },
    {
      id: "6",
      name: "Sweet Potato Samosas",
      description: "Southern sweet potatoes in a crispy Indian pastry",
      category: "Fusion Dishes",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
      prepTime: "1 hour",
      servings: 8,
      ingredients: [
        "2 cups all-purpose flour",
        "1/4 cup ghee",
        "2 large sweet potatoes, boiled and mashed",
        "1 cup peas",
        "1 tsp cumin seeds",
        "1 tsp garam masala",
        "1/2 tsp cayenne pepper",
        "Oil for frying",
      ],
      instructions: [
        "Make dough with flour, ghee, and water, rest for 30 minutes",
        "Heat oil and add cumin seeds until they splutter",
        "Add spices and peas, cook for 2 minutes",
        "Mix with mashed sweet potatoes",
        "Roll dough into circles, cut in half",
        "Form cones, fill with sweet potato mixture",
        "Seal edges and fry until golden brown",
        "Serve with tamarind and mint chutneys",
      ],
      difficulty: "Hard",
    },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery === "") return true;
    return matchesSearch;
  });

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full h-full bg-white p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Auntie Mae's Healing Recipe Collection
          <p className="text-sm text-muted-foreground mt-2">
            Honoring Mary Ann Davis - Where Food Becomes Medicine
          </p>
        </h1>

        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All Recipes</TabsTrigger>
            <TabsTrigger value="fusion">Fusion Dishes</TabsTrigger>
            <TabsTrigger value="indian">Traditional Indian</TabsTrigger>
            <TabsTrigger value="soul">Soul Food Classics</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fusion" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes
                .filter((recipe) => recipe.category === "Fusion Dishes")
                .map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => handleRecipeClick(recipe)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="indian" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes
                .filter((recipe) => recipe.category === "Traditional Indian")
                .map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => handleRecipeClick(recipe)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="soul" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes
                .filter((recipe) => recipe.category === "Soul Food Classics")
                .map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => handleRecipeClick(recipe)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedRecipe && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedRecipe.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                {selectedRecipe.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{selectedRecipe.prepTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>Serves {selectedRecipe.servings}</span>
                  </div>
                  <Badge
                    className={getDifficultyColor(selectedRecipe.difficulty)}
                  >
                    {selectedRecipe.difficulty}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc pl-5 mb-4">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal pl-5">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="mb-1">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              <Button>
                Watch Auntie Mae Cook This
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{recipe.name}</CardTitle>
          <Badge variant="outline">{recipe.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {recipe.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>Serves {recipe.servings}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full">
          View Recipe
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeBrowser;
