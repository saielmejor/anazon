import { useNavigate, useParams } from "react-router-dom";
import { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Rating from "../components/Rating";
import Button from "react-bootstrap/esm/Button";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "./Store";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    // set the loading to true so you can show a loading box ;

    case "FETCH_SUCESS":
      return { ...state, product: action.payload, loading: false };

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductScreen() {
  const navigate = useNavigate(); // useNavigate Hook
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [], // show only one product
  });
  // const [products,setProducts]=useState([]);
  //use effect
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }

      // setProducts(result.data); // gets the data from the backend
    };
    fetchData(); //executes fetch data
  }, [slug]);
  //   use slug so when there is a change there would be an uodated in the website

  //add item to the cart handler
  const { state, dispatch: ctxDispatch } = useContext(Store); //dispatch action and get create an action

  const { cart } = state; //destructuring state into cart
  const addToCartHandler = async () => {
    //add quantity of items inside the art
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry.Product is out of stock");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    }); // increases the quantity in the czrt
    navigate("/cart") //navigates to the /cart screen
  };
  return loading ? (
    <LoadingBox> </LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                {" "}
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews}>
                {" "}
              </Rating>
            </ListGroup.Item>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>
              Description: <p>{product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        {/* create cart */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush ">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success"> In Stock</Badge>
                      ) : (
                        <Badge bg="danger"> Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart{" "}
                      </Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
