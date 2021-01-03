import Joi from "joi-browser";
import React  from 'react';
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Form from './form';

class Movieform extends Form {
    state = { 
        data:{
            title:"",
            genreId:"",
            numberInStock:"",
            dailyRentalRate:""
        },
        genres:[],
        errors:{}
    }
    async componentDidMount(){
        const genres = await getGenres();
        this.setState({genres:genres.data});

        const movieId = this.props.match.params.id;
        if (movieId === 'new') return;

        try{
            const movie = await getMovie(movieId);
            this.setState({data:this.mapToViewModel(movie.data)});
        }
        catch(ex){
            if (ex.response && ex.response.status === 404) 
             this.props.history.replace('/non-found');

        }
    }

    schema = {
        _id:Joi.string(),
        title: Joi.string().required().label("title"),
        genreId: Joi.string().required().label("genre"),
        numberInStock: Joi.number().min(0).max(100).required().label("NIS"),
        dailyRentalRate: Joi.number().min(1).max(5).required().label("rate"),
      };

    mapToViewModel(movie){
        return {
            _id:movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
        };
    }

    async doSubmit(){
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    }

    render() { 
        return ( 
            <div className="row">
            <form className="form-group col-md-6" onSubmit={this.handleSubmit}>
            {this.renderInput("title","Title")}
            {this.renderDropdown("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock","NumberInStock")}
            {this.renderInput("dailyRentalRate","Rate")}
            {this.renderButton("Add new")}
            </form>
            </div>
         );
    }
}
 
export default Movieform;