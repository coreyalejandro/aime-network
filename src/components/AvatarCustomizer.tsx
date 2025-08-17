import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Save } from "lucide-react";

interface OutfitItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface OutfitCategory {
  id: string;
  name: string;
  items: OutfitItem[];
}

const AvatarCustomizer = () => {
  // Default outfit categories and items
  const outfitCategories: OutfitCategory[] = [
    {
      id: "traditional-indian",
      name: "Traditional Indian",
      items: [
        {
          id: "saree-red",
          name: "Red Saree",
          image:
            "https://images.unsplash.com/photo-1610189018841-63e9a73d5f9f?w=300&q=80",
          description: "Elegant red saree with gold embroidery",
        },
        {
          id: "saree-blue",
          name: "Blue Saree",
          image:
            "https://images.unsplash.com/photo-1610189018841-63e9a73d5f9f?w=300&q=80",
          description: "Royal blue saree with silver accents",
        },
        {
          id: "salwar-green",
          name: "Green Salwar Kameez",
          image:
            "https://images.unsplash.com/photo-1610189018841-63e9a73d5f9f?w=300&q=80",
          description: "Emerald green salwar kameez with intricate embroidery",
        },
      ],
    },
    {
      id: "detroit-motown",
      name: "Detroit Motown",
      items: [
        {
          id: "sequin-dress",
          name: "Sequin Dress",
          image:
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&q=80",
          description: "Sparkling sequin dress in Motown style",
        },
        {
          id: "bell-bottoms",
          name: "Bell Bottoms",
          image:
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&q=80",
          description: "Classic 70s bell bottom pants with matching top",
        },
        {
          id: "motown-jacket",
          name: "Motown Jacket",
          image:
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&q=80",
          description: "Stylish jacket inspired by Motown performers",
        },
      ],
    },
    {
      id: "fusion-style",
      name: "Fusion Style",
      items: [
        {
          id: "indo-western",
          name: "Indo-Western",
          image:
            "https://images.unsplash.com/photo-1583391733981-8498408c3c25?w=300&q=80",
          description: "Blend of Indian and Western fashion elements",
        },
        {
          id: "saree-modern",
          name: "Modern Saree",
          image:
            "https://images.unsplash.com/photo-1583391733981-8498408c3c25?w=300&q=80",
          description: "Contemporary take on traditional saree",
        },
        {
          id: "fusion-dress",
          name: "Fusion Dress",
          image:
            "https://images.unsplash.com/photo-1583391733981-8498408c3c25?w=300&q=80",
          description:
            "Unique dress combining Indian patterns with Western cuts",
        },
      ],
    },
    {
      id: "casual",
      name: "Casual",
      items: [
        {
          id: "apron-floral",
          name: "Floral Apron",
          image:
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80",
          description: "Colorful floral pattern cooking apron",
        },
        {
          id: "apron-chef",
          name: "Chef Apron",
          image:
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80",
          description: "Professional chef style apron",
        },
        {
          id: "casual-outfit",
          name: "Casual Outfit",
          image:
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80",
          description: "Comfortable everyday outfit",
        },
      ],
    },
    {
      id: "formal",
      name: "Formal",
      items: [
        {
          id: "gown-red",
          name: "Red Gown",
          image:
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
          description: "Elegant red evening gown",
        },
        {
          id: "suit-black",
          name: "Black Suit",
          image:
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
          description: "Sophisticated black formal suit",
        },
        {
          id: "formal-saree",
          name: "Formal Saree",
          image:
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
          description: "Luxurious formal saree for special occasions",
        },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    outfitCategories[0].id,
  );
  const [selectedOutfit, setSelectedOutfit] = useState<string>(
    outfitCategories[0].items[0].id,
  );
  const [currentAvatar, setCurrentAvatar] = useState<string>(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae",
  );

  // Find the currently selected outfit item
  const currentCategory = outfitCategories.find(
    (cat) => cat.id === selectedCategory,
  );
  const currentOutfit = currentCategory?.items.find(
    (item) => item.id === selectedOutfit,
  );

  // Handle saving the avatar customization
  const handleSaveChanges = () => {
    // In a real app, this would save the avatar configuration to a database or state management system
    console.log("Saving avatar with outfit:", currentOutfit);
    // For demo purposes, we'll just update the avatar image
    setCurrentAvatar(
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedOutfit}`,
    );
  };

  return (
    <div className="bg-background p-6 rounded-lg w-full max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Customize Auntie Mae
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Preview */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how Auntie Mae looks with your selections
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-64 h-64 rounded-full overflow-hidden bg-muted mb-4">
                <img
                  src={currentAvatar}
                  alt="Auntie Mae Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {currentOutfit && (
                <div className="text-center mt-4">
                  <h3 className="font-medium">{currentOutfit.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentOutfit.description}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges} className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Outfit Selection */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Outfit Selection</CardTitle>
              <CardDescription>
                Choose from various outfit styles for Auntie Mae
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                  {outfitCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {outfitCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <ScrollArea className="h-[400px] pr-4">
                      <RadioGroup
                        value={selectedOutfit}
                        onValueChange={setSelectedOutfit}
                        className="space-y-4"
                      >
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4"
                          >
                            <RadioGroupItem value={item.id} id={item.id} />
                            <Label
                              htmlFor={item.id}
                              className="flex flex-1 items-center cursor-pointer"
                            >
                              <div className="flex items-center space-x-4 w-full p-2 hover:bg-accent rounded-md">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage
                                    src={item.image}
                                    alt={item.name}
                                  />
                                  <AvatarFallback>
                                    {item.name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="font-medium">{item.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizer;
