import axios from "axios";

export async function categoriesList(){
    const url = 'https://opentdb.com/api_category.php';
    const response = await axios.get(url);
    return response.data.trivia_categories;
}

export async function questionList(category){
    const url = `https://opentdb.com/api.php?amount=10&category=${category}`
    const response = await axios.get(url)
    return response.data.results;
}