import { Box } from '@mui/system';
import React from 'react';
import CampCard from '../../Components/CampCard/CampCard';
import styles from "./MyCampground.module.css";

function MyCampground() {

    const campData = [{
        name: "Campground",
        description: "",
        highlight: [],
        price: "",
        city: "",
        address: "",
        pincode: "",
        state: "",
        coordinates: [], // latitude then longitude order is importent
        image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
        image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
        image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
        image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
},{
  name: "Campground",
  description: "",
  highlight: [],
  price: "",
  city: "",
  address: "",
  pincode: "",
  state: "",
  coordinates: [], // latitude then longitude order is importent
  image1:"https://media.istockphoto.com/id/1377841262/photo/the-beautiful-scenery-of-a-tent-in-a-pine-tree-forest-at-pang-oung-mae-hong-son-province.jpg?b=1&s=170667a&w=0&k=20&c=LhjnOLqoXHmsklVSGUkuvtbjXrfa83WZ5G6wz4UjiAc=",
  image2:"https://www.shutterstock.com/image-photo/campground-small-orange-tent-travel-260nw-109597442.jpg",
  image3:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  image4:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHggm3ZtiTjGV1JoYDdiaQCoQMA9-ugqnq-KUQB9gHrIH5ZPD7d3-aCXq7o4gaz0q98U&usqp=CAU"
}]

  return (
    <Box className = {styles.allCampground}>
      {campData.map((el,i)=><CampCard cardData={el} key={i}/>)}
    </Box>
  )
}

export default MyCampground