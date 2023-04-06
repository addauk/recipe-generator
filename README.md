# eatGPT: the recipe generator

### eatGPT is a web application built on the MERN stack that allows users to search for recipes based on a set of ingredients. The app uses an external API to fetch recipes from a proprietary database, based on the inputted ingredients, and displays them to the user. Users can also add their own recipes and describe themselves in a bio.

<br>

---

## Installation

To run on a local server, follow these steps:

Clone the repository:

```
git clone https://github.com/addauk/recipe-generator.git
```

Navigate to the project directory:

```
cd recipe-generator
```

Install dependencies:

```
npm install
```

Create a .env file and add the following environment variables:

```
PORT = 3000
DB_CONNECT = mongodb://localhost:27017
JWT_SECRET = "my-secret-key"
```

Start the server from the API directory:

```
cd api
npm start
```

Start the frontend server from the frontend directory:

```
cd ../frontend
npm start
```

You can now navigate to http://localhost:<port> in your browser to use the app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## The app

<img src="./frontend/public/Images/login.png"
     alt="Login"
     style="float: left; margin-right: 10px;" />

<img src="./frontend/public/Images/signup.png"
     alt="Signup"
     style="float: left; margin-right: 10px;" />

<img src="./frontend/public/Images/Ingredient-checkbox.png"
     alt="Main page"
     style="float: left; margin-right: 10px;" />

<img src="./frontend/public/Images/Matched-recipes.png"
     alt="Recipe search"
     style="float: left; margin-right: 10px;" />

<img src="./frontend/public/Images/Recipe-detail.png"
     alt="Recipe detail page"
     style="float: left; margin-right: 10px;" />

<img src="./frontend/public/Images/Profile.png"
     alt="Profile page"
     style="float: left; margin-right: 10px;" />

## Technologies Used

eatGPT is built on the MERN stack, which consists of the following technologies:

**MongoDB:** A NoSQL database used to store user data and recipes <br>
**Express:** A Node.js framework used to create the server and handle HTTP requests <br>
**React:** A JavaScript library used to create the user interface <br>
**Node.js:** A JavaScript runtime used to run the server-side code <br>
**Axios:** A Promise-based HTTP client used to make requests to the external recipe API <br>
**JSON Web Token (JWT):** A method of securely transmitting information between parties as a JSON object <br>
**Tailwind CSS:** A front-end framework used to create a responsive design for the app <br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Video Demonstration

INSERT LINK HERE

---

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/newFeature`)
3. Commit your Changes (`git commit -m 'Worked on newFeature'`)
4. Push to the Branch (`git push origin feature/newFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Team credits

This project was completed as the final project of the Makers Academy Software Engineering bootcamp, by the following members of the January 2023 cohort:

<a href="https://github.com/addauk"><strong>Adam Evans</strong></a><br>
<a href="https://github.com/Perspicacity11"><strong>Cassius Naylor</strong></a><br>
<a href="https://github.com/MaxAllan-Smith"><strong>Max Allan-Smith</strong></a><br>
<a href="https://github.com/sameerasood"><strong>Sameera Sood</strong></a><br>
<a href="https://github.com/Shamima14"><strong>Shamima Begum</strong></a><br>
<a href="https://github.com/uzair142"><strong>Uzair Patel</strong></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>