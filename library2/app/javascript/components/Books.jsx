import React from "react";
import { Link } from "react-router-dom";

class Books extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount(){
        //const url = "/api/v1/books/list";
        //fetch(url)
        //.then(respose => {
        //    if(respose.ok){
        //        return respose.json();
        //    }
        //    throw new Error("Network response was not ok.")
        //})
        //.then(respose => this.setState({books: respose}))
        //.catch(() => this.props.history.push("/"));
    }

    render(){
        const { books } = this.state;
        const allBooks = books.map((book, index) => (
            <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <Link to = {`/book/show/${book.id}`} className="btn custom-button">
                            View Book
                        </Link>
                    </div>
                </div>
            </div>
        ));

        const noBook = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>
                    No books yet. Why not <Link to="/book/new">create one</Link>
                </h4>
            </div>
        );

        return(
            <>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Books from all subjects</h1>
                        <p className="lead text-muted">
                            We've pulled together the most popular books, our latest
                            additions are sure to be something tempting for you to 
                            try.
                        </p>
                    </div>
                </section>
                <div className="py-5">noBook
                    <main className="container">
                        <div className="text-right mb-3">
                            <Link to="/book/new" className="btn custom-button">
                                Create new Book
                            </Link>
                        </div>
                        <div className="row">
                            {books.length > 0 ? allBooks : noBook}
                        </div>
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                    </main>
                </div>
            </>
        );
    }
}

export default Books;