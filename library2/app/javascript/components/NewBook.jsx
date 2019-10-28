import React from 'react';
import {Link} from "react-router-dom";

class NewBook extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            price: -1,
            subject_id: -1,
            description: ""
};

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str){
        return String(str)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    onChange(event){
        this.setState({ [event.target.name]: event.target.value});
    }

    onSubmit(event){
        event.preventDefault();
        const url = "/api/v1/books/create";

        const {title, price, subject_id, description} = this.state;

        if(title.length == 0 || price < 0 || subject_id <= 0 || description.length == 0)
        return;

        const body = {
            title,
            price,
            subject_id,
            description: description.replace(/\n/g, "<br> <br>")
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url,{
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if(response.ok){
                return response.json;
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/book/${response.id}`))
        .catch(error => console.log(error.message));
    }

    render(){
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Add a new book to the books collection.
                        </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="bookTitle">Book title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="bookTitle"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookPrice">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    id="bookPrice"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookSubjectId">Subject Id</label>
                                <input
                                    type="text"
                                    name="subject_id"
                                    id="booksSubjectId"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                                <label htmlFor="bookDescription">Description</label>
                                <textarea
                                name="description"
                                id="bookDescription"
                                className="form-control"
                                required
                                onChange={this.onChange}>
                                    Enter description here...
                                </textarea>
                            <button type="submit" className="btn custom-button mt-3">
                                Create Book
                            </button>
                            <Link to="/books" className="btn btn-link mt-3">
                                Back to books
                            </Link>
                        </form>
                    </div>
                </div>   
            </div>
     );
    }
}
export default NewBook;

