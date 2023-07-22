import styled from 'styled-components'

const Container = styled.div`
flex:1;
margin:5px;
min-width:280px;
height:350px;

`

const Circle = styled.div`
`
const Image = styled.img`
height:60%;
`
const Info = styled.div`
`

const Product = ({item})=>{

    
return(
<Container>
<Circle/>

<Image src={item.image.secure_url} alt='product image'/>
<Info>
<h3>{item.brand} {item.model}</h3>
        <p>Fuel Type: {item.fuelType} </p>
        <p>Rate: {item.Rate}/hr</p>
        
</Info>
</Container>
)
}

export default Product