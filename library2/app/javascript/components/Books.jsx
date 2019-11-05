import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../services/getBooks";
//import { createConsumer } from "@rails/actioncable";
import {ActionCableContext} from "../contexts/ActionCable.context";

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

// const useActionCable = (path, channel) =>  {
//     const [connected, setStatus] = useState(false);
//     const [consumers, addConsumer] =  useState({});
//     const [subscriptions, addSubscription] =  useState({});
//     const [messages, addMessage] =  useState([]);
  
//     useEffect(() => {
//       const  received = ({message})  => {        
//         addMessage([...messages, 
//             {...JSON.parse(message), _path: path, _channel: channel}]);
//       }      
//       const connected = () => {
//         setStatus(true);
//       }
//       const disconnected = () => {
//         setStatus(false);
//       }
//       const consumer = createConsumer(`ws://localhost:3000/${path}` );
//       addConsumer({...consumers,[path]: consumer})
//       const subscription = consumer.subscriptions.create({channel},{received, connected, disconnected});
       
//       addSubscription({...subscriptions, [channel]: subscription});

//       return () => {
//         consumer.subscriptions.remove(subscription)
//         consumer.disconnect();const useActionCable = (path, channel) =>  {
//     const [connected, setStatus] = useState(false);
//     const [consumers, addConsumer] =  useState({});
//     const [subscriptions, addSubscription] =  useState({});
//     const [messages, addMessage] =  useState([]);
  
//     useEffect(() => {
//       const  received = ({message})  => {        
//         addMessage([...messages, 
//             {...JSON.parse(message), _path: path, _channel: channel}]);
//       }      
//       const connected = () => {
//         setStatus(true);
//       }
//       const disconnected = () => {
//         setStatus(false);
//       }
//       const consumer = createConsumer(`ws://localhost:3000/${path}` );
//       addConsumer({...consumers,[path]: consumer})
//       const subscription = consumer.subscriptions.create({channel},{received, connected, disconnected});
       
//       addSubscription({...subscriptions, [channel]: subscription});

//       return () => {
//         consumer.subscriptions.remove(subscription)
//         consumer.disconnect();
//       };
//     },[]);
  
//     const send = (...args) => {
//         consumers[path].send.apply(consumers[path],args)
//     }
//     return {
//         messages, 
//         send,
//         connected
//     };
//   }
//       };
//     },[]);
  
//     const send = (...args) => {
//         consumers[path].send.apply(consumers[path],args)
//     }
//     return {
//         messages, 
//         send,
//         connected
//     };
//   }

  const useSubscribeNotification  = () => {
    const useActionCable = useContext(ActionCableContext);
    const path = "cable";
    const channel = "CreateNotificationChannel";
    const {
        messages, 
        send,
        connected
    } = useActionCable(path, channel);

    const getNotifications  = () => {
            return messages.filter((message) => message._path == path && 
            message._channel == channel)
    }
    return {
        getNotifications,
        send,
        connected
    }
  }


const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const {getNotifications, connected} = useSubscribeNotification();
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
    }, []);

    const bookNotifications =  getNotifications();
        if(bookNotifications.length ) {
            const newlyAddedBooks = bookNotifications
            .filter(notification => notification.action == "created" && notification.book 
            && !books.find( book => notification.book.id == book.id)
            )
            //.filter(Boolean)
            .map(notification => notification.book)
            console.log("Books Notification:", bookNotifications);
            console.log("Newly Added Book:", newlyAddedBooks);
            if(newlyAddedBooks.length)
            setBooks(books.concat(newlyAddedBooks))
        }
    
    
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