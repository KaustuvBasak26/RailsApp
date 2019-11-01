import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import consumer from "../channels/consumer";
import { getBooks } from "../services/getBooks";

const ListBooks = ({books}) => 
    books.map((book, index) => (
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

const NoBook = () =>  (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
            No books yet. Why not <Link to="/book/new">create one</Link>
        </h4>
    </div>
);
const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await getBooks();
                setBooks(books);
            } catch(e) {
                    setError(e);
            }
        }
        fetchBooks();
        consumer.subscriptions.create(
                     {channel: "CreateNotificationChannel"},
                     {
                         received: data => {
                             if(data.message.length !== 0){
                                 fetchBooks();
                         }
                     }
                 });
        
                
    }, [])

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
                
                <div className="py-5">
                    <main className="container">
                        <div className="text-right mb-3">
                            <Link to="/book/new" className="btn custom-button">
                                Create new Book
                            </Link>
                        </div>
                        <div className="row">
                            {console.log(`books.length:+${books.length}`)}
                            {books.length  ? <ListBooks books={books} /> :  <NoBook />    }
                        </div>
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                    </main>
                </div>
            </>
        );
    
}

export default Books;