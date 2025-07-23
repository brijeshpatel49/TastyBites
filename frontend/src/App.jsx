import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { CreateRecipe } from "./pages/Create-recipe";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SavedRecipes } from "./pages/SavedRecipes";
import { Logout } from "./pages/Logout";
import { MyRecipes } from "./pages/MyRecipes";
import { EditRecipe } from "./pages/EditRecipe";
import { NotFound } from "./pages/NotFound";
import { AdminLayout } from "./components/Layout/AdminLayout";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminRecipes } from "./pages/AdminRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="page-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/my-recipe" element={<MyRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/myrecipes/update/:id" element={<EditRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />}></Route>
            <Route path="recipes" element={<AdminRecipes />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
