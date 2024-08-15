import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams, useHistory } from 'react-router-dom';

const productsData = [
  { id: 1, name: 'Mobile A', description: 'Details of Mobile A', price: 100 },
  { id: 2, name: 'Mobile B', description: 'Details of Mobile B', price: 200 },
  // Add more products as needed
];

function ProductList() {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {productsData.map((product, index) => (
          <li key={index}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/admin">Admin</Link>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Link to="/">Back to Products</Link>
    </div>
  );
}

function Admin() {
  const [products, setProducts] = useState(productsData);
  const history = useHistory();

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const editProduct = (id) => {
    history.push(`/admin/edit/${id}`);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => editProduct(product.id)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Products</Link>
    </div>
  );
}

function EditProduct() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(productsData.find((p) => p.id === parseInt(id)));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const index = productsData.findIndex((p) => p.id === parseInt(id));
    productsData[index] = product;
    history.push('/admin');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={product.description} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
      <Link to="/admin">Back to Admin Panel</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/admin/edit/:id" component={EditProduct} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
