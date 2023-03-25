// create an object to return sample products
 import bcrypt from 'bcryptjs'; 
const data={ 

    users:[
        {
            name:"Saiken", 
            email:'saikenhh@gmail.com', 
            password: bcrypt.hashSync('123457'),
            isAdmin:true,

        },{
            name:"Saiken", 
            email:'saikenhso@gmail.com', 
            password: bcrypt.hashSync('123456'), 
            isAdmin:false,

        }
     ], 

    products: [
        {    
            name:' Nike Slim shirt', 
            slug:'nike-slim-shirt', 
            category:'Shirts', 
            image:'/images/p1.jpg', 
            price:120, 
            countInStock:0, 
            brand:'Nike', 
            rating:4, 
            numReviews:10, 
            description:'Ok quality poroduct' 
        },     {
            
            name:' Adidas Slim shirt', 
            slug:'adidas-slim-shirt', 
            category:'Shirts', 
            image:'/images/p2.jpg', 
            price:110, 
            countInStock:0, 
            brand:'Adidas', 
            rating:3.0, 
            numReviews:10, 
            description:'medium quality ' 
        },     {
            
            name:' Paint Slim shirt', 
            slug:'Paint-slim-shirt', 
            category:'Shirts', 
            image:'/images/p3.jpg', 
            price:90, 
            countInStock:10, 
            brand:'Paint', 
            rating:1.5, 
            numReviews:20, 
            description:'high quality poroduct' 
        },     {
            
            name:' UnderArmour Slim shirt', 
            slug:'AM-slim-shirt', 
            category:'Shirts', 
            image:'/images/p3.jpg', 
            price:120, 
            countInStock:10, 
            brand:'AM', 
            rating:4.5, 
            numReviews:10, 
            description:'high quality poroduct' 
        },
    ],
}

export default data  ;